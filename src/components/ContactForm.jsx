// src/components/ContactForm.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

// This is the same custom hook for a consistent background.
const useBinaryAnimation = (canvasRef) => {
  useEffect(() => {
    // ... (The full, optimized useBinaryAnimation hook code would be pasted here)
    // For brevity, I'm omitting the full hook code, but you should copy it from the corrected component above.
  }, [canvasRef]);
};

export default function ContactForm() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    <section
      id="contact-form"
      className="relative bg-[#0A0A0A] py-32 sm:py-40 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      ></canvas>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-center text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Dispatch Message
        </motion.h2>
        <p className="text-center text-lime-400/70 mb-16">
          Edit the configuration below to send a direct message.
        </p>

        <motion.div
          className="w-full bg-black/50 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl shadow-lime-500/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Terminal Header */}
          <div className="w-full h-10 bg-neutral-900/80 rounded-t-xl flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
              <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
              <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
            </div>
            <p className="flex-1 text-center text-sm text-neutral-400">
              ~/.config/contact.env
            </p>
          </div>

          {/* Form Body */}
          <form
            action="https://formspree.io/f/YOUR_UNIQUE_ID" // Replace with your Formspree ID
            method="POST"
            className="p-8 md:p-12 space-y-4"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="name" className="text-neutral-500">
                NAME=
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="flex-1 bg-transparent border-b-2 border-neutral-700 focus:border-lime-400 outline-none text-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="email" className="text-neutral-500">
                EMAIL=
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="flex-1 bg-transparent border-b-2 border-neutral-700 focus:border-lime-400 outline-none text-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <label htmlFor="message" className="text-neutral-500">
                MESSAGE=
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="w-full bg-neutral-900/50 p-3 rounded-md border border-neutral-700 focus:border-lime-400 focus:ring-0 outline-none text-white transition-colors"
              ></textarea>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 font-bold text-black bg-lime-400 rounded-lg hover:bg-lime-300 transition-colors duration-300"
              >
                git commit -m "New Message" <FaPaperPlane />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
