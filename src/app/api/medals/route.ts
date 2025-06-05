import { NextResponse } from "next/server";
import { Medal } from "@/types/medal";
import medalsData from "@/data/medals.json";

export async function GET() {
  try {
    // Simulate potential API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Simulate potential API failure (uncomment to test error handling)
    // throw new Error("API temporarily unavailable");

    // Type assertion to ensure the imported JSON matches our Medal interface
    const typedMedalsData = medalsData as Medal[];

    return NextResponse.json(typedMedalsData);
  } catch (error) {
    console.error("Error fetching medals:", error);
    return NextResponse.json(
      { error: "Failed to fetch medals data" },
      { status: 500 }
    );
  }
}
