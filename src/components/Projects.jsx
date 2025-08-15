// src/components/Projects.jsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Mobile-optimized binary particle animation hook
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
    let particleCount =
      window.innerWidth < 768
        ? Math.floor((width * height) / 25000) // lighter load on mobile
        : Math.floor((width * height) / 12000);

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
              (window.innerWidth * canvas.parentElement.offsetHeight) / 25000
            )
          : Math.floor(
              (window.innerWidth * canvas.parentElement.offsetHeight) / 12000
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
    const targetFPS = 30; // FPS cap for mobile
    function animate(timestamp) {
      const deltaTime = timestamp - lastTime;
      if (deltaTime > 1000 / targetFPS) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
        lastTime = timestamp;
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

const projects = [
  {
    hash: "b2a1c8f",
    title: "feat(backend): Implement Video Streaming Backend",
    date: "Early 2024",
    desc: "Built a scalable backend with user auth, video uploads, and role-based access. Used MongoDB aggregation for watch history and designed clean, modular REST APIs.",
    github: "https://github.com/ha1derrr/video-streaming-app",
    live: "",
  },
  {
    hash: "c7d9e2a",
    title: "build(ui): Launch CineFlow Movie Discovery App",
    date: "Late 2023",
    desc: "A responsive movie app with an Appwrite backend, managing 1,000+ records. Designed a mobile-first UI with Tailwind CSS and custom search logic.",
    github: "https://github.com/ha1derrr/CineFlow",
    live: "",
  },
  {
    hash: "e6f0b3d",
    title: "refactor(fullstack): Create Full-Stack Blog 'Bloggy'",
    date: "Mid 2023",
    desc: "Created a full-stack blog where users can write, edit, and delete posts, following the MVC design pattern with EJS for dynamic server-side rendered pages.",
    github: "https://github.com/ha1derrr/Bloggy",
    live: "",
  },
];

export default function Projects() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);

  return (
    <section
      id="projects"
      className="relative bg-[#0A0A0A] py-28 sm:py-36 font-mono overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      ></canvas>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-white mb-3 break-words"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Project Commits
        </motion.h2>
        <p className="text-center text-lime-400/70 mb-14 text-sm sm:text-base">
          A log of my recent feature developments and builds.
        </p>

        <div className="space-y-10">
          {projects.map((project) => (
            <motion.div
              key={project.hash}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              {/* Timeline marker */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-lime-400 ring-4 ring-lime-400/20"></div>
                <div className="hidden sm:block flex-1 w-0.5 bg-neutral-700"></div>
              </div>

              {/* Commit info + card */}
              <div className="flex-1 min-w-0">
                <p className="text-lime-400 text-sm sm:text-base mb-2 break-words">
                  commit <span className="text-yellow-400">{project.hash}</span>{" "}
                  (HEAD → main)
                </p>
                <p className="text-neutral-400 text-xs sm:text-sm mb-4 break-words">
                  Author: Haider Ali &lt;work.haiderali2002@gmail.com&gt;
                  <br />
                  Date: {project.date}
                </p>

                <ProjectCard
                  title={project.title}
                  desc={project.desc}
                  github={project.github}
                  live={project.live}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
