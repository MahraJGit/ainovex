import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    // Validate again on the server, never trust the client
    if (
      typeof email !== "string" ||
      typeof message !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.trim().length < 10
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Send the email. This example uses Resend (npm i resend).
    // Put RESEND_API_KEY in .env.local
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ainovex Website <website@yourdomain.com>", // must be a verified domain
        to: ["info@ainovex.com"],
        reply_to: email,
        subject: `New message from ${email}`,
        text: message,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Email failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}