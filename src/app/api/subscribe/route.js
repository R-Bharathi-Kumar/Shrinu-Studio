// app/api/subscribe/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // 1. Email notification to YOU
    const mailToOwner = {
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: `[New Subscriber] ${email} // Shrinu Studio`,
      html: `
    <div style="background-color: #111111; padding: 50px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-height: 100%;">
      <div style="max-width: 550px; margin: 0 auto; background-color: #111111; border: 1px solid #FF9494; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(255, 148, 148, 0.15);">
        
        <!-- Header Section -->
        <div style="padding: 45px 40px 30px 40px; border-bottom: 1px dashed #FF9494;">
          <p style="color: #0C23B7; font-size: 11px; font-weight: 700; letter-spacing: 4px; margin: 0 0 12px 0; text-transform: uppercase;">// SYSTEM NOTIFICATION</p>
          <h1 style="color: #FFFFFF; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1;">Growth <br>Detected.</h1>
        </div>

        <!-- Body Section -->
        <div style="padding: 40px 40px 40px 40px;">
          <p style="color: #A0A0A0; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 30px;">
            Your portfolio website just captured a new audience member. They have been added to your mailing list loop.
          </p>
          
          <!-- Data Box -->
          <div style="background-color: #1a1a1a; border: 1px solid #0C23B7; border-radius: 8px; padding: 20px; margin-bottom: 10px;">
            <p style="color: #FF9494; font-size: 11px; font-weight: 700; letter-spacing: 2px; margin: 0 0 8px 0; text-transform: uppercase;">SUBSCRIBER EMAIL</p>
            <p style="color: #FFFFFF; font-size: 18px; font-family: 'Courier New', Courier, monospace; font-weight: 600; margin: 0; word-break: break-all;">
              ${email}
            </p>
          </div>
        </div>
        
        <!-- Footer Section -->
        <div style="background-color: #FF9494; padding: 15px 40px; text-align: left;">
          <span style="color: #111111; font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">SHRINU STUDIO AUTOMATION</span>
        </div>
        
      </div>
    </div>
  `,
    };

    const mailToSubscriber = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Welcome to the Newsletter // Shrinu Studio",
      html: `
    <div style="background-color: #111111; padding: 50px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-height: 100%;">
      <div style="max-width: 550px; margin: 0 auto; background-color: #111111; border: 1px solid #0C23B7; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(12, 35, 183, 0.25);">
        
        <!-- Header Section -->
        <div style="padding: 45px 40px 30px 40px; border-bottom: 1px dashed #0C23B7;">
          <p style="color: #FF9494; font-size: 11px; font-weight: 700; letter-spacing: 4px; margin: 0 0 12px 0; text-transform: uppercase;">// INITIATE TRANSMISSION</p>
          <h1 style="color: #FFFFFF; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1;">Welcome <br>Aboard.</h1>
        </div>

        <!-- Body Section -->
        <div style="padding: 40px 40px 30px 40px;">
          <p style="color: #FFFFFF; font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 20px; letter-spacing: -0.2px;">Hello there,</p>
          
          <p style="color: #A0A0A0; font-size: 15px; line-height: 1.7; margin-bottom: 40px; font-weight: 400;">
            Thank you for subscribing to my newsletter. I'm thrilled to have you here. You'll be the first to know about new projects, design insights, and the latest creative updates straight from the studio.
          </p>
          
          <!-- Subtle Accent Rule -->
          <div style="width: 40px; height: 2px; background-color: #FF9494; margin-bottom: 40px;"></div>
          
          <!-- Sign-off -->
          <p style="color: #FFFFFF; font-size: 14px; font-weight: 500; margin-bottom: 4px;">Best regards,</p>
          <p style="color: #0C23B7; font-size: 16px; font-weight: 700; margin-top: 0; letter-spacing: 0.5px;">SHRINU STUDIO</p>
        </div>
        
        <!-- Footer Section -->
        <div style="background-color: #0C23B7; padding: 20px 40px; text-align: left; display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #FFFFFF; font-size: 10px; font-weight: 700; letter-spacing: 2px;">SHRINU STUDIO</span>
          <span style="color: #FF9494; font-size: 9px; font-weight: 500; letter-spacing: 1px;">© 2026 ALL RIGHTS RESERVED</span>
        </div>
        
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSubscriber);

    return NextResponse.json(
      { success: true, message: "Subscribed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { success: false, message: "Subscription failed" },
      { status: 500 },
    );
  }
}
