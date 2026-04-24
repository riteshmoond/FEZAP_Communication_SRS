const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const buildUrl = (path) => `${API_BASE_URL}${path}`;

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const toProjectPayload = (project) => ({
  projectName: project.projectName ?? project.name,
  senderName: project.senderName,
  senderEmail: project.senderEmail,
  replyTo: project.replyTo,
  isClientSmtp: project.isClientSmtp,
  vendor: project.vendor,
  senderEmailUsername: project.senderEmailUsername,
  host: project.host,
  port: project.port,
  username: project.username,
  password: project.password,
  customSenderEmail: project.customSenderEmail,
  customReplyTo: project.customReplyTo,
  sendgridApiKey: project.sendgridApiKey,
});

export const mapProjectFromApi = (project) => ({
  id: project.id,
  name: project.name,
  secret: project.secret_key,
  vendor: project.vendor,
  via: "Mail",
  status: project.status === "active" ? "Active" : "Deactive",
  badge: project.status === "active" ? "Verified" : "Inactive",
  badgeType: project.status === "active" ? "verified" : "inactive",
  enabled: project.status === "active",
  senderName: project.sender_name,
  senderEmail: project.sender_email,
  replyTo: project.reply_to,
  isClientSmtp: project.smtp_type,
  senderEmailUsername: project.sender_email_username,
  host: project.host,
  port: project.port,
  username: project.smtp_username,
  password: project.smtp_password,
  customSenderEmail: project.custom_sender_email,
  customReplyTo: project.custom_reply_to,
  sendgridApiKey: project.sendgrid_api_key,
});
