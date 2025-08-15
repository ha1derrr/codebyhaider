// src/components/TechStack.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// --- OPTIMIZED FOR MOBILE ---
const useMatrixAnimation = (canvasRef, techStack) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", resizeHandler);

    // --- FIX 1: Fewer columns on mobile for better performance ---
    const columns = Math.floor(width / (window.innerWidth < 768 ? 24 : 20));
    const yPositions = Array(columns).fill(0);
    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(163, 230, 53, 0.7)"; // Lime color
      ctx.font = "16px monospace";

      yPositions.forEach((y, index) => {
        let text;
        if (Math.random() > 0.995) {
          text = techStack[Math.floor(Math.random() * techStack.length)];
          ctx.fillStyle = "#FFFFFF";
        } else {
          text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          ctx.fillStyle = "rgba(163, 230, 53, 0.7)";
        }

        const x = index * (window.innerWidth < 768 ? 24 : 20);
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    }

    // --- FIX 1 (cont.): Slower redraw on mobile ---
    let animationFrameId = setInterval(draw, window.innerWidth < 768 ? 50 : 33);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearInterval(animationFrameId);
    };
  }, [canvasRef, techStack]);
};

const techStack = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "TypeScript",
  "TailwindCSS",
  "Git",
  "Vite",
  "Appwrite",
  "HTML5",
  "CSS3",
];

export default function TechStack() {
  const canvasRef = useRef(null);
  useMatrixAnimation(canvasRef, techStack);

  return (
    // --- FIX 2: Added `overflow-hidden` to prevent horizontal scroll ---
    <section
      id="tech-stack"
      className="relative bg-[#0A0A0A] py-32 sm:py-40 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-50"
      ></canvas>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Core Technology Stack
        </motion.h2>
        <motion.p
          className="text-lime-400/70 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          The languages, frameworks, and tools I use to build modern web
          applications.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {techStack.map((tech) => (
            <div
              key={tech}
              className="px-4 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-white"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
