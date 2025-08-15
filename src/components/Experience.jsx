// src/components/Experience.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const useBinaryAnimation = (canvasRef, isActive) => {
  useEffect(() => {
    if (!isActive) return; // Don't run if not in view

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const isMobile = window.innerWidth < 768;

    // Mobile-friendly particle cap
    const maxParticles = isMobile ? 30 : 80;
    const particles = [];

    const mouse = isMobile ? null : { x: null, y: null, radius: 150 };

    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
      });
      window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
      });
    }

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
        if (mouse?.x && mouse?.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * this.density;
            this.y -= (dy / distance) * force * this.density;
            return;
          }
        }
        this.x -= (this.x - this.baseX) / 10;
        this.y -= (this.y - this.baseY) / 10;
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        particles.push(
          new Particle(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 5 + 10,
            Math.random() > 0.5 ? "1" : "0"
          )
        );
      }
    }

    // Throttled resize
    let resizeTimeout;
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        initParticles();
      }, 150);
    };
    window.addEventListener("resize", resizeHandler);

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, isActive]);
};

const Typewriter = React.memo(({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!isInView) return;
    const timeoutId = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        if (++i >= text.length) clearInterval(intervalId);
      }, 15);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [isInView, text, delay]);

  return <span ref={ref}>{displayedText}</span>;
});

const experience = {
  role: "Full Stack Developer",
  company: "Rettrose Trading Private Limited",
  location: "New Delhi",
  period: "Jan 2025 – June 2025",
  details: [
    "Initialized MERN stack for e-commerce platform.",
    "Implemented product listings, filters, and responsive UI with Tailwind CSS.",
    "Integrated Razorpay for secure payment processing.",
    "Built scalable RESTful APIs using Node.js, Express.js, and MongoDB.",
    "Collaborated with cross-functional teams to align features with business goals.",
  ],
};

export default function Experience() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  useBinaryAnimation(canvasRef, isInView);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#0A0A0A] py-24 sm:py-32 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-black/50 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl shadow-lime-500/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Terminal Header */}
          <div className="w-full h-10 bg-neutral-900/80 rounded-t-xl flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
              <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
              <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
            </div>
            <p className="flex-1 text-center text-sm text-neutral-400 truncate">
              /var/log/experience.log
            </p>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-12">
            <div className="border-b border-neutral-800 pb-6 mb-6">
              <h2 className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-white">
                {experience.role}
              </h2>
              <p className="text-lime-400 text-[clamp(1rem,1.5vw,1.25rem)]">
                {experience.company}
              </p>
              <p className="text-neutral-500 text-[clamp(0.875rem,1.2vw,1rem)] break-words">
                {experience.period} | {experience.location}
              </p>
            </div>

            <div className="space-y-3 text-[clamp(0.875rem,1vw,1rem)]">
              {experience.details.map((detail, index) => (
                <div key={index} className="flex flex-wrap gap-3 min-w-0">
                  <p className="text-neutral-600 whitespace-nowrap">
                    [
                    {new Date(
                      Date.now() - (experience.details.length - index) * 3600000
                    ).toLocaleTimeString("en-US", { hour12: false })}
                    ]
                  </p>
                  <p className="flex-1 break-words">
                    <span className="text-green-400">[INFO]</span>
                    <span className="text-neutral-300 ml-2">
                      <Typewriter text={detail} delay={index * 200} />
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
