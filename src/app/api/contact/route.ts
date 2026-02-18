import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
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

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM

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
