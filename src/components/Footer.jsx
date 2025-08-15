// src/components/Footer.jsx
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCodeBranch } from "react-icons/fa";

const Footer = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // --- FIX: Added `overflow-hidden` to prevent any possibility of horizontal scroll ---
    <footer className="relative bg-[#1E1F1A] text-neutral-400 py-4 border-t-2 border-[#3E3D32] font-mono overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        {/* Left Side - Status & Copyright */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
            <span className="text-lime-400">System Status: OK</span>
          </div>
          <p className="text-neutral-600 hidden md:block">
            {/* Changed to dynamic year */}
            &copy; {new Date().getFullYear()} Haider Ali
          </p>
        </div>

        {/* Middle - Social Links */}
        <div className="flex gap-6 text-xl">
          <a
            href="https://github.com/ha1derrr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/ali-haider2002"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:work.haiderali2002@gmail.com"
            className="hover:text-lime-400 transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Right Side - Git Branch & Clock */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaCodeBranch />
            <span>main</span>
          </div>
          <div className="hidden md:block">
            <span>{time} IST</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
