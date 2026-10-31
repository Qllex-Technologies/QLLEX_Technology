"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BRAND_CONFIG, EnquiryStatus } from "@nexovanta/shared";
import { API_BASE_URL } from "@/lib/api";
import {
  LayoutDashboard,
  Inbox,
  FolderGit2,
  Layers,
  BookOpen,
  Settings,
  LogOut,
  Lock,
  Mail,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  DollarSign,
  Phone,
  Briefcase,
  User,
  MessageSquare,
  Send,
  Plus,
  ShieldCheck,
  KeyRound,
  ExternalLink,
} from "lucide-react";

type ActiveTab =
  | "dashboard"
  | "enquiries"
  | "projects"
  | "services"
  | "blog"
  | "settings";

export function AdminDashboardClient() {
  const [token, setToken] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  // Sign in state
  const [loginEmail, setLoginEmail] = useState("admin@qllex.example.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Overview / CMS Data
  const [overview, setOverview] = useState<any>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Enquiries state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [retryingNotificationId, setRetryingNotificationId] = useState<string | null>(null);
  const [internalNoteDraft, setInternalNoteDraft] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  // Delete enquiry confirmation modal
  const [enquiryToDelete, setEnquiryToDelete] = useState<any | null>(null);
  const [isDeletingEnquiry, setIsDeletingEnquiry] = useState(false);

  // Settings: Credential update state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isUpdatingCredentials, setIsUpdatingCredentials] = useState(false);
  const [credentialMessage, setCredentialMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Projects CMS Form state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    category: "Web Application",
    summary: "",
    challenge: "",
    solution: "",
    technologies: "Next.js, TypeScript, Tailwind CSS",
    liveUrl: "",
    githubUrl: "",
  });
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Blog CMS Form state
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Engineering",
    authorName: "QLLEX Engineering",
    readTimeMinutes: 5,
  });
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  // Escape key handler for modals
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedEnquiry(null);
        setEnquiryToDelete(null);
        setShowAddProject(false);
        setShowAddBlog(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchOverviewData = useCallback(async (jwtToken: string) => {
    setLoadingOverview(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/overview`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      });
      if (res.status === 401) {
        setToken(null);
        sessionStorage.removeItem("qllex_admin_jwt");
        sessionStorage.removeItem("qllex_admin_email");
        return;
      }
      const json = await res.json();
      if (json?.success) {
        setOverview(json.data);
      }
    } catch {
      // Quiet network error
    } finally {
      setLoadingOverview(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("qllex_admin_jwt");
    const savedEmail = sessionStorage.getItem("qllex_admin_email");
    if (saved) {
      setToken(saved);
      if (savedEmail) {
        setAdminEmail(savedEmail);
        setNewAdminEmail(savedEmail);
      }
      fetchOverviewData(saved);
    }
  }, [fetchOverviewData]);

  // Sync internal note draft when enquiry is selected
  useEffect(() => {
    if (selectedEnquiry) {
      setInternalNoteDraft(selectedEnquiry.internalNotes || "");
    }
  }, [selectedEnquiry]);

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (actionFeedback) {
      const timer = setTimeout(() => setActionFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionFeedback]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        setAuthError(json?.message || "Invalid administrator credentials.");
        return;
      }
      const jwt = json.data.token;
      setToken(jwt);
      setAdminEmail(json.data.user.email);
      setNewAdminEmail(json.data.user.email);
      sessionStorage.setItem("qllex_admin_jwt", jwt);
      sessionStorage.setItem("qllex_admin_email", json.data.user.email);
      setLoginPassword("");
      await fetchOverviewData(jwt);
    } catch {
      setAuthError("Unable to connect to the API server.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    if (token) {
      await fetch(`${API_BASE_URL}/admin/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      }).catch(() => null);
    }
    sessionStorage.removeItem("qllex_admin_jwt");
    sessionStorage.removeItem("qllex_admin_email");
    setToken(null);
    setOverview(null);
    setSelectedEnquiry(null);
    setActiveTab("dashboard");
  }

  async function handleStatusUpdate(id: string, newStatus: EnquiryStatus) {
    if (!token) return;
    setUpdatingStatusId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: `Enquiry status updated to "${newStatus}".`,
        });
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to update enquiry status.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error updating enquiry status.",
      });
    } finally {
      setUpdatingStatusId(null);
    }
  }

  async function handleSaveInternalNote(id: string) {
    if (!token || !selectedEnquiry) return;
    setSavingNote(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedEnquiry.status || "New",
          internalNotes: internalNoteDraft,
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setSelectedEnquiry({ ...selectedEnquiry, internalNotes: internalNoteDraft });
        setActionFeedback({
          type: "success",
          message: "Internal note saved successfully.",
        });
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to save internal note.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error saving note.",
      });
    } finally {
      setSavingNote(false);
    }
  }

  async function handleDeleteEnquiry(id: string) {
    if (!token) return;
    setIsDeletingEnquiry(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/enquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: "Enquiry permanently deleted from database.",
        });
        setEnquiryToDelete(null);
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to delete enquiry.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error deleting enquiry.",
      });
    } finally {
      setIsDeletingEnquiry(false);
    }
  }

  async function handleRetryNotification(id: string, channel: "email" | "whatsapp" | "both" = "both") {
    if (!token) return;
    setRetryingNotificationId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/enquiries/${id}/retry-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ channel }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: "Notification retry dispatched.",
        });
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(json.data);
        }
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Notification retry failed.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error dispatching retry.",
      });
    } finally {
      setRetryingNotificationId(null);
    }
  }

  async function handleUpdateCredentials(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setCredentialMessage(null);

    if (newPassword && newPassword !== confirmNewPassword) {
      setCredentialMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    setIsUpdatingCredentials(true);
    try {
      const payload: any = {
        currentPassword,
      };
      if (newAdminEmail && newAdminEmail !== adminEmail) {
        payload.newEmail = newAdminEmail;
      }
      if (newPassword) {
        payload.newPassword = newPassword;
        payload.confirmNewPassword = confirmNewPassword;
      }

      const res = await fetch(`${API_BASE_URL}/admin/settings/credentials`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (res.ok && json?.success) {
        setCredentialMessage({
          type: "success",
          text: json.message || "Admin credentials updated successfully.",
        });
        if (json.data?.token) {
          setToken(json.data.token);
          sessionStorage.setItem("qllex_admin_jwt", json.data.token);
        }
        if (json.data?.user?.email) {
          setAdminEmail(json.data.user.email);
          sessionStorage.setItem("qllex_admin_email", json.data.user.email);
        }
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setCredentialMessage({
          type: "error",
          text: json?.message || "Failed to update administrator credentials.",
        });
      }
    } catch {
      setCredentialMessage({
        type: "error",
        text: "Network error updating administrator credentials.",
      });
    } finally {
      setIsUpdatingCredentials(false);
    }
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setIsSavingProject(true);
    try {
      const techArray = newProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch(`${API_BASE_URL}/admin/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newProject.title,
          slug:
            newProject.slug.trim() ||
            newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: newProject.category,
          summary: newProject.summary,
          challenge: newProject.challenge || "Engineering scalability challenge resolved.",
          solution: newProject.solution || "Custom built microservices and clean architecture.",
          technologies: techArray,
          liveUrl: newProject.liveUrl || undefined,
          githubUrl: newProject.githubUrl || undefined,
          featured: true,
          verificationLabel: "Client Production System",
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: `Project "${newProject.title}" saved to portfolio.`,
        });
        setShowAddProject(false);
        setNewProject({
          title: "",
          slug: "",
          category: "Web Application",
          summary: "",
          challenge: "",
          solution: "",
          technologies: "Next.js, TypeScript, Tailwind CSS",
          liveUrl: "",
          githubUrl: "",
        });
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to save project.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error creating project.",
      });
    } finally {
      setIsSavingProject(false);
    }
  }

  async function handleDeleteProject(slug: string) {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete project "${slug}"?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/portfolio/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: `Project "${slug}" deleted.`,
        });
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to delete project.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error deleting project.",
      });
    }
  }

  async function handleCreateBlog(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setIsSavingBlog(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newBlog.title,
          slug:
            newBlog.slug.trim() ||
            newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          excerpt: newBlog.excerpt,
          content: newBlog.content,
          category: newBlog.category,
          authorName: newBlog.authorName,
          authorRole: "Technical Director",
          readTimeMinutes: Number(newBlog.readTimeMinutes) || 5,
          published: true,
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: `Article "${newBlog.title}" published successfully.`,
        });
        setShowAddBlog(false);
        setNewBlog({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "Engineering",
          authorName: "QLLEX Engineering",
          readTimeMinutes: 5,
        });
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to publish article.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error publishing article.",
      });
    } finally {
      setIsSavingBlog(false);
    }
  }

  async function handleDeleteBlog(slug: string) {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete blog article "${slug}"?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/blog/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setActionFeedback({
          type: "success",
          message: `Blog post "${slug}" removed.`,
        });
        await fetchOverviewData(token);
      } else {
        setActionFeedback({
          type: "error",
          message: json?.message || "Failed to remove blog post.",
        });
      }
    } catch {
      setActionFeedback({
        type: "error",
        message: "Network error removing blog post.",
      });
    }
  }

  // Filtered enquiries
  const allEnquiries: any[] = overview?.enquiries || [];
  const filteredEnquiries = allEnquiries.filter((enq) => {
    if (statusFilter !== "ALL") {
      const normalizedStatus = (enq.status || "New").toLowerCase();
      const target = statusFilter.toLowerCase();
      if (normalizedStatus !== target) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (enq.fullName || "").toLowerCase().includes(q);
      const emailMatch = (enq.email || "").toLowerCase().includes(q);
      const companyMatch = (enq.companyName || "").toLowerCase().includes(q);
      const serviceMatch = (enq.serviceRequired || "").toLowerCase().includes(q);
      const descMatch = (enq.projectDescription || "").toLowerCase().includes(q);
      const phoneMatch = (enq.phone || "").toLowerCase().includes(q);
      return nameMatch || emailMatch || companyMatch || serviceMatch || descMatch || phoneMatch;
    }
    return true;
  });

  const stats = overview?.stats || {
    totalEnquiries: allEnquiries.length,
    newEnquiries: allEnquiries.filter((e) => (e.status || "").toLowerCase() === "new").length,
    contactedEnquiries: allEnquiries.filter((e) => (e.status || "").toLowerCase() === "contacted").length,
    inProgressEnquiries: allEnquiries.filter(
      (e) => (e.status || "").toLowerCase() === "in progress" || (e.status || "").toLowerCase() === "in_review"
    ).length,
    closedEnquiries: allEnquiries.filter(
      (e) => (e.status || "").toLowerCase() === "closed" || (e.status || "").toLowerCase() === "archived"
    ).length,
    emailSentCount: allEnquiries.filter((e) => (e.emailNotificationStatus || "").toLowerCase() === "sent").length,
    whatsappSentCount: allEnquiries.filter((e) => (e.whatsappNotificationStatus || "").toLowerCase() === "sent").length,
  };

  // --- 1. SIGN IN VIEW ---
  if (!token) {
    return (
      <div className="mx-auto max-w-md py-16 px-4">
        <div className="rounded-2xl border border-lightGrey-border bg-white p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-charcoal border border-edge-subtle">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-mutedGrey font-semibold">
                Protected Admin Portal
              </span>
              <h1 className="text-2xl font-bold text-charcoal">
                Sign In
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-mutedGrey leading-relaxed">
            Enter your administrative credentials to manage client enquiries, services, portfolio projects, and security settings.
          </p>

          {authError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800"
            >
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block font-mono text-xs uppercase text-mutedGrey mb-1.5 font-semibold"
              >
                Login Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block font-mono text-xs uppercase text-mutedGrey mb-1.5 font-semibold"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 transition-all shadow-sm"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Authenticate &amp; Open Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD VIEW ---
  return (
    <div className="space-y-6">
      {/* Top Header & Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-lightGrey-border bg-white p-6 sm:p-7 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-0.5 text-[11px] font-mono font-semibold text-charcoal">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin CMS
            </span>
            <span className="font-mono text-xs text-mutedGrey">
              {"//"} Logged in as: <strong className="text-charcoal font-semibold">{adminEmail}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            QLLEX Technologies Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => token && fetchOverviewData(token)}
            className="inline-flex items-center gap-1.5 rounded-full border border-lightGrey-border bg-white px-4 py-2 text-xs font-semibold text-charcoal hover:bg-lightGrey transition-colors"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loadingOverview ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Global Action Feedback Alert */}
      {actionFeedback && (
        <div
          role="status"
          className={`flex items-center justify-between rounded-xl border px-5 py-3.5 text-xs transition-all ${
            actionFeedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          <span className="inline-flex items-center gap-2 font-medium">
            {actionFeedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <span>{actionFeedback.message}</span>
          </span>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            className="font-semibold underline ml-4 hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Clean Tab Navigation Bar */}
      <nav aria-label="Admin Navigation" className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-lightGrey-border">
        {(
          [
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "enquiries", label: "Enquiries", icon: Inbox, badge: stats.newEnquiries },
            { id: "projects", label: "Projects", icon: FolderGit2, count: overview?.portfolio?.length },
            { id: "services", label: "Services", icon: Layers, count: 4 },
            { id: "blog", label: "Blog", icon: BookOpen, count: overview?.blogs?.length },
            { id: "settings", label: "Settings", icon: Settings },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-charcoal text-white shadow-sm"
                  : "bg-white text-charcoal border border-lightGrey-border hover:bg-lightGrey"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {"badge" in tab && typeof tab.badge === "number" && tab.badge > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-cream text-charcoal" : "bg-charcoal text-white"
                }`}>
                  {tab.badge}
                </span>
              )}
              {"count" in tab && typeof tab.count === "number" && (
                <span className={`text-[10px] font-mono ${isActive ? "text-neutral-300" : "text-mutedGrey"}`}>
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* TAB CONTENT 1: DASHBOARD OVERVIEW */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Real Statistics Metric Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <div
              onClick={() => {
                setStatusFilter("ALL");
                setActiveTab("enquiries");
              }}
              className="cursor-pointer rounded-2xl border border-lightGrey-border bg-white p-4 transition-all hover:border-charcoal shadow-sm"
            >
              <span className="font-mono text-[10px] uppercase text-mutedGrey font-medium">
                Total Enquiries
              </span>
              <div className="mt-1 text-2xl font-bold text-charcoal">
                {stats.totalEnquiries}
              </div>
            </div>

            <div
              onClick={() => {
                setStatusFilter("New");
                setActiveTab("enquiries");
              }}
              className="cursor-pointer rounded-2xl border border-blue-200 bg-blue-50/60 p-4 transition-all hover:border-blue-400 shadow-sm"
            >
              <span className="font-mono text-[10px] uppercase text-blue-700 font-semibold">
                New (Pending)
              </span>
              <div className="mt-1 text-2xl font-bold text-blue-900">
                {stats.newEnquiries}
              </div>
            </div>

            <div
              onClick={() => {
                setStatusFilter("Contacted");
                setActiveTab("enquiries");
              }}
              className="cursor-pointer rounded-2xl border border-amber-200 bg-amber-50/60 p-4 transition-all hover:border-amber-400 shadow-sm"
            >
              <span className="font-mono text-[10px] uppercase text-amber-700 font-semibold">
                Contacted
              </span>
              <div className="mt-1 text-2xl font-bold text-amber-900">
                {stats.contactedEnquiries}
              </div>
            </div>

            <div
              onClick={() => {
                setStatusFilter("In Progress");
                setActiveTab("enquiries");
              }}
              className="cursor-pointer rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 transition-all hover:border-indigo-400 shadow-sm"
            >
              <span className="font-mono text-[10px] uppercase text-indigo-700 font-semibold">
                In Progress
              </span>
              <div className="mt-1 text-2xl font-bold text-indigo-900">
                {stats.inProgressEnquiries}
              </div>
            </div>

            <div
              onClick={() => {
                setStatusFilter("Closed");
                setActiveTab("enquiries");
              }}
              className="cursor-pointer rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 transition-all hover:border-emerald-400 shadow-sm"
            >
              <span className="font-mono text-[10px] uppercase text-emerald-700 font-semibold">
                Closed
              </span>
              <div className="mt-1 text-2xl font-bold text-emerald-900">
                {stats.closedEnquiries}
              </div>
            </div>

            {/* Notification Delivery Counters */}
            <div className="rounded-2xl border border-lightGrey-border bg-white p-4 shadow-sm">
              <span className="font-mono text-[10px] uppercase text-mutedGrey font-medium flex items-center gap-1">
                <Mail className="h-3 w-3 text-charcoal" /> Email Dispatched
              </span>
              <div className="mt-1 text-2xl font-bold text-charcoal">
                {stats.emailSentCount} <span className="text-xs text-mutedGrey font-normal">/ {stats.totalEnquiries}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-lightGrey-border bg-white p-4 shadow-sm">
              <span className="font-mono text-[10px] uppercase text-mutedGrey font-medium flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-emerald-600" /> WhatsApp Sent
              </span>
              <div className="mt-1 text-2xl font-bold text-charcoal">
                {stats.whatsappSentCount} <span className="text-xs text-mutedGrey font-normal">/ {stats.totalEnquiries}</span>
              </div>
            </div>
          </div>

          {/* Quick System & Channel Health Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-lightGrey-border bg-white p-5 space-y-2">
              <span className="font-mono text-xs text-mutedGrey uppercase font-semibold">
                Persistent Database
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                MongoDB Live &amp; Connected
              </div>
              <p className="text-xs text-mutedGrey">
                All client submissions and modifications are saved permanently with atomic transactions.
              </p>
            </div>

            <div className="rounded-2xl border border-lightGrey-border bg-white p-5 space-y-2">
              <span className="font-mono text-xs text-mutedGrey uppercase font-semibold">
                Email Dispatch Gateway
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <Mail className="h-4 w-4 text-charcoal" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </div>
              <p className="text-xs text-mutedGrey">
                Notifies primary engineer inbox on each client enquiry with structured metadata.
              </p>
            </div>

            <div className="rounded-2xl border border-lightGrey-border bg-white p-5 space-y-2">
              <span className="font-mono text-xs text-mutedGrey uppercase font-semibold">
                WhatsApp Business Gateway
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span>{BRAND_CONFIG.contact.phoneDisplay}</span>
              </div>
              <p className="text-xs text-mutedGrey">
                Instant smartphone push notification configured for rapid lead turnaround.
              </p>
            </div>
          </div>

          {/* Recent Enquiries Preview */}
          <div className="space-y-4 rounded-2xl border border-lightGrey-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  Recent Project Enquiries
                </h2>
                <p className="text-xs text-mutedGrey">
                  Latest 5 incoming submissions from the customer website.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("enquiries")}
                className="text-xs font-semibold text-charcoal underline hover:opacity-80"
              >
                View all ({allEnquiries.length}) &rarr;
              </button>
            </div>

            {allEnquiries.length === 0 ? (
              <p className="text-sm text-mutedGrey py-6 text-center">
                No client enquiries registered in the database yet.
              </p>
            ) : (
              <div className="divide-y divide-lightGrey-border">
                {allEnquiries.slice(0, 5).map((enq) => (
                  <div
                    key={enq._id}
                    className="py-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-lightGrey/50 px-2 rounded-xl transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-charcoal">
                          {enq.fullName}
                        </span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold ${
                          (enq.status || "").toLowerCase() === "new"
                            ? "bg-blue-100 text-blue-800"
                            : (enq.status || "").toLowerCase() === "contacted"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {enq.status || "New"}
                        </span>
                      </div>
                      <div className="text-xs text-mutedGrey flex items-center gap-2">
                        <span>{enq.email}</span>
                        {enq.phone && <span>&bull; {enq.phone}</span>}
                        <span>&bull; Service: <strong className="text-charcoal font-medium">{enq.serviceRequired}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEnquiry(enq);
                          setActiveTab("enquiries");
                        }}
                        className="rounded-full border border-lightGrey-border bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-lightGrey"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ENQUIRIES */}
      {activeTab === "enquiries" && (
        <div className="space-y-6">
          {/* Search & Status Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center rounded-2xl border border-lightGrey-border bg-white p-5 shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-mutedGrey" />
              <input
                type="text"
                placeholder="Search by client name, email, phone, company, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-lightGrey-border bg-lightGrey pl-10 pr-10 py-2.5 text-sm text-charcoal placeholder:text-mutedGrey/70 focus:border-charcoal focus:bg-white focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedGrey hover:text-charcoal"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-mono text-mutedGrey mr-1 inline-flex items-center gap-1 font-medium">
                <Filter className="h-3.5 w-3.5" /> Status:
              </span>
              {(["ALL", "New", "Contacted", "In Progress", "Closed"] as const).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      statusFilter === status
                        ? "bg-charcoal text-white shadow-sm"
                        : "border border-lightGrey-border bg-lightGrey text-charcoal hover:bg-white"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Enquiries List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal">
                Client Enquiries ({filteredEnquiries.length})
              </h2>
              {searchQuery && (
                <span className="text-xs text-mutedGrey">
                  Matching &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="rounded-2xl border border-lightGrey-border bg-white p-12 text-center text-sm text-mutedGrey space-y-2 shadow-sm">
                <Inbox className="h-8 w-8 text-mutedGrey mx-auto" />
                <p>No enquiries found matching your filter criteria.</p>
                {(searchQuery || statusFilter !== "ALL") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("ALL");
                    }}
                    className="text-xs text-charcoal font-semibold underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnquiries.map((enq) => {
                  const status = enq.status || "New";
                  const isUpdating = updatingStatusId === enq._id;
                  const isRetrying = retryingNotificationId === enq._id;
                  const formattedDate = enq.createdAt
                    ? new Date(enq.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recent";

                  return (
                    <div
                      key={enq._id}
                      className="rounded-2xl border border-lightGrey-border bg-white p-6 space-y-4 shadow-sm hover:border-charcoal/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-bold text-charcoal">
                              {enq.fullName}
                            </span>
                            {enq.companyName && (
                              <span className="text-xs rounded-full border border-lightGrey-border bg-lightGrey px-2.5 py-0.5 text-mutedGrey font-medium">
                                {enq.companyName}
                              </span>
                            )}
                            <span
                              className={`font-mono text-[11px] uppercase px-3 py-0.5 rounded-full border font-semibold ${
                                status.toLowerCase() === "new"
                                  ? "bg-blue-50 border-blue-200 text-blue-700"
                                  : status.toLowerCase() === "contacted"
                                  ? "bg-amber-50 border-amber-200 text-amber-800"
                                  : status.toLowerCase() === "in progress" || status.toLowerCase() === "in_review"
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
                              }`}
                            >
                              {status}
                            </span>

                            {/* Notification delivery badges */}
                            <span
                              title={`Email: ${enq.emailNotificationStatus || "unspecified"}`}
                              className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                enq.emailNotificationStatus === "sent"
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                  : enq.emailNotificationStatus === "failed"
                                  ? "bg-red-50 border-red-200 text-red-700"
                                  : "bg-lightGrey border-lightGrey-border text-mutedGrey"
                              }`}
                            >
                              <Mail className="h-3 w-3" />
                              {enq.emailNotificationStatus === "sent"
                                ? "Email Sent"
                                : enq.emailNotificationStatus === "failed"
                                ? "Email Failed"
                                : "Email Ready"}
                            </span>

                            <span
                              title={`WhatsApp: ${enq.whatsappNotificationStatus || "unspecified"}`}
                              className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                enq.whatsappNotificationStatus === "sent"
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                  : enq.whatsappNotificationStatus === "failed"
                                  ? "bg-red-50 border-red-200 text-red-700"
                                  : "bg-lightGrey border-lightGrey-border text-mutedGrey"
                              }`}
                            >
                              <MessageSquare className="h-3 w-3" />
                              {enq.whatsappNotificationStatus === "sent"
                                ? "WhatsApp Sent"
                                : enq.whatsappNotificationStatus === "failed"
                                ? "WhatsApp Failed"
                                : "WhatsApp Ready"}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mutedGrey">
                            <span className="text-charcoal font-medium">{enq.email}</span>
                            {enq.phone && <span>&bull; {enq.phone}</span>}
                            <span>&bull; {formattedDate}</span>
                            <span className="font-mono text-[10px]">ID: {enq._id}</span>
                          </div>
                        </div>

                        {/* Actions bar */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Status changer dropdown */}
                          <select
                            aria-label="Update enquiry status"
                            value={
                              status.toLowerCase() === "new"
                                ? "New"
                                : status.toLowerCase() === "contacted"
                                ? "Contacted"
                                : status.toLowerCase() === "in progress" || status.toLowerCase() === "in_review"
                                ? "In Progress"
                                : "Closed"
                            }
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleStatusUpdate(enq._id, e.target.value as EnquiryStatus)
                            }
                            className="rounded-xl border border-lightGrey-border bg-lightGrey px-3 py-2 font-mono text-xs text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-colors cursor-pointer"
                          >
                            <option value="New">Status: New</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="In Progress">Status: In Progress</option>
                            <option value="Closed">Status: Closed</option>
                          </select>

                          {/* Retry notifications */}
                          <button
                            type="button"
                            title="Retry Email & WhatsApp notifications"
                            disabled={isRetrying}
                            onClick={() => handleRetryNotification(enq._id)}
                            className="inline-flex items-center gap-1 rounded-xl border border-lightGrey-border bg-white px-2.5 py-2 text-xs font-semibold text-charcoal hover:bg-lightGrey disabled:opacity-50"
                          >
                            <Send className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`} />
                            <span className="hidden sm:inline">Retry</span>
                          </button>

                          {/* View details */}
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-lightGrey-border bg-white px-3 py-2 text-xs font-semibold text-charcoal hover:bg-lightGrey transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Details</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete enquiry"
                            onClick={() => setEnquiryToDelete(enq)}
                            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-2 text-red-700 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="rounded-lg bg-lightGrey border border-lightGrey-border px-3 py-1 text-mutedGrey font-mono">
                          Service: <span className="text-charcoal font-semibold">{enq.serviceRequired}</span>
                        </span>
                        {enq.budget && (
                          <span className="rounded-lg bg-lightGrey border border-lightGrey-border px-3 py-1 text-mutedGrey font-mono">
                            Budget: <span className="text-charcoal font-semibold">{enq.budget}</span>
                          </span>
                        )}
                        {enq.internalNotes && (
                          <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1 text-amber-900 font-mono text-[11px]">
                            Note attached
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-mutedGrey line-clamp-2 leading-relaxed">
                        {enq.projectDescription}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: PROJECTS (PORTFOLIO CMS) */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-lightGrey-border bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-charcoal">
                Portfolio Projects CMS
              </h2>
              <p className="text-xs text-mutedGrey">
                Add, inspect, or remove real portfolio items displayed on the client website.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddProject(!showAddProject)}
              className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>{showAddProject ? "Cancel" : "Add Project"}</span>
            </button>
          </div>

          {/* New Project Form */}
          {showAddProject && (
            <form
              onSubmit={handleCreateProject}
              className="rounded-2xl border border-lightGrey-border bg-white p-6 sm:p-8 space-y-4 shadow-sm"
            >
              <h3 className="text-base font-bold text-charcoal">
                New Portfolio Case Study
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    placeholder="e.g. Apex Omnichannel SaaS Platform"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Slug (URL identifier)
                  </label>
                  <input
                    type="text"
                    value={newProject.slug}
                    onChange={(e) =>
                      setNewProject({ ...newProject, slug: e.target.value })
                    }
                    placeholder="e.g. apex-omnichannel-saas"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Category
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject({ ...newProject, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Creative Web Experience">Creative Web Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) =>
                      setNewProject({ ...newProject, technologies: e.target.value })
                    }
                    placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                  Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={newProject.summary}
                  onChange={(e) =>
                    setNewProject({ ...newProject, summary: e.target.value })
                  }
                  placeholder="Concise overview of what was built and why..."
                  className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Engineering Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.challenge}
                    onChange={(e) =>
                      setNewProject({ ...newProject, challenge: e.target.value })
                    }
                    placeholder="Technical hurdles, load requirements, or legacy constraints..."
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Delivered Solution
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.solution}
                    onChange={(e) =>
                      setNewProject({ ...newProject, solution: e.target.value })
                    }
                    placeholder="Architecture choices, performance results, and benchmarks..."
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="rounded-full border border-lightGrey-border bg-white px-5 py-2.5 text-xs font-semibold text-charcoal hover:bg-lightGrey"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-6 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                  {isSavingProject ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save to Database</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(overview?.portfolio || []).map((proj: any) => (
              <div
                key={proj.slug || proj._id}
                className="rounded-2xl border border-lightGrey-border bg-white p-6 space-y-3 shadow-sm hover:border-charcoal/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase text-mutedGrey font-semibold">
                      {proj.category}
                    </span>
                    <button
                      type="button"
                      title="Delete project"
                      onClick={() => handleDeleteProject(proj.slug)}
                      className="text-mutedGrey hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-charcoal">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-mutedGrey line-clamp-2">
                    {proj.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(proj.technologies || []).map((t: string) => (
                      <span
                        key={t}
                        className="rounded-md bg-lightGrey border border-lightGrey-border px-2 py-0.5 text-[10px] font-mono text-charcoal"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-lightGrey-border flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-mutedGrey">
                    /{proj.slug}
                  </span>
                  <a
                    href={`/portfolio/${proj.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-charcoal underline"
                  >
                    <span>View Public</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: SERVICES */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-lightGrey-border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-charcoal">
              Core Service Offerings
            </h2>
            <p className="text-xs text-mutedGrey">
              The 4 simplified service pillars offered by QLLEX Technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRAND_CONFIG.fourCoreServices.map((srv, idx) => (
              <div
                key={srv.slug}
                className="rounded-2xl border border-lightGrey-border bg-white p-6 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-mutedGrey">
                    0{idx + 1} &bull; {srv.slug}
                  </span>
                  <span className="rounded-full bg-cream px-2.5 py-0.5 text-[10px] font-mono font-semibold text-charcoal">
                    Active Pillar
                  </span>
                </div>
                <h3 className="text-lg font-bold text-charcoal">
                  {srv.title}
                </h3>
                <p className="text-xs text-mutedGrey leading-relaxed">
                  {srv.summary}
                </p>
                <div className="pt-2">
                  <a
                    href={`/services#${srv.slug}`}
                    className="text-xs font-semibold text-charcoal underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Section</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: BLOG CMS */}
      {activeTab === "blog" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-lightGrey-border bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-charcoal">
                Technical Insights &amp; Blog CMS
              </h2>
              <p className="text-xs text-mutedGrey">
                Publish and manage engineering articles and architecture deep dives.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddBlog(!showAddBlog)}
              className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>{showAddBlog ? "Cancel" : "New Article"}</span>
            </button>
          </div>

          {/* New Blog Form */}
          {showAddBlog && (
            <form
              onSubmit={handleCreateBlog}
              className="rounded-2xl border border-lightGrey-border bg-white p-6 sm:p-8 space-y-4 shadow-sm"
            >
              <h3 className="text-base font-bold text-charcoal">
                Draft New Article
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, title: e.target.value })
                    }
                    placeholder="e.g. Scaling Next.js Monorepos on Docker"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={newBlog.slug}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, slug: e.target.value })
                    }
                    placeholder="scaling-nextjs-monorepos"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newBlog.category}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, category: e.target.value })
                    }
                    placeholder="Engineering / Architecture"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                    Estimated Read Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newBlog.readTimeMinutes}
                    onChange={(e) =>
                      setNewBlog({
                        ...newBlog,
                        readTimeMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  required
                  value={newBlog.excerpt}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, excerpt: e.target.value })
                  }
                  placeholder="Key takeaway of the article in 2-3 sentences..."
                  className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-mutedGrey mb-1 font-semibold">
                  Article Markdown Content
                </label>
                <textarea
                  rows={6}
                  required
                  value={newBlog.content}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, content: e.target.value })
                  }
                  placeholder="Full markdown article content..."
                  className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-sm text-charcoal font-mono focus:border-charcoal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBlog(false)}
                  className="rounded-full border border-lightGrey-border bg-white px-5 py-2.5 text-xs font-semibold text-charcoal hover:bg-lightGrey"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingBlog}
                  className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-6 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                  {isSavingBlog ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <span>Publish Article</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Blog Articles List */}
          <div className="space-y-3">
            {(overview?.blogs || []).map((blog: any) => (
              <div
                key={blog.slug || blog._id}
                className="rounded-2xl border border-lightGrey-border bg-white p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-mutedGrey">
                      {blog.category}
                    </span>
                    <span className="text-xs text-mutedGrey">&bull; {blog.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-base font-bold text-charcoal">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-mutedGrey line-clamp-1">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal underline"
                  >
                    <span>Read</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(blog.slug)}
                    className="text-mutedGrey hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: SETTINGS (ADMIN CREDENTIAL MANAGEMENT) */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-lightGrey-border bg-white p-6 sm:p-8 space-y-6 shadow-sm max-w-2xl">
            <div className="flex items-center gap-3 border-b border-lightGrey-border pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-charcoal">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-mutedGrey font-semibold">
                  Security &amp; Access Control
                </span>
                <h2 className="text-xl font-bold text-charcoal">
                  Change Admin Credentials
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-mutedGrey leading-relaxed">
              Update your administrative login email or password. To protect this system against unauthorized changes, your <strong>current password is strictly verified</strong> prior to updating credentials in the database.
            </p>

            {credentialMessage && (
              <div
                role="alert"
                className={`flex items-center gap-2 rounded-xl border p-4 text-xs ${
                  credentialMessage.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-red-200 bg-red-50 text-red-900"
                }`}
              >
                {credentialMessage.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                )}
                <span>{credentialMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label
                  htmlFor="settings-current-password"
                  className="block font-mono text-xs uppercase text-mutedGrey mb-1.5 font-semibold"
                >
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="settings-current-password"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to authorize changes"
                  className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div className="pt-2 border-t border-lightGrey-border">
                <label
                  htmlFor="settings-new-email"
                  className="block font-mono text-xs uppercase text-mutedGrey mb-1.5 font-semibold"
                >
                  New Admin Email (Optional)
                </label>
                <input
                  id="settings-new-email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="admin@qllex.example.com"
                  className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-all"
                />
                <span className="text-[11px] text-mutedGrey mt-1 block">
                  Current login email: <strong className="text-charcoal">{adminEmail}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="settings-new-password"
                    className="block font-mono text-xs uppercase text-mutedGrey mb-1.5 font-semibold"
                  >
                    New Password (Optional)
                  </label>
                  <input
                    id="settings-new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="settings-confirm-password"
                    className="block font-mono text-xs uppercase text-mutedGrey mb-1.5 font-semibold"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="settings-confirm-password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingCredentials || !currentPassword}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
                >
                  {isUpdatingCredentials ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating Database...</span>
                    </>
                  ) : (
                    <span>Save New Credentials</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: ENQUIRY DETAILS MODAL */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enquiry Details"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="w-full max-w-2xl rounded-2xl border border-lightGrey-border bg-white p-7 sm:p-9 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-lightGrey-border pb-5">
              <div>
                <span className="font-mono text-xs uppercase text-mutedGrey font-semibold tracking-wider">
                  Enquiry Record &bull; Ref: {selectedEnquiry._id}
                </span>
                <h3 className="text-2xl font-bold text-charcoal mt-1">
                  {selectedEnquiry.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-xl border border-lightGrey-border p-2 text-mutedGrey hover:text-charcoal hover:bg-lightGrey transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 rounded-xl border border-lightGrey-border bg-lightGrey p-4">
                <span className="text-mutedGrey flex items-center gap-1.5 font-medium">
                  <User className="h-3.5 w-3.5 text-charcoal" /> Full Name &amp; Email
                </span>
                <p className="font-bold text-charcoal text-sm">{selectedEnquiry.fullName}</p>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-charcoal font-semibold underline block break-all"
                >
                  {selectedEnquiry.email}
                </a>
              </div>

              <div className="space-y-1 rounded-xl border border-lightGrey-border bg-lightGrey p-4">
                <span className="text-mutedGrey flex items-center gap-1.5 font-medium">
                  <Phone className="h-3.5 w-3.5 text-charcoal" /> Phone Number
                </span>
                <p className="font-bold text-charcoal text-sm">
                  {selectedEnquiry.phone || "Not provided"}
                </p>
                {selectedEnquiry.phone && (
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="text-charcoal underline block font-semibold"
                  >
                    Click to call client
                  </a>
                )}
              </div>

              <div className="space-y-1 rounded-xl border border-lightGrey-border bg-lightGrey p-4">
                <span className="text-mutedGrey flex items-center gap-1.5 font-medium">
                  <Briefcase className="h-3.5 w-3.5 text-charcoal" /> Service &amp; Company
                </span>
                <p className="font-bold text-charcoal">{selectedEnquiry.serviceRequired}</p>
                <p className="text-mutedGrey">
                  Company: {selectedEnquiry.companyName || "Independent / Startup"}
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-lightGrey-border bg-lightGrey p-4">
                <span className="text-mutedGrey flex items-center gap-1.5 font-medium">
                  <DollarSign className="h-3.5 w-3.5 text-charcoal" /> Budget &amp; Timestamp
                </span>
                <p className="font-bold text-charcoal">
                  {selectedEnquiry.budget || "Not specified / Flexible"}
                </p>
                <p className="text-mutedGrey flex items-center gap-1 mt-1 font-mono text-[11px]">
                  <Calendar className="h-3 w-3" />
                  {selectedEnquiry.createdAt
                    ? new Date(selectedEnquiry.createdAt).toLocaleString()
                    : "Recent"}
                </p>
              </div>
            </div>

            {/* Notification Delivery Records */}
            <div className="rounded-xl border border-lightGrey-border bg-white p-4 space-y-2">
              <span className="block font-mono text-xs uppercase text-mutedGrey font-semibold">
                Automated Notification Logs
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-lightGrey-border bg-lightGrey p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-charcoal flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email Gateway
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      selectedEnquiry.emailNotificationStatus === "sent"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedEnquiry.emailNotificationStatus === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-200 text-charcoal"
                    }`}>
                      {selectedEnquiry.emailNotificationStatus || "unconfigured"}
                    </span>
                  </div>
                  {selectedEnquiry.emailNotificationError && (
                    <p className="text-[11px] text-red-600 line-clamp-2">
                      Error: {selectedEnquiry.emailNotificationError}
                    </p>
                  )}
                </div>

                <div className="rounded-lg border border-lightGrey-border bg-lightGrey p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-charcoal flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Gateway
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      selectedEnquiry.whatsappNotificationStatus === "sent"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedEnquiry.whatsappNotificationStatus === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-200 text-charcoal"
                    }`}>
                      {selectedEnquiry.whatsappNotificationStatus || "unconfigured"}
                    </span>
                  </div>
                  {selectedEnquiry.whatsappNotificationError && (
                    <p className="text-[11px] text-red-600 line-clamp-2">
                      Error: {selectedEnquiry.whatsappNotificationError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status Selector */}
            <div className="rounded-xl border border-lightGrey-border bg-lightGrey p-4 space-y-2">
              <label className="block font-mono text-xs uppercase text-mutedGrey font-semibold">
                Update Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(["New", "Contacted", "In Progress", "Closed"] as const).map(
                  (statusVal) => {
                    const isSelected =
                      (selectedEnquiry.status || "").toLowerCase() ===
                      statusVal.toLowerCase();
                    return (
                      <button
                        key={statusVal}
                        type="button"
                        onClick={() =>
                          handleStatusUpdate(selectedEnquiry._id, statusVal)
                        }
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-charcoal text-white shadow-sm"
                            : "border border-lightGrey-border bg-white text-charcoal hover:bg-lightGrey"
                        }`}
                      >
                        {statusVal}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Internal Notes Editor */}
            <div className="space-y-2">
              <label
                htmlFor="enquiry-internal-notes"
                className="block font-mono text-xs uppercase text-mutedGrey font-semibold"
              >
                Internal Notes &amp; Follow-Up Details
              </label>
              <textarea
                id="enquiry-internal-notes"
                rows={3}
                value={internalNoteDraft}
                onChange={(e) => setInternalNoteDraft(e.target.value)}
                placeholder="Add private internal notes about meetings, quotes, or timeline discussions..."
                className="w-full rounded-xl border border-lightGrey-border bg-lightGrey px-3.5 py-2.5 text-xs text-charcoal focus:border-charcoal focus:bg-white focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={savingNote}
                  onClick={() => handleSaveInternalNote(selectedEnquiry._id)}
                  className="rounded-full bg-charcoal px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
                >
                  {savingNote ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>

            {/* Full Message */}
            <div className="space-y-2">
              <span className="block font-mono text-xs uppercase text-mutedGrey font-semibold">
                Client Project Description
              </span>
              <div className="rounded-xl border border-lightGrey-border bg-lightGrey p-4 text-xs sm:text-sm text-charcoal leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.projectDescription}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-lightGrey-border">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Regarding%20your%20QLLEX%20Technologies%20enquiry%20for%20${encodeURIComponent(
                    selectedEnquiry.serviceRequired || "software development"
                  )}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Client</span>
                </a>

                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <button
                  type="button"
                  title="Retry notifications"
                  disabled={retryingNotificationId === selectedEnquiry._id}
                  onClick={() => handleRetryNotification(selectedEnquiry._id)}
                  className="inline-flex items-center gap-1 rounded-full border border-lightGrey-border bg-white px-3 py-2 text-xs font-semibold text-charcoal hover:bg-lightGrey"
                >
                  <Send className="h-3 w-3" />
                  <span>Retry Notify</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEnquiryToDelete(selectedEnquiry);
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>

                <button
                  type="button"
                  id="close-enquiry-modal"
                  aria-label="Close modal"
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-full border border-lightGrey-border bg-white px-4 py-2 text-xs font-semibold text-charcoal hover:bg-lightGrey transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE CONFIRMATION DIALOG */}
      {enquiryToDelete && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-lightGrey-border bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-charcoal">
                  Permanently Delete Enquiry?
                </h4>
                <p className="text-xs text-mutedGrey">
                  Enquiry ID: <span className="font-mono">{enquiryToDelete._id}</span>
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-mutedGrey leading-relaxed">
              Are you sure you want to delete the enquiry from <strong>{enquiryToDelete.fullName}</strong> ({enquiryToDelete.email})? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeletingEnquiry}
                onClick={() => setEnquiryToDelete(null)}
                className="rounded-full border border-lightGrey-border bg-white px-4 py-2 text-xs font-semibold text-charcoal hover:bg-lightGrey"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingEnquiry}
                onClick={() => handleDeleteEnquiry(enquiryToDelete._id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 shadow-sm"
              >
                {isDeletingEnquiry ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Enquiry</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
