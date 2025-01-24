import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://gomad-backend.onrender.com/api");
  const data = await response.json();
  return NextResponse.json(data);
}
