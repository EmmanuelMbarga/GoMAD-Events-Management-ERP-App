import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();

  try {
    const response = await axios.post(
      "https://gomad-backend.onrender.com/api/register",
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route:", error);
    const status = error.response ? error.response.status : 500;
    const errorMessage = error.response
      ? error.response.data.error
      : "Server error";
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
