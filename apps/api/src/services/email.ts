import nodemailer from "nodemailer";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { BRAND_CONFIG, ContactEnquiryInput, QuoteRequestInput } from "@nexovanta/shared";

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

class EmailNotificationService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
      logger.info("SMTP email transport initialized", { host: env.SMTP_HOST });
    } else {
      logger.info(
        "SMTP_HOST not configured; email notifications will be safely logged via structured output until SMTP credentials are provided."
      );
    }
  }

  async sendEmail(payload: EmailPayload): Promise<{ delivered: boolean; mode: "smtp" | "logged_fallback"; error?: string }> {
    if (!this.transporter) {
      logger.info("EMAIL_NOTIFICATION_DISPATCH (Development/No-SMTP Mode)", {
        to: payload.to,
        replyTo: payload.replyTo,
        subject: payload.subject,
        preview: payload.text.slice(0, 240),
      });
      return { delivered: true, mode: "logged_fallback" };
    }

    try {
      await this.transporter.sendMail({
        from: env.EMAIL_FROM,
        to: payload.to,
        replyTo: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      });
      return { delivered: true, mode: "smtp" };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error("Failed to dispatch email via SMTP", {
        error: errMsg,
        subject: payload.subject,
      });
      return { delivered: false, mode: "smtp", error: errMsg };
    }
  }

  async notifyNewContactEnquiry(enquiry: ContactEnquiryInput & { id: string }) {
    const subject = `New Project Enquiry — ${BRAND_CONFIG.name} (${enquiry.fullName})`;
    const text = [
      `New Project Enquiry Received — ${BRAND_CONFIG.name}`,
      `================================================`,
      `Reference ID: ${enquiry.id}`,
      `Client Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone || "Not specified"}`,
      `Service Required: ${enquiry.serviceRequired}`,
      `Estimated Budget: ${enquiry.budget || "Not specified"}`,
      `Company: ${enquiry.companyName || "Not specified"}`,
      `Preferred Contact Method: ${enquiry.preferredContactMethod || "Email"}`,
      ``,
      `Project Description:`,
      enquiry.projectDescription,
      ``,
      `================================================`,
      `Time: ${new Date().toISOString()}`,
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0A0A0C; max-width: 620px; line-height: 1.5; padding: 24px; border: 1px solid #E5E7EB; border-radius: 12px; background: #FFFFFF;">
        <div style="border-bottom: 2px solid #2563EB; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #0A0A0C; font-size: 22px; margin: 0;">New Project Enquiry — ${BRAND_CONFIG.name}</h2>
          <p style="color: #525866; font-size: 13px; margin: 4px 0 0 0;">Reference ID: <strong>${enquiry.id}</strong></p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #525866; width: 140px;">Client Name:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0A0A0C;">${enquiry.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #525866;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #2563EB; text-decoration: none;">${enquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #525866;">Phone:</td>
            <td style="padding: 8px 0; color: #0A0A0C;">${enquiry.phone || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #525866;">Service Required:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #2563EB;">${enquiry.serviceRequired}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #525866;">Estimated Budget:</td>
            <td style="padding: 8px 0; color: #0A0A0C;">${enquiry.budget || "Not specified"}</td>
          </tr>
          ${enquiry.companyName ? `<tr><td style="padding: 8px 0; color: #525866;">Company:</td><td style="padding: 8px 0; color: #0A0A0C;">${enquiry.companyName}</td></tr>` : ""}
        </table>

        <div style="background: #F8F9FA; padding: 16px; border-radius: 8px; border: 1px solid #E5E7EB; margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #525866;">Project Description:</h4>
          <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #111827;">${enquiry.projectDescription}</p>
        </div>

        <p style="font-size: 12px; color: #9CA3AF; margin: 0; border-top: 1px solid #E5E7EB; padding-top: 12px;">
          This is an automated notification dispatched by the ${BRAND_CONFIG.name} project intake system to ${env.ENQUIRY_NOTIFICATION_EMAIL}.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: env.ENQUIRY_NOTIFICATION_EMAIL,
      replyTo: enquiry.email,
      subject,
      text,
      html,
    });
  }

  async notifyNewQuoteRequest(quote: QuoteRequestInput & { id: string }) {
    const subject = `[${BRAND_CONFIG.shortName} Quote Request] ${quote.projectCategory} (${quote.budgetRange}) — ${quote.name}`;
    const text = [
      `New Project Quote Request Received (${BRAND_CONFIG.name})`,
      `Reference ID: ${quote.id}`,
      `Name: ${quote.name}`,
      `Email: ${quote.email}`,
      `Phone: ${quote.phone}`,
      `Company: ${quote.companyName || "Not specified"}`,
      `Category: ${quote.projectCategory}`,
      `Budget Range: ${quote.budgetRange}`,
      `Desired Timeline: ${quote.desiredTimeline}`,
      `Required Features: ${quote.requiredFeatures.join(", ")}`,
      ``,
      `Project Details:`,
      quote.projectDetails,
    ].join("\n");

    const html = `
      <div style="font-family: sans-serif; color: #0A0A0C; max-width: 600px; padding: 24px; border: 1px solid #E5E7EB; border-radius: 12px;">
        <h2 style="color: #2563EB;">New Project Quote Request — ${BRAND_CONFIG.name}</h2>
        <p><strong>Reference ID:</strong> ${quote.id}</p>
        <p><strong>Name:</strong> ${quote.name}</p>
        <p><strong>Email:</strong> ${quote.email}</p>
        <p><strong>Phone:</strong> ${quote.phone}</p>
        <p><strong>Company:</strong> ${quote.companyName || "Not specified"}</p>
        <p><strong>Category:</strong> ${quote.projectCategory}</p>
        <p><strong>Budget Range:</strong> ${quote.budgetRange}</p>
        <p><strong>Desired Timeline:</strong> ${quote.desiredTimeline}</p>
        <p><strong>Required Features:</strong> ${quote.requiredFeatures.join(", ")}</p>
        <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 16px 0;" />
        <p><strong>Project Details:</strong></p>
        <p style="white-space: pre-wrap; background: #F8F9FA; padding: 12px; border-radius: 6px;">${quote.projectDetails}</p>
      </div>
    `;

    return this.sendEmail({
      to: env.ENQUIRY_NOTIFICATION_EMAIL,
      replyTo: quote.email,
      subject,
      text,
      html,
    });
  }
}

export const emailService = new EmailNotificationService();
