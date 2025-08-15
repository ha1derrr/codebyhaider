// src/components/Contact.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";

// This is the final, optimized animation hook for consistency and performance.
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
        ? Math.floor((width * height) / 25000)
        : Math.floor((width * height) / 15000);

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

// Helper for the typewriter effect
const Typewriter = ({ text, delay = 0, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        let i = 0;
        const intervalId = setInterval(() => {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(intervalId);
            if (onComplete) onComplete();
          }
        }, 30);
        return () => clearInterval(intervalId);
      }, delay);
    }
  }, [isInView, text, delay, onComplete]);

  return <span ref={ref}>{displayedText}</span>;
};

export default function Contact() {
  const canvasRef = useRef(null);
  useBinaryAnimation(canvasRef);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    submitting: false,
    success: false,
    error: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ submitting: true, success: false, error: false });

    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormState({ submitting: false, success: true, error: false });
        form.reset();
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState({ submitting: false, success: false, error: true });
    }
  };

  return (
    <section
      id="contact"
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
              ssh: haider@codebyhaider.com
            </p>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12">
            <div className="text-lg">
              <p className="text-neutral-400">
                <span className="text-lime-400">&gt;</span>{" "}
                <Typewriter text="Attempting to establish connection..." />
              </p>
              <p className="text-neutral-400">
                <span className="text-lime-400">&gt;</span>{" "}
                <Typewriter
                  text="Authenticating with public key..."
                  delay={2000}
                />
              </p>
              <p className="text-green-400">
                <span className="text-lime-400">&gt;</span>{" "}
                <Typewriter
                  text="Connection established. Ready for input."
                  delay={4000}
                  onComplete={() => setIsFormVisible(true)}
                />
              </p>
            </div>

            <AnimatePresence>
              {isFormVisible && (
                <motion.form
                  // --- YOUR FORMSPREE URL IS NOW HERE ---
                  action="https://formspree.io/f/mqaljjzb"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <label htmlFor="email" className="text-neutral-400 w-24">
                        From:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="flex-1 bg-transparent border-b-2 border-neutral-700 focus:border-lime-400 outline-none text-white transition-colors"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <label
                        htmlFor="subject"
                        className="text-neutral-400 w-24"
                      >
                        Subject:
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="flex-1 bg-transparent border-b-2 border-neutral-700 focus:border-lime-400 outline-none text-white transition-colors"
                      />
                    </div>
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="> Your message body..."
                    className="w-full bg-neutral-900/50 p-4 rounded-md border border-neutral-700 focus:border-lime-400 focus:ring-0 outline-none text-white transition-colors"
                  ></textarea>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={formState.submitting}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 font-bold text-black bg-lime-400 rounded-lg hover:bg-lime-300 transition-all duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed"
                    >
                      {formState.submitting ? (
                        "Sending..."
                      ) : (
                        <>
                          sendmail --now <FaPaperPlane />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Success and Error Messages */}
                  <AnimatePresence>
                    {formState.success && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-green-400 flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle /> Message sent successfully!
                      </motion.p>
                    )}
                    {formState.error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-red-500"
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
