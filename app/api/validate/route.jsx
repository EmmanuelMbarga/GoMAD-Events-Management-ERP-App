import axios from "axios";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to validate data.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} The response object containing the validation result or error message.
 */
export async function POST(req) {
  const body = await req.json();

  try {
    // Ensure the QR code is clean and properly formatted
    const qrCodeData = body.qrCode.replace(/"/g, "");

    const response = await axios.post(
      "https://gomad-backend.onrender.com/api/validate",
      { qrCode: qrCodeData }, // Send cleaned data
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route with request body:", body);
    const status = error.response ? error.response.status : 500;
    const errorMessage = error.response
      ? error.response.data.error
      : "Server error";
    return NextResponse.json({ error: errorMessage, status });
  }
}
