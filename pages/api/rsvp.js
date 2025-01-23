// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, status, message } = body;

    const rsvpPath = path.join(process.cwd(), "data/rsvp.json");
    const rsvpData = await fs.readFile(rsvpPath, "utf8");
    const rsvpJson = JSON.parse(rsvpData);

    const newRSVP = {
      id: Date.now().toString(),
      name,
      status,
      message,
      timestamp: new Date().toISOString(),
    };

    rsvpJson.responses.push(newRSVP);
    await fs.writeFile(rsvpPath, JSON.stringify(rsvpJson, null, 2));

    return NextResponse.json({ success: true, data: newRSVP });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rsvpPath = path.join(process.cwd(), "data/rsvp.json");
    const rsvpData = await fs.readFile(rsvpPath, "utf8");
    const rsvpJson = JSON.parse(rsvpData);

    return NextResponse.json({ success: true, data: rsvpJson.responses });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}

// app/api/feedback/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    const feedbackPath = path.join(process.cwd(), "data/feedback.json");
    const feedbackData = await fs.readFile(feedbackPath, "utf8");
    const feedbackJson = JSON.parse(feedbackData);

    const newFeedback = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    feedbackJson.messages.push(newFeedback);
    await fs.writeFile(feedbackPath, JSON.stringify(feedbackJson, null, 2));

    return NextResponse.json({ success: true, data: newFeedback });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbackPath = path.join(process.cwd(), "data/feedback.json");
    const feedbackData = await fs.readFile(feedbackPath, "utf8");
    const feedbackJson = JSON.parse(feedbackData);

    return NextResponse.json({ success: true, data: feedbackJson.messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
