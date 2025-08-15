// src/components/Services.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaServer, FaDatabase } from "react-icons/fa";

const useBinaryAnimation = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    let animationFrameId;
    let running = true;

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      init();
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    const particleCount =
      window.innerWidth < 768
        ? Math.floor((width * height) / 30000) // lighter for mobile
        : Math.floor((width * height) / 20000);

    class Particle {
      constructor(x, y, size, value) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.value = value;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 20 + 5;
      }
      draw() {
        ctx.fillStyle = "rgba(163, 230, 53, 0.6)";
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.value, this.x, this.y);
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let forceX =
            (dx / distance) *
            ((mouse.radius - distance) / mouse.radius) *
            this.density;
          let forceY =
            (dy / distance) *
            ((mouse.radius - distance) / mouse.radius) *
            this.density;
          this.x -= forceX;
          this.y -= forceY;
        } else {
          this.x -= (this.x - this.baseX) / 10;
          this.y -= (this.y - this.baseY) / 10;
        }
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        let size = Math.random() * 4 + 8;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let value = Math.random() > 0.5 ? "1" : "0";
        particles.push(new Particle(x, y, size, value));
      }
    }

    function animate() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) animate();
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas.parentElement);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [canvasRef]);
};

const services = [
  {
    pid: "1024",
    icon: <FaLaptopCode />,
    title: "Full Stack Development",
    desc: "Responsive, high-performance web apps using the MERN stack.",
  },
  {
    pid: "2048",
    icon: <FaServer />,
    title: "Backend & API Design",
    desc: "Secure, scalable RESTful APIs with Node.js & Express.",
  },
  {
    pid: "4096",
    icon: <FaDatabase />,
    title: "Database Architecture",
    desc: "Optimized database schemas with MongoDB & MySQL.",
  },
];

export default function Services() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    <section
      id="services"
      className="relative bg-[#0A0A0A] py-24 sm:py-32 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-25"
      ></canvas>

      {/* Overlay gradient for style */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Core Services
        </motion.h2>
        <p className="text-center text-lime-400/70 mb-12">
          A list of active processes and capabilities.
        </p>

        <div className="bg-black/40 rounded-xl border border-neutral-800 shadow-lg">
          {services.map((service) => (
            <motion.div
              key={service.pid}
              className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-lime-400/5 transition-colors"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 min-w-[150px]">
                <span className="text-lime-400 text-xl">{service.icon}</span>
                <span className="font-bold text-white">{service.title}</span>
              </div>
              <p className="text-neutral-300 text-sm flex-1 break-words">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
