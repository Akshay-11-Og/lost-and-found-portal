import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CATEGORIES = [
  "Bag",
  "Bottle",
  "ID Card",
  "Electronics",
  "Documents",
  "Keys",
  "Clothing",
  "Other",
];

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title && !description) {
      return NextResponse.json(
        { error: "Provide at least a title or description" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
   const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const prompt = `You are helping a student fill out a "lost item" report form on a campus lost-and-found app.

Item title: ${title || "(not provided)"}
Rough notes/description from the student: ${description || "(not provided)"}

Based on this, respond with ONLY a JSON object (no markdown, no code fences) with these exact keys:
- "category": pick the single best match from this exact list: ${CATEGORIES.join(", ")}
- "description": a clear, helpful 1-2 sentence description of the item, written in plain language a fellow student would understand, based on the notes given. If the notes are already good, lightly polish them rather than rewriting from scratch.

Example output: {"category": "Bag", "description": "A black backpack with a laptop sleeve, last seen near the library entrance."}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!CATEGORIES.includes(parsed.category)) {
      parsed.category = "Other";
    }

    return NextResponse.json(parsed);
  } catch (error) {
   console.error("AI suggestion error:", error);
if (error instanceof Error) {
  console.error("Message:", error.message);
}
    return NextResponse.json(
      { error: "Failed to generate suggestion" },
      { status: 500 }
    );
  }
}