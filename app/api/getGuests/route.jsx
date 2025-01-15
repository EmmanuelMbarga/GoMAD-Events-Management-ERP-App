import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('https://anjeagwe2025-backend.onrender.com/api/guests');
    const data = await response.json();
    return NextResponse.json(data);
}
