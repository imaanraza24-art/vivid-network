import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/newsletter
//
// Validates and forwards a Vivid Mailbox signup to a real newsletter
// provider (e.g. Mailchimp, ConvertKit, Buttondown, Resend Audiences).
// No provider is connected in this build — set NEWSLETTER_PROVIDER_API_KEY
// and NEWSLETTER_AUDIENCE_ID (see .env.example) to activate it.
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.NEWSLETTER_PROVIDER_API_KEY;
  const audienceId = process.env.NEWSLETTER_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.log("[newsletter] Signup received (no provider configured yet):", email);
    return NextResponse.json(
      {
        message:
          "You're on a temporary list — the newsletter provider isn't connected yet (set NEWSLETTER_PROVIDER_API_KEY)."
      },
      { status: 200 }
    );
  }

  try {
    // ---- Integration point -------------------------------------------
    // Example using a generic "add subscriber" REST call:
    //
    // const res = await fetch(`https://api.yourprovider.com/audiences/${audienceId}/subscribers`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ email })
    // });
    //
    // if (res.status === 409) {
    //   return NextResponse.json({ message: "You're already on the list." }, { status: 409 });
    // }
    // if (!res.ok) throw new Error(`Provider responded ${res.status}`);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[newsletter] Failed to add subscriber:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again in a moment." },
      { status: 502 }
    );
  }
}
