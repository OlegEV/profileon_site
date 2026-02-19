import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Create transporter for sending emails using SMTP
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.timeweb.ru",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Пожалуйста, заполните все обязательные поля" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Пожалуйста, введите корректный email" },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // Send email notification
    try {
      const transporter = createTransporter();
      
      await transporter.sendMail({
        from: "no-reply@profileon.ru",
        to: "site@profileon.ru",
        subject: `Сообщение с сайта Профилеон от ${data.name}`,
        text: `
Новое сообщение с сайта Профилеон

Имя: ${data.name}
Email: ${data.email}
Телефон: ${data.phone || "Не указан"}

Сообщение:
${data.message}

---
Отправлено: ${new Date().toLocaleString("ru-RU")}
        `.trim(),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0099FF; margin-top: 0;">Новое сообщение с сайта Профилеон</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 100px;">Имя:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>${data.name}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #0099FF;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Телефон:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone || "Не указан"}</td>
                </tr>
              </table>
              
              <h3 style="color: #333; margin-top: 20px;">Сообщение:</h3>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${data.message}</div>
              
              <p style="color: #999; font-size: 12px; margin-top: 30px;">
                Отправлено: ${new Date().toLocaleString("ru-RU")}
              </p>
            </div>
          </div>
        `,
      });
      console.log("Email sent successfully to info@profileon.ru");
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error("Failed to send email:", emailError);
      // Continue to return success even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время."
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже." },
      { status: 500 }
    );
  }
}

