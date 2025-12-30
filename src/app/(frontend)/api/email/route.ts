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

    // Extract metadata from request headers
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || 'Direct';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'Unknown';
    const acceptLanguage = request.headers.get('accept-language')?.split(',')[0] || 'Unknown';

    // Timestamp
    const submittedAt = new Date();
    const formattedDate = submittedAt.toLocaleDateString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = submittedAt.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    // Parse user agent for device info
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)[\/\s](\d+)/i);
    const browser = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : 'Unknown Browser';

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
              max-width: 640px;
              margin: 32px auto;
              background: #111111;
              border-radius: 24px;
              box-shadow: 0 4px 24px rgba(0,0,0,0.25);
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.08);
            }
            .header {
              background: linear-gradient(135deg, #1a1a1a 0%, #111111 100%);
              color: #F5C046;
              padding: 32px 24px;
              text-align: center;
              border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .header-title {
              margin: 0 0 8px 0;
              font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
              font-weight: 700;
              font-size: 26px;
              color: #F5C046;
              letter-spacing: 0.5px;
            }
            .header-subtitle {
              margin: 0;
              font-size: 14px;
              color: rgba(255,255,255,0.5);
            }
            .timestamp-badge {
              display: inline-block;
              background: rgba(245, 192, 70, 0.15);
              color: #F5C046;
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 12px;
              margin-top: 12px;
              font-weight: 500;
            }
            .content {
              padding: 28px 24px 32px 24px;
            }
            .section {
              margin-bottom: 24px;
              background: rgba(255,255,255,0.02);
              border-radius: 16px;
              border-left: 4px solid #F5C046;
              padding: 20px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.10);
            }
            .section.metadata {
              border-left-color: rgba(255,255,255,0.2);
              background: rgba(255,255,255,0.01);
            }
            .section-title {
              color: #F5C046;
              font-family: 'Montserrat', sans-serif;
              font-size: 13px;
              font-weight: 700;
              margin-bottom: 16px;
              letter-spacing: 1px;
              text-transform: uppercase;
            }
            .section.metadata .section-title {
              color: rgba(255,255,255,0.4);
            }
            .info-grid {
              display: grid;
              grid-template-columns: 120px 1fr;
              gap: 12px 16px;
              align-items: start;
            }
            .label {
              font-weight: 600;
              color: rgba(255,255,255,0.5);
              font-family: 'Montserrat', sans-serif;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              color: #FFFFFF;
              font-family: 'Inter', sans-serif;
              font-size: 15px;
              word-break: break-word;
            }
            .value.email-link {
              color: #F5C046;
            }
            .value.small {
              font-size: 13px;
              color: rgba(255,255,255,0.6);
            }
            .message-section {
              margin-bottom: 24px;
            }
            .message-section .section-title {
              margin-bottom: 12px;
            }
            .message-content {
              background: rgba(255,255,255,0.03);
              padding: 20px;
              border-radius: 12px;
              border: 1px solid rgba(255,255,255,0.08);
              white-space: pre-wrap;
              color: #FFFFFF;
              line-height: 1.8;
              font-size: 15px;
              font-family: 'Inter', sans-serif;
            }
            .action-bar {
              text-align: center;
              padding: 20px;
              background: rgba(255,255,255,0.02);
              border-top: 1px solid rgba(255,255,255,0.05);
            }
            .reply-btn {
              display: inline-block;
              background: #F5C046;
              color: #000000;
              padding: 12px 32px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
              transition: background 0.2s;
            }
            .divider {
              height: 1px;
              background: rgba(255,255,255,0.06);
              margin: 20px 0;
            }
            @media (max-width: 480px) {
              .container {
                margin: 0;
                border-radius: 0;
              }
              .content {
                padding: 16px;
              }
              .info-grid {
                grid-template-columns: 1fr;
                gap: 4px 0;
              }
              .label {
                margin-top: 12px;
              }
              .label:first-child {
                margin-top: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 class="header-title">New Contact Form Submission</h2>
              <p class="header-subtitle">Someone wants to connect with you</p>
              <div class="timestamp-badge">${formattedDate} at ${formattedTime}</div>
            </div>

            <div class="content">
              <!-- Contact Information -->
              <div class="section">
                <div class="section-title">Contact Details</div>
                <div class="info-grid">
                  <span class="label">Name</span>
                  <span class="value">${name}</span>

                  <span class="label">Email</span>
                  <span class="value email-link">${from}</span>

                  <span class="label">Subject</span>
                  <span class="value">${subject}</span>
                </div>
              </div>

              <!-- Message -->
              <div class="section message-section">
                <div class="section-title">Message</div>
                <div class="message-content">${message}</div>
              </div>

              <!-- Technical Metadata -->
              <div class="section metadata">
                <div class="section-title">Submission Details</div>
                <div class="info-grid">
                  <span class="label">Device</span>
                  <span class="value small">${deviceType}</span>

                  <span class="label">Browser</span>
                  <span class="value small">${browser}</span>

                  <span class="label">Language</span>
                  <span class="value small">${acceptLanguage}</span>

                  <span class="label">IP Address</span>
                  <span class="value small">${ip}</span>

                  <span class="label">Referrer</span>
                  <span class="value small">${referer}</span>
                </div>
              </div>
            </div>

            <div class="action-bar">
              <a href="mailto:${from}?subject=Re: ${encodeURIComponent(subject)}" class="reply-btn">Reply to ${name.split(' ')[0]}</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: `Contact Form <info@mpumelelomkhize.com>`,
      to: ['mmkhize11@gmail.com'],
      cc: [],
      subject: `Personal Website Contact Form: ${subject}`,
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