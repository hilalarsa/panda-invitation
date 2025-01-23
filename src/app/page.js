"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { useSearchParams } from "next/navigation";
import RSVPSection from "./RSVPSection";

import config from "@/app/data/config.json";

const WeddingInvitation = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [play, { stop }] = useSound(config.musicSection.songPath);
  const invitedGuest = searchParams.get("for") || "Our Valued Guest";
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date(config.coverSection.date);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.coverSection.date]);

  const handleOpen = () => {
    setIsOpen(true);
    play();
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Cover Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen relative"
        style={{
          backgroundImage: `url('${config.coverSection.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-serif mb-4"
          >
            {config.coverSection.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8"
          >
            {config.coverSection.subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-lg mb-4">Dengan hormat:</p>
            <p className="text-lg mb-4">Bapak / Ibu / Saudara / i:</p>
            <p className="text-2xl font-serif">{invitedGuest}</p>
          </motion.div>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleOpen}
            className="mt-8 px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Open Invitation
          </motion.button>
        </div>
      </motion.section>

      {/* Music and Date Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="h-screen relative"
        style={{
          backgroundImage: `url('${config.musicSection.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif mb-4">
              {config.musicSection.date}
            </h2>
            <p className="text-xl">{config.musicSection.time}</p>
            <p className="text-xl">{config.musicSection.venue}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Couple Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen"
        style={{
          backgroundImage: `url('${config.coupleSection.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Groom */}
        <div className="bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <img
              src={config.coupleSection.groom.photo}
              alt="Groom"
              className="w-64 h-64 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-2xl font-serif mb-2">
              {config.coupleSection.groom.name}
            </h3>
            <p className="text-gray-100 mb-4">
              {config.coupleSection.groom.degree}
            </p>
            <p className="text-gray-100">
              {config.coupleSection.groom.parents.childStatus}
            </p>
            <p className="text-gray-100">
              {config.coupleSection.groom.parents.father}
            </p>
            <p className="text-gray-100">&</p>
            <p className="text-gray-100">
              {config.coupleSection.groom.parents.mother}
            </p>
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <img
              src={config.coupleSection.bride.photo}
              alt="Bride"
              className="w-64 h-64 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-2xl font-serif mb-2">
              {config.coupleSection.bride.name}
            </h3>
            <p className="text-gray-100 mb-4">
              {config.coupleSection.bride.degree}
            </p>
            <p className="text-gray-100">
              {config.coupleSection.bride.parents.childStatus}
            </p>
            <p className="text-gray-100">
              {config.coupleSection.bride.parents.father}
            </p>
            <p className="text-gray-100">&</p>
            <p className="text-gray-100">
              {config.coupleSection.bride.parents.mother}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Countdown Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage: `url('${config.countdownSection.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" flex flex-col items-center justify-center">
          <motion.div className="mb-16 text-center">
            <h2 className="text-3xl font-serif mb-8 text-gray-100">
              Counting down to our special day
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-3xl font-bold">{timeLeft.days}</p>
                <p className="text-gray-600">Days</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-3xl font-bold">{timeLeft.hours}</p>
                <p className="text-gray-600">Hours</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                <p className="text-gray-600">Minutes</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                <p className="text-gray-600">Seconds</p>
              </div>
            </div>
          </motion.div>
          {/* reception */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-serif mb-4">
                {config.venueSection.reception.title}
              </h3>
              <p className="text-xl mb-2">
                {config.venueSection.reception.date}
              </p>
              <p className="text-lg mb-4">
                {config.venueSection.reception.time}
              </p>
              <p className="font-semibold mb-2">
                {config.venueSection.reception.venue}
              </p>
              <p className="text-gray-600 mb-4">
                {config.venueSection.reception.address}
              </p>
              <a
                href={config.venueSection.reception.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Maps
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Venue Section */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen bg-gray-500 py-16 px-6"
      >
        
      </motion.section> */}
      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen bg-gray-50 py-16 px-6"
      >
        <h2 className="text-3xl font-serif text-center mb-8">Our Moments</h2>
        <div className="grid grid-cols-2 gap-4">
          {config.gallerySection.photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={photo.width === "full" ? "col-span-2" : "col-span-1"}
            >
              <img
                src={photo.url}
                alt={`Gallery photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* RSVP Section */}
      <RSVPSection />
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen bg-white py-16 px-6"
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-serif text-center mb-4">
            {config.rsvpSection.title}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {config.rsvpSection.subtitle}
          </p>

          <div className="space-y-6">
            <Input
              label="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="mb-4"
            />

            <div className="flex gap-4 justify-center">
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
              className="mt-6"
            />

            <Button
              color="primary"
              className="w-full"
              onClick={() => {
                // Handle RSVP submission
                console.log({ guestName, rsvpStatus, message });
                // You would typically send this to your backend
              }}
            >
              Send RSVP
            </Button>
          </div>
        </div>
      </motion.section> */}

      {/* Gift Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen bg-gray-50 py-16 px-6"
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-serif text-center mb-4">
            {config.giftSection.title}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {config.giftSection.subtitle}
          </p>

          {/* Bank Accounts */}
          <div className="mb-8">
            <h3 className="text-xl font-serif mb-4">Bank Details</h3>
            {config.giftSection.accounts.map((account, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p className="font-semibold">{account.bank}</p>
                <p className="font-mono">{account.number}</p>
                <p className="text-gray-600">a/n {account.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Physical Addresses */}
          <div>
            <h3 className="text-xl font-serif mb-4">Gift Addresses</h3>
            {config.giftSection.addresses.map((address, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p className="font-semibold">{address.title}</p>
                <p className="text-gray-600">{address.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Thank You Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="min-h-screen bg-white py-16 px-6 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif mb-6">Thank You</h2>
          <p className="text-gray-600">{config.thankYouSection.message}</p>
          <p className="mt-4 font-serif text-2xl">
            {config.coverSection.title}
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default WeddingInvitation;
