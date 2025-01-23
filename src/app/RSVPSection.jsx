import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input, Textarea, Card } from "@nextui-org/react";

const RSVPandFeedbackSection = () => {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback");
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  const handleSubmit = async () => {
    if (!guestName || !message || !rsvpStatus) return;

    setIsSubmitting(true);
    try {
      // Submit RSVP
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: guestName, status: rsvpStatus, message }),
      });

      // Submit Feedback
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: guestName, message }),
      });

      setSubmitSuccess(true);
      setGuestName("");
      setMessage("");
      setRsvpStatus(null);
      fetchFeedbacks(); // Refresh feedbacks
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-serif text-center mb-4">RSVP & Wishes</h2>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-6">
            <Input
              label="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="mb-4"
            />

            <div className="flex gap-4 justify-center mb-4">
              <Button
                color={rsvpStatus === "attending" ? "primary" : "default"}
                onClick={() => setRsvpStatus("attending")}
              >
                Yes, I'll be there
              </Button>
              <Button
                color={rsvpStatus === "not-attending" ? "primary" : "default"}
                onClick={() => setRsvpStatus("not-attending")}
              >
                Sorry, I can't make it
              </Button>
            </div>

            <Textarea
              label="Your Message"
              placeholder="Send your wishes to the couple..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-4"
            />

            <Button
              color="primary"
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting || !guestName || !message || !rsvpStatus}
            >
              {isSubmitting ? "Sending..." : "Send RSVP & Wishes"}
            </Button>

            {submitSuccess && (
              <p className="text-green-500 text-center mt-4">
                Thank you for your response!
              </p>
            )}
          </Card>
        </motion.div>

        {/* Feedback Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-serif text-center mb-6">Messages</h3>
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{feedback.name}</h4>
                  <small className="text-gray-500">
                    {new Date(feedback.timestamp).toLocaleDateString()}
                  </small>
                </div>
                <p className="text-gray-600">{feedback.message}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPandFeedbackSection;
