import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const server = process.env.MAILCHIMP_API_SERVER
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  if (!apiKey || !server || !audienceId) {
    return NextResponse.json(
      {
        error: "Mailchimp not configured.",
        details:
          `Missing: ${!apiKey ? "API_KEY " : ""}${!server ? "SERVER " : ""}${!audienceId ? "AUDIENCE_ID" : ""}`.trim(),
      },
      { status: 500 },
    )
  }

  const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed", // Direct subscription without confirmation email
        tags: ["waitlist"], // Tag subscriber for segmentation
      }),
    })

    const data = await response.json()

    console.log("[v0] Mailchimp response:", { status: response.status, data })

    if (data?.title === "Member Exists") {
      return NextResponse.json({ success: true, message: "Already subscribed" })
    }

    if (response.ok) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      {
        error: "Failed to subscribe.",
        details: data?.detail || "Unknown error",
      },
      { status: response.status },
    )
  } catch (error: any) {
    console.log("[v0] Mailchimp error:", error.message)
    return NextResponse.json(
      {
        error: "Failed to subscribe.",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
