import { Resend } from 'resend';
import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  from: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Received request:', request);
    const body = await request.json();
    const { name, from, subject, message } = body;

    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Poppins', 'Inter', 'Montserrat', Arial, sans-serif;
              background: #0A0A0A;
              color: #FFFFFF;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 32px auto;
              background: #111111;
              border-radius: 24px;
              box-shadow: 0 4px 24px rgba(0,0,0,0.25);
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.08);
            }
            .header {
              background: #111111;
              color: #F5C046;
              padding: 36px 24px 18px 24px;
              text-align: center;
              border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .header-title {
              margin: 0;
              font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
              font-weight: 700;
              font-size: 28px;
              color: #F5C046;
              letter-spacing: 0.5px;
            }
            .content {
              padding: 28px 24px 36px 24px;
            }
            .section {
              margin-bottom: 32px;
              background: rgba(255,255,255,0.03);
              border-radius: 14px;
              border-left: 5px solid #F5C046;
              padding: 20px 20px 14px 20px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.10);
            }
            .section-title {
              color: #F5C046;
              font-family: 'Montserrat', sans-serif;
              font-size: 19px;
              font-weight: 700;
              margin-bottom: 16px;
              letter-spacing: 0.2px;
            }
            .info-row {
              margin-bottom: 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .label {
              font-weight: 600;
              color: rgba(255,255,255,0.7);
              font-family: 'Montserrat', sans-serif;
              font-size: 16px;
            }
            .value {
              color: #FFFFFF;
              font-family: 'Inter', sans-serif;
              font-size: 16px;
            }
            .message-content {
              background: rgba(255,255,255,0.04);
              padding: 18px;
              border-radius: 10px;
              margin: 18px 0;
              border: 1px solid rgba(255,255,255,0.10);
              white-space: pre-wrap;
              color: #FFFFFF;
              line-height: 1.7;
              font-size: 16px;
            }
            @media (max-width: 480px) {
              .container {
                margin: 0;
                border-radius: 0;
              }
              .content {
                padding: 14px 6px 20px 6px;
              }
              .info-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
              }
              .value {
                color: rgba(255,255,255,0.9);
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 class="header-title">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="info-row">
                  <span class="label">Name:</span>
                  <span class="value">${name}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value">${from}</span>
                </div>
                <div class="info-row">
                  <span class="label">Subject:</span>
                  <span class="value">${subject}</span>
                </div>
              </div>
              <div class="section">
                <div class="section-title">Message</div>
                <div class="message-content">
                  ${message}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['nkululekomkhize733@gmail.com'],
      cc: ['mmkhize11@gmail.com'],
      subject: `Contact Form: ${subject}`,
      html: emailContent,
      replyTo: from,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 