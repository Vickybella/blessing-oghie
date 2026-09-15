import { Resend } from "resend";

// Sends over HTTPS instead of raw SMTP. The contact form's previous SMTP
// setup hit a hard network block (EHOSTUNREACH) reaching Outlook's mail
// servers on port 587 — a port many networks restrict. Resend avoids that
// entirely since it's just a normal HTTPS API call.
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Where digest/contact notifications land. Resend's shared "onboarding@
// resend.dev" sender works out of the box with no domain verification,
// since mail only needs to go TO this address, not from a custom domain.
export const NOTIFY_EMAIL = process.env.EMAIL_USER || "blessingoghie@outlook.com";
export const FROM_EMAIL = "Blessing Oghie Portfolio <onboarding@resend.dev>";
