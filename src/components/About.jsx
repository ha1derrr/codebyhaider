// --- CHANGES MADE ---
// 1. Reduced particle count on mobile
// 2. Limited FPS for binary animation
// 3. Made GlitchReveal fully responsive
// 4. Added word wrapping & safe text breaks
// 5. Reduced animation complexity on mobile

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import profileImg from "../assets/profile.jpeg";

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
    const isMobile = window.innerWidth < 768;
    let particleCount = Math.floor(
      (width * height) / (isMobile ? 30000 : 15000)
    );

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
          if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10;
          if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10;
        }
      }
    }

    function init() {
      particles.length = 0;
      particleCount = Math.floor(
        (window.innerWidth * canvas.parentElement.offsetHeight) /
          (isMobile ? 30000 : 15000)
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
    let lastTime = 0;
    const fps = 30; // limit FPS for mobile performance
    const frameInterval = 1000 / fps;

    function animate(time) {
      const deltaTime = time - lastTime;
      if (deltaTime > frameInterval) {
        lastTime = time;
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    init();
    animate(0);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseout", mouseOutHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
};

const Keyword = ({ children, tooltipText }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      className="relative break-words"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-lime-400 font-bold underline decoration-lime-400/50 decoration-dashed underline-offset-4 cursor-help">
        {children}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[80vw] p-3 bg-[#1E1F1A] text-white text-sm rounded-md border border-[#3E3D32] shadow-lg z-20 break-words"
          >
            <p className="font-mono">{tooltipText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

const GlitchReveal = ({ imageSrc }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsRevealed(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex-shrink-0"
    >
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="glitch"
            className="absolute inset-0 bg-black flex items-center justify-center rounded-full border border-neutral-700"
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4 } }}
          >
            <span className="text-lime-400 font-mono text-xs animate-pulse">
              Initializing...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img
        src={imageSrc}
        alt="Haider Ali"
        className="w-full h-full object-cover rounded-full border border-neutral-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
};

export default function About() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    <section
      id="about"
      className="relative bg-[#0A0A0A] py-20 sm:py-32 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-20"
      ></canvas>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full bg-black/50 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl shadow-lime-500/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full h-10 bg-neutral-900/80 rounded-t-xl flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="flex-1 text-center text-xs sm:text-sm text-neutral-400 truncate">
              haiderali@portfolio: ~/bio.md
            </p>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <GlitchReveal imageSrc={profileImg} />
              <div className="text-center md:text-left break-words">
                <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed">
                  As a full-stack architect, I build high-performance web
                  applications from concept to deployment. With deep expertise
                  in the{" "}
                  <Keyword tooltipText="MongoDB, Express.js, React, Node.js">
                    MERN stack
                  </Keyword>{" "}
                  and{" "}
                  <Keyword tooltipText="React framework for server-side rendering & static sites">
                    Next.js
                  </Keyword>
                  , I engineer robust backends and create pixel-perfect,
                  responsive user interfaces.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                  <a
                    href="/HaiderAliResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 font-bold text-black bg-lime-400 rounded-lg hover:bg-lime-300 transition-colors duration-300"
                  >
                    View Resume
                  </a>
                  <a
                    href="https://github.com/ha1derrr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 font-bold text-white border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
