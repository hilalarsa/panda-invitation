import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input, Textarea, Card } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
);

const RSVPandFeedbackSection = ({ invitedGuest }) => {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [message, setMessage] = useState("");
  // const [invitedGuest, setinvitedGuest] = useState(invitedGuest);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data: feedbacks, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) throw error;
      setFeedbacks(feedbacks || []);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  const handleSubmit = async () => {
    if (!invitedGuest || !message || !rsvpStatus) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from("feedbacks").insert([
        {
          name: invitedGuest,
          message,
          rsvpStatus,
          timestamp: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      fetchFeedbacks(); // Refresh feedbacks

      // Reset form
      // setinvitedGuest("");
      setMessage("");
      setRsvpStatus(null);
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
              label="Nama"
              value={invitedGuest}
              disabled
              // onChange={(e) => setinvitedGuest(invitedGuest || e.target.value)}
              className="mb-4"
            />

            <div className="flex gap-4 justify-center mb-4">
              <Button
                color={rsvpStatus === "attending" ? "primary" : "default"}
                onClick={() => setRsvpStatus("attending")}
              >
                Ya, Saya bisa hadir
              </Button>
              <Button
                color={rsvpStatus === "not-attending" ? "primary" : "default"}
                onClick={() => setRsvpStatus("not-attending")}
              >
                Maaf, belum bisa hadir
              </Button>
            </div>

            <Textarea
              label="Pesan"
              placeholder="Kirim pesan anda untuk pasangan mempelai"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-4"
            />

            <Button
              color="primary"
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting || !invitedGuest || !message || !rsvpStatus}
            >
              {isSubmitting ? "Sending..." : "Kirim RSVP & Wishes"}
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
          className="space-y-4 max-h-[400px] overflow-auto"
        >
          <h3 className="text-2xl font-serif text-center mb-6">Messages</h3>
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className=""
            >
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{feedback.name}</h4>
                  <small className="text-gray-500">
                    {new Date(feedback.timestamp).toLocaleDateString()}
                  </small>
                </div>
                <p className="text-gray-600">{feedback.message}</p>
                <p className="text-sm text-gray-500">
                  {feedback.rsvpStatus === "attending"
                    ? "✅ Attending"
                    : "❌ Not Attending"}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPandFeedbackSection;
