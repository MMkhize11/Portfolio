import sendEmail from "@/utils/email";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: any, response: any) {
  const body = await request.json();

  try {
    const result = await sendEmail(
      body["body"],
      body["subject"],
      body["message"],
      body["name"]
    );

    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return Response.json(
      { message: "unable to send email " + JSON.stringify(error) },
      { status: 500 }
    );
  }
}
