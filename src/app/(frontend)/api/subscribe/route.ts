import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // For now, we'll log the subscription and return success
    // In production, integrate with your email service (Mailchimp, ConvertKit, Resend, etc.)
    console.log(`New email subscription: ${email}`);

    // TODO: Integrate with email service
    // Examples:
    // - Mailchimp: await addToMailchimp(email)
    // - ConvertKit: await convertkit.addSubscriber(email)
    // - Resend: Store in database and use for campaigns
    // - Google Sheets: Append to a spreadsheet

    // You could also send a notification email to yourself
    // await sendNotificationEmail({ newSubscriber: email })

    return NextResponse.json(
      { message: "Successfully subscribed", email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
