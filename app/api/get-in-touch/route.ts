import { NextRequest, NextResponse } from "next/server";
import sgMail from '@sendgrid/mail';

// Set your SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      message,
    } = await request.json();

    // Compose the email content
    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Request</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
          }
          
          .header p {
            font-size: 16px;
            margin-top: 8px;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .field-group {
            margin-bottom: 30px;
          }
          
          .field-label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: #555555;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .field-value {
            font-size: 16px;
            color: #333333;
            background-color: #f8f9fa;
            padding: 16px 20px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            margin: 0;
          }
          
          .message-field {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            border-left: 4px solid #667eea;
            font-size: 16px;
            line-height: 1.7;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e9ecef, transparent);
            margin: 40px 0;
          }
          
          .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
          }
          
          .footer p {
            font-size: 14px;
            color: #666666;
            margin: 0;
          }
          
          .timestamp {
            font-size: 12px;
            color: #888888;
            margin-top: 10px;
          }
          
          @media (max-width: 600px) {
            .container {
              margin: 0;
              box-shadow: none;
            }
            
            .header, .content, .footer {
              padding: 30px 20px;
            }
            
            .header h1 {
              font-size: 22px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Request</h1>
            <p>You have received a new message from your portfolio</p>
          </div>
          
          <div class="content">
            <div class="field-group">
              <span class="field-label">Name</span>
              <p class="field-value">${name}</p>
            </div>
            
            <div class="field-group">
              <span class="field-label">Email Address</span>
              <p class="field-value">${email}</p>
            </div>
            
            <div class="field-group">
              <span class="field-label">Message</span>
              <div class="message-field">${message}</div>
            </div>
            
            <div class="divider"></div>
            
            <p style="font-size: 14px; color: #666666; text-align: center; margin: 0;">
              Reply directly to this email to respond to <strong>${name}</strong>
            </p>
          </div>
          
          <div class="footer">
            <p>This message was sent from your portfolio contact form</p>
            <p class="timestamp">Received on ${new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create the email object
    const msg = {
      to: 'fezwebco@gmail.com', // Your email where you want to receive messages
      from: {
        email: 'benhicks33@gmail.com', // Must be verified in SendGrid
        name: 'Portfolio Contact Form'
      },
      subject: `New Contact Request from ${name}`,
      html: emailContent,
      replyTo: email, // This allows you to reply directly to the person who submitted the form
    };

    // Create thank you email for the user
    const thankYouEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Message</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
          }
          
          .header p {
            font-size: 16px;
            margin-top: 8px;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .greeting {
            font-size: 18px;
            color: #333333;
            margin-bottom: 20px;
          }
          
          .message-text {
            font-size: 16px;
            color: #555555;
            line-height: 1.7;
            margin-bottom: 25px;
          }
          
          .highlight-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
            margin: 30px 0;
          }
          
          .highlight-box p {
            font-size: 16px;
            color: #333333;
            margin: 0;
            font-weight: 500;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e9ecef, transparent);
            margin: 40px 0;
          }
          
          .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
          }
          
          .footer p {
            font-size: 14px;
            color: #666666;
            margin: 0;
          }
          
          .signature {
            font-size: 16px;
            color: #333333;
            margin-top: 30px;
          }
          
          .signature-name {
            font-weight: 600;
            color: #28a745;
          }
          
          @media (max-width: 600px) {
            .container {
              margin: 0;
              box-shadow: none;
            }
            
            .header, .content, .footer {
              padding: 30px 20px;
            }
            
            .header h1 {
              font-size: 22px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out!</h1>
            <p>Your message has been received</p>
          </div>
          
          <div class="content">
            <p class="greeting">Hello ${name},</p>
            
            <p class="message-text">
              Thank you for taking the time to reach out through my portfolio contact form. 
              I really appreciate your interest and I'm excited to connect with you.
            </p>
            
            <div class="highlight-box">
              <p>I'll review your message and get back to you within 24 hours.</p>
            </div>
            
            <p class="message-text">
              In the meantime, feel free to explore more of my work on my portfolio. 
              If you have any urgent questions, please don't hesitate to reach out directly.
            </p>
            
            <div class="divider"></div>
            
            <p class="signature">
              Best regards,<br>
              <span class="signature-name">Ben Hicks</span><br>
              <span style="font-size: 14px; color: #666666;">Full Stack Developer</span>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated response to confirm receipt of your message.</p>
            <p style="margin-top: 10px; font-size: 12px; color: #888888;">
              Sent on ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const thankYouMsg = {
      to: email, // Send to the user who submitted the form
      from: {
        email: 'fezwebco@gmail.com', // Must be verified in SendGrid
        name: 'Ben Hicks - Portfolio'
      },
      subject: 'Thank you for your message - I\'ll be in touch soon!',
      html: thankYouEmailContent,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(msg),
      sgMail.send(thankYouMsg)
    ]);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact request:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}