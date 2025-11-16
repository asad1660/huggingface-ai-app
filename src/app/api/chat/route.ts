// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // force Node runtime

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "NextJS AI Chat App",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // you confirmed this works
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[OpenRouter Error]", data);
      return NextResponse.json(
        { error: "OpenRouter API failed", detail: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: data.choices?.[0]?.message?.content ?? "No response from model",
    });
  } catch (error) {
    console.error("[API ERROR] /api/chat", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
