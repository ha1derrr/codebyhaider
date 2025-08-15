import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { FaArrowRight } from "react-icons/fa";

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
    const getParticleCount = () =>
      window.innerWidth < 640
        ? 25 // small phones
        : window.innerWidth < 1024
        ? 50 // tablets
        : 80; // desktops

    const mouse = { x: null, y: null, radius: 120 };
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
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 20 + 1;
      }
      draw() {
        ctx.fillStyle = "rgba(163, 230, 53, 0.8)";
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.value, this.x, this.y);
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceX =
            (dx / distance) *
            ((mouse.radius - distance) / mouse.radius) *
            this.density;
          const forceY =
            (dy / distance) *
            ((mouse.radius - distance) / mouse.radius) *
            this.density;
          this.x -= forceX;
          this.y -= forceY;
        } else {
          this.x -= (this.x - this.baseX) / 15;
          this.y -= (this.y - this.baseY) / 15;
        }
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < getParticleCount(); i++) {
        const size = Math.random() * 5 + 10;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const value = Math.random() > 0.5 ? "1" : "0";
        particles.push(new Particle(x, y, size, value));
      }
    }

    let animationFrameId;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function animate(time) {
      const delta = time - lastTime;
      if (delta > interval) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
        lastTime = time - (delta % interval);
      }
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

const techStack = [
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
  "Git",
];

export default function Hero() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center bg-[#0A0A0A] font-mono pt-20 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      ></canvas>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full bg-black/50 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl shadow-lime-500/10 will-change-transform"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          {/* Terminal Header */}
          <div className="w-full h-10 bg-neutral-900/80 rounded-t-xl flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
              <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
              <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
            </div>
            <p className="flex-1 text-center text-xs sm:text-sm text-neutral-400 truncate">
              /bin/bash --login
            </p>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-8 md:p-12">
            <div className="text-base sm:text-xl md:text-2xl text-white break-words">
              <span className="text-lime-400">haiderali@portfolio</span>
              <span className="text-neutral-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-neutral-500">$</span>
              <ReactTyped
                strings={["./initiate-profile.sh"]}
                typeSpeed={40}
                showCursor
                cursorChar="_"
                className="ml-1 sm:ml-2"
              />
            </div>

            <div className="mt-6 sm:mt-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight break-words">
                Haider Ali
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-lime-400 mt-2 break-words">
                Full Stack Developer
              </h2>
              <p className="text-neutral-300 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
                I build high-performance, scalable web applications with a focus
                on clean code and seamless user experiences.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 border-t border-neutral-800 pt-5 sm:pt-6">
              <p className="text-neutral-400 mb-3 sm:mb-4 text-sm">
                // System Check: Core Technologies Loaded
              </p>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                {techStack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <span className="text-green-500">✔</span>
                    <span className="text-white text-xs sm:text-sm md:text-base">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 font-bold text-black bg-lime-400 rounded-lg hover:bg-lime-300 transition-colors duration-300 text-sm sm:text-base"
              >
                View My Work <FaArrowRight />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
