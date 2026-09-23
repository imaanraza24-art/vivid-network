import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/story-submission
//
// Handles "Share Your Story" submissions. These NEVER publish directly to
// the site — they are meant to land in a private review queue (an email
// inbox, an Airtable/Notion base, or a CMS "drafts" collection) for Imaan
// or another editor to review manually.
//
// This route validates the submission and forwards it to that review
// destination. Wire the marked integration point below to whatever review
// workflow Vivid Network ends up using.
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const ageRange = String(formData.get("ageRange") ?? "").trim();
  const contributionType = String(formData.get("contributionType") ?? "").trim();
  const ideaTitle = String(formData.get("ideaTitle") ?? "").trim();
  const ideaDetails = String(formData.get("ideaDetails") ?? "").trim();
  const socialMedia = String(formData.get("socialMedia") ?? "").trim();
  const file = formData.get("file");

  if (!name || !email || !ageRange || !contributionType || !ideaTitle || !ideaDetails) {
    return NextResponse.json({ message: "Please fill in every required field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (file instanceof File && file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ message: "File is too large (15MB max)." }, { status: 400 });
  }

  try {
    // ---- Integration point -------------------------------------------
    // Forward to a private review destination — e.g. store the submission
    // (and upload `file` to blob storage) and notify an editor by email:
    //
    // await sendReviewNotification({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `[Story Submission] ${ideaTitle}`,
    //   payload: { name, email, ageRange, contributionType, ideaTitle, ideaDetails, socialMedia }
    // });
    // if (file instanceof File) {
    //   await uploadToBlobStorage(file); // e.g. Vercel Blob, S3
    // }
    console.log("[story-submission] Received (review queue not yet connected):", {
      name,
      email,
      ageRange,
      contributionType,
      ideaTitle,
      hasFile: file instanceof File && file.size > 0
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[story-submission] Failed to process submission:", err);
    return NextResponse.json(
      { message: "Something went wrong sending your submission. Please try again." },
      { status: 502 }
    );
  }
}
