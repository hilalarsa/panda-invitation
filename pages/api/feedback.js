import fs from "fs";
import path from "path";

const FEEDBACK_FILE = path.join(process.cwd(), "data", "feedbacks.json");
console.log("FEEDBACK_FILE")
export default async function handler(req, res) {
  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  // Initialize file if it doesn't exist
  if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([]));
  }

  if (req.method === "GET") {
    try {
      const fileContents = fs.readFileSync(FEEDBACK_FILE, "utf8");
      const feedbacks = JSON.parse(fileContents);
      return res.status(200).json({
        success: true,
        data: feedbacks.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        ),
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, message, rsvpStatus } = req.body;
      const fileContents = fs.readFileSync(FEEDBACK_FILE, "utf8");
      const feedbacks = JSON.parse(fileContents);

      const newFeedback = {
        id: Date.now(),
        name,
        message,
        rsvpStatus,
        timestamp: new Date().toISOString(),
      };

      feedbacks.push(newFeedback);

      fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks));

      return res.status(200).json({
        success: true,
        data: newFeedback,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
