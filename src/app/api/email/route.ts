import sendEmail from "@/utils/email";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: any, response: any) {
  // const body = request.body;
  const body = await request.json();

  // console.log(`what is request body  7 ${JSON.stringify(body)}`);

  // const sender = {
  //   name: "",
  //   address: "no-reply@example.com",
  // };

  // const receipients = [
  //   {
  //     name: "Mpumelelo Mkhize",
  //     address: "mmkhize11@gmail.com",
  //   },
  // ];

  try {
    // return Response.json({ accepted: "successful" });
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
