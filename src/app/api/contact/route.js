import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the JSON body sent from the client
    const { email, message } = await request.json();

    // 1. Configure Nodemailer with your secure env variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // 2. Set up the email options
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      replyTo: email,
      subject: `New Message via Shrinu Studio - ${email}`,

      // Fallback for non-HTML email clients
      text: `You have received a new message from your website contact form:\n\nSender: ${email}\nMessage:\n${message}`,

      // The styled HTML version
      html: `
    <div style="background-color: #111111; padding: 50px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-height: 100%;">
      <div style="max-width: 550px; margin: 0 auto; background-color: #111111; border: 1px solid #FF9494; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(255, 148, 148, 0.15);">
        
        <!-- Header Section -->
        <div style="padding: 45px 40px 30px 40px; border-bottom: 1px dashed #FF9494;">
          <p style="color: #FF9494; font-size: 11px; font-weight: 700; letter-spacing: 4px; margin: 0 0 12px 0; text-transform: uppercase;">// INCOMING TRANSMISSION</p>
          <h1 style="color: #FFFFFF; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1;">Inquiry <br>Received.</h1>
        </div>

        <!-- Body Section -->
        <div style="padding: 40px 40px 30px 40px;">
          
          <!-- Sender Meta -->
          <p style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #FF9494; letter-spacing: 2px; margin: 0 0 6px 0;">// Source_Email</p>
          <p style="font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 30px;">
            <a href="mailto:${email}" style="color: #FFFFFF; text-decoration: none; border-bottom: 1px dashed #0C23B7; padding-bottom: 2px;">${email}</a>
          </p>

          <!-- Message Block -->
          <p style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #FF9494; letter-spacing: 2px; margin: 0 0 10px 0;">// Metadata_Message</p>
          <div style="background-color: #1a1a1a; padding: 25px; border-radius: 12px; border-left: 4px solid #0C23B7; margin-bottom: 30px;">
            <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #E0E0E0; white-space: pre-wrap;">${message}</p>
          </div>
          
        </div>
        
        <!-- Footer Section -->
        <div style="background-color: #FF9494; padding: 18px 40px; text-align: left;">
          <span style="color: #111111; font-size: 10px; font-weight: 800; letter-spacing: 2px;">SHRINU STUDIO // SYSTEM ALERT</span>
        </div>
        
      </div>
    </div>
  `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 },
    );
  }
}
