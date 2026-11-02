import { env } from "../config/env";
import { logger } from "../config/logger";
import { BRAND_CONFIG, ContactEnquiryInput, QuoteRequestInput } from "@nexovanta/shared";

export interface WhatsAppDispatchResult {
  delivered: boolean;
  mode: "cloud_api" | "logged_fallback";
  messageId?: string;
  error?: string;
  recipient: string;
}

class WhatsAppNotificationService {
  private hasCloudApiCredentials(): boolean {
    return Boolean(
      env.WHATSAPP_ACCESS_TOKEN &&
        env.WHATSAPP_PHONE_NUMBER_ID &&
        env.WHATSAPP_ACCESS_TOKEN.trim().length > 0 &&
        env.WHATSAPP_PHONE_NUMBER_ID.trim().length > 0
    );
  }

  /**
   * Dispatches WhatsApp message using Meta WhatsApp Business Cloud API.
   * Falls back safely to structured logging if credentials are not configured yet.
   */
  async sendMessage(
    recipientNumber: string,
    messageBody: string
  ): Promise<WhatsAppDispatchResult> {
    const cleanRecipient = recipientNumber.replace(/[^0-9]/g, "");

    if (!this.hasCloudApiCredentials()) {
      logger.info(
        "WHATSAPP_NOTIFICATION_DISPATCH (Development / Offline Fallback Mode)",
        {
          recipient: cleanRecipient,
          preview: messageBody.slice(0, 180),
          configuredPhoneId: env.WHATSAPP_PHONE_NUMBER_ID ? "[SET]" : "[NOT_SET]",
          configuredToken: env.WHATSAPP_ACCESS_TOKEN ? "[SET]" : "[NOT_SET]",
        }
      );
      return {
        delivered: true,
        mode: "logged_fallback",
        recipient: cleanRecipient,
      };
    }

    try {
      const url = `https://graph.facebook.com/v21.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanRecipient,
        type: "text",
        text: {
          preview_url: false,
          body: messageBody,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseJson = (await response.json().catch(() => null)) as any;

      if (!response.ok) {
        const errorDetail =
          responseJson?.error?.message || `HTTP ${response.status} ${response.statusText}`;
        logger.error("WhatsApp Cloud API dispatch error response", {
          status: response.status,
          error: errorDetail,
        });
        return {
          delivered: false,
          mode: "cloud_api",
          recipient: cleanRecipient,
          error: errorDetail,
        };
      }

      const messageId = responseJson?.messages?.[0]?.id || "wa_sent";
      logger.info("WhatsApp Cloud API notification sent successfully", {
        recipient: cleanRecipient,
        messageId,
      });

      return {
        delivered: true,
        mode: "cloud_api",
        recipient: cleanRecipient,
        messageId,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown network error during WhatsApp dispatch";
      logger.error("Failed to dispatch WhatsApp notification via Cloud API", {
        error: errorMessage,
        recipient: cleanRecipient,
      });
      return {
        delivered: false,
        mode: "cloud_api",
        recipient: cleanRecipient,
        error: errorMessage,
      };
    }
  }

  /**
   * Formats and dispatches a project enquiry notification to the company WhatsApp.
   */
  async notifyNewContactEnquiry(
    enquiry: ContactEnquiryInput & { id: string }
  ): Promise<WhatsAppDispatchResult> {
    const lines = [
      `🚀 *NEW PROJECT ENQUIRY — ${BRAND_CONFIG.name}*`,
      ``,
      `📌 *Reference ID:* ${enquiry.id}`,
      `👤 *Client Name:* ${enquiry.fullName}`,
      `✉️ *Email:* ${enquiry.email}`,
      `📞 *Phone:* ${enquiry.phone || "Not provided"}`,
      `💼 *Service:* ${enquiry.serviceRequired}`,
      enquiry.companyName ? `🏢 *Company:* ${enquiry.companyName}` : "",
      ``,
      `📝 *Project Summary:*`,
      enquiry.projectDescription.length > 500
        ? `${enquiry.projectDescription.slice(0, 497)}...`
        : enquiry.projectDescription,
      ``,
      `⏰ *Time:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    ].filter(Boolean);

    const messageText = lines.join("\n");
    return this.sendMessage(env.WHATSAPP_RECIPIENT_PHONE, messageText);
  }

  /**
   * Formats and dispatches a detailed quote request notification to company WhatsApp.
   */
  async notifyNewQuoteRequest(
    quote: QuoteRequestInput & { id: string }
  ): Promise<WhatsAppDispatchResult> {
    const lines = [
      `💼 *NEW QUOTE REQUEST — ${BRAND_CONFIG.name}*`,
      ``,
      `📌 *Reference ID:* ${quote.id}`,
      `👤 *Name:* ${quote.name}`,
      `✉️ *Email:* ${quote.email}`,
      `📞 *Phone:* ${quote.phone}`,
      `🏢 *Company:* ${quote.companyName || "Not provided"}`,
      `🏷️ *Category:* ${quote.projectCategory}`,
      `⏱️ *Timeline:* ${quote.desiredTimeline}`,
      quote.requiredFeatures.length > 0
        ? `✨ *Features:* ${quote.requiredFeatures.join(", ")}`
        : "",
      ``,
      `📝 *Details:*`,
      quote.projectDetails.length > 400
        ? `${quote.projectDetails.slice(0, 397)}...`
        : quote.projectDetails,
      ``,
      `⏰ *Time:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    ].filter(Boolean);

    return this.sendMessage(env.WHATSAPP_RECIPIENT_PHONE, lines.join("\n"));
  }
}

export const whatsAppService = new WhatsAppNotificationService();
