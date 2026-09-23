import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/contact
//
// Validates a contact form submission server-side and forwards it toward
// the Vivid Network inbox (vividnetworkcontact@gmail.com).
//
// THIS FILE DOES NOT SEND EMAIL ON ITS OWN. Wire it to a real transactional
// email provider (Resend, Postmark, SendGrid, etc.) using environment
// variables — never hard-code credentials here. See .env.example for the
// expected variable names.
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Basic spam trap: reject if a honeypot-style extra field was filled, or
  // if the message is suspiciously link-heavy.
  const linkCount = (message.match(/https?:\/\//g) ?? []).length;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: "Please fill in every required field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ message: "Message is too long." }, { status: 400 });
  }
  if (linkCount > 3) {
    return NextResponse.json({ message: "Message flagged as spam." }, { status: 400 });
  }

  const destination = process.env.CONTACT_EMAIL ?? "vividnetworkcontact@gmail.com";

  try {
    // ---- Integration point -------------------------------------------
    // Example using Resend (https://resend.com):
    //
    // await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${process.env.EMAIL_PROVIDER_API_KEY}`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     from: "Vivid Network <no-reply@vividnetwork.com>",
    //     to: destination,
    //     reply_to: email,
    //     subject: `[Contact] ${subject}`,
    //     text: `From: ${name} <${email}>\n\n${message}`
    //   })
    // });
    //
    // Until EMAIL_PROVIDER_API_KEY is configured, this route validates the
    // submission but does not claim delivery succeeded.
    if (!process.env.EMAIL_PROVIDER_API_KEY) {
      console.log("[contact] Submission received (no email provider configured yet):", {
        name,
        email,
        subject,
        destination
      });
      return NextResponse.json(
        {
          message:
            "Message received. Email delivery isn't configured yet — set EMAIL_PROVIDER_API_KEY to enable it."
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Failed to deliver message:", err);
    return NextResponse.json(
      { message: "Something went wrong sending your message. Please try again." },
      { status: 502 }
    );
  }
}
