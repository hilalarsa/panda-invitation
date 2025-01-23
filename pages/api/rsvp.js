// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, status, message } = body;

    const { data, error } = await supabase.from("rsvp").insert([
      {
        name,
        status,
        message,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from("rsvp").select("*");

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}
