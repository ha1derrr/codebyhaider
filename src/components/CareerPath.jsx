// src/components/Achievements.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

// --- OPTIMIZED FOR MOBILE ---
const useBinaryAnimation = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      init();
    };
    window.addEventListener("resize", resizeHandler);

    const particles = [];
    // --- FIX 1: Fewer particles on mobile for better performance ---
    let particleCount =
      window.innerWidth < 768
        ? Math.floor((width * height) / 20000) // Less dense for mobile
        : Math.floor((width * height) / 15000); // Original for desktop

    const mouse = { x: null, y: null, radius: 150 };

    const mouseMoveHandler = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    const mouseOutHandler = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseout", mouseOutHandler);

    class Particle {
      constructor(x, y, size, value) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.value = value;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
      }
      draw() {
        ctx.fillStyle = "rgba(163, 230, 53, 0.7)";
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.value, this.x, this.y);
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 10;
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 10;
          }
        }
      }
    }

    function init() {
      particles.length = 0;
      particleCount =
        window.innerWidth < 768
          ? Math.floor(
              (window.innerWidth * canvas.parentElement.offsetHeight) / 20000
            )
          : Math.floor(
              (window.innerWidth * canvas.parentElement.offsetHeight) / 15000
            );
      for (let i = 0; i < particleCount; i++) {
        let size = Math.random() * 5 + 10;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let value = Math.random() > 0.5 ? "1" : "0";
        particles.push(new Particle(x, y, size, value));
      }
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseout", mouseOutHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
};

// Helper component for the typewriter effect
const Typewriter = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        let i = 0;
        const intervalId = setInterval(() => {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(intervalId);
          }
        }, 20);
        return () => clearInterval(intervalId);
      }, delay);
    }
  }, [isInView, text, delay]);

  return <span ref={ref}>{displayedText}</span>;
};

// Helper component for the progress bar
const ProgressBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <div ref={ref} className="w-full bg-neutral-800 rounded-full h-2.5 my-2">
      <motion.div
        className="bg-lime-400 h-2.5 rounded-full"
        style={{ width: "0%" }}
        animate={{ width: isInView ? "100%" : "0%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

const achievements = [
  {
    command: './deploy --project="E-commerce Platform"',
    output:
      "Built a production-ready MERN stack e-commerce platform with a modern, responsive user interface and secure payment integration.",
  },
  {
    command: './build --service="Video Streaming Backend"',
    output:
      "Implemented a scalable backend with role-based access, efficient MongoDB aggregation for video data, and a clean RESTful API.",
  },
  {
    command: './execute --task="MERN Portfolio Development"',
    output:
      "Created a personal portfolio from scratch, featuring interactive animations, a custom UI design, and a consistent, high-tech theme.",
  },
];

export default function Achievements() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    // --- FIX 2: Added `overflow-hidden` to prevent horizontal scroll ---
    <section
      id="achievements"
      className="relative bg-[#0A0A0A] py-32 sm:py-40 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      ></canvas>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
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
              haiderali@portfolio: ~/achievements/log
            </p>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12 text-lg">
            {achievements.map((ach, index) => (
              <div key={index} className="mb-8">
                <p className="text-neutral-400">
                  <span className="text-lime-400">»</span>{" "}
                  <Typewriter text={ach.command} />
                </p>
                <ProgressBar />
                <p className="text-white flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1.5 flex-shrink-0" />
                  <span>
                    <Typewriter text={ach.output} delay={1000} />
                  </span>
                </p>
              </div>
            ))}
            <p className="text-center font-mono text-xs text-neutral-600 mt-8 pt-4 border-t border-neutral-800">
              LOG_TIME:{" "}
              {new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
              })}{" "}
              // SESSION_ID: {Math.random().toString(36).substring(2, 10)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
