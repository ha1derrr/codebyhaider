// src/components/Skills.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaTools,
  FaCode,
  FaBrain,
} from "react-icons/fa";

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
        : Math.floor((width * height) / 10000); // Original for desktop

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
        ctx.fillStyle = "rgba(163, 230, 53, 0.8)";
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
              (window.innerWidth * canvas.parentElement.offsetHeight) / 10000
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

const skillsData = [
  {
    category: "Frontend",
    skills: ["React.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
    icon: <FaReact />,
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT", "Middleware"],
    icon: <FaNodeJs />,
  },
  { category: "Databases", skills: ["MongoDB", "MySQL"], icon: <FaDatabase /> },
  {
    category: "Languages",
    skills: ["JavaScript", "Java", "C"],
    icon: <FaCode />,
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Postman", "WordPress"],
    icon: <FaTools />,
  },
  {
    category: "CS Fundamentals",
    skills: ["OOP", "DBMS", "Computer Networks"],
    icon: <FaBrain />,
  },
];

const listVariants = {
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  hidden: { opacity: 0 },
};

const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -20 },
};

export default function Skills() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    // --- FIX 2: Added `overflow-hidden` to prevent horizontal scroll ---
    <section
      id="skills"
      className="relative bg-[#0A0A0A] py-32 sm:py-40 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-40"
      ></canvas>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          className="w-full bg-black/50 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl shadow-lime-500/10"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
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
            <p className="flex-1 text-center font-mono text-sm text-neutral-400">
              haiderali@portfolio: ~/skills.json
            </p>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={listVariants}
            >
              {skillsData.map((category) => (
                <motion.div
                  key={category.category}
                  variants={itemVariants}
                  className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800"
                >
                  <h3 className="flex items-center gap-3 text-xl font-bold font-mono text-lime-400 mb-4">
                    {category.icon}
                    {category.category}
                  </h3>
                  <motion.ul className="space-y-2" variants={listVariants}>
                    {category.skills.map((skill) => (
                      <motion.li
                        key={skill}
                        variants={itemVariants}
                        className="text-neutral-300"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
