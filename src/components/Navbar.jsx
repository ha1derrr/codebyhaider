// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

const navCommands = [
  { name: "cd ~/", command: "Go to Home", href: "#home", icon: <FaHome /> },
  {
    name: "cat about.js",
    command: "View About",
    href: "#about",
    icon: <FaUser />,
  },
  {
    name: "ps aux | grep services",
    command: "List Services",
    href: "#services",
    icon: <FaCog />,
  },
  {
    name: "git log --experience",
    command: "See Experience",
    href: "#experience",
    icon: <FaBriefcase />,
  },
  {
    name: "ls -R projects",
    command: "Browse Projects",
    href: "#projects",
    icon: <FaProjectDiagram />,
  },
  {
    name: "ssh contact",
    command: "Initiate Contact",
    href: "#contact",
    icon: <FaEnvelope />,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 font-mono transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-neutral-800"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-20">
          <a
            href="#home"
            className="text-xl font-bold text-white flex items-center gap-2"
          >
            <span className="text-lime-400">&gt;</span>
            <span>haider.dev</span>
            <span className="w-2 h-4 bg-white animate-blink"></span>
          </a>

          <button
            aria-label="Open Command Palette"
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Command Palette <span className="text-xs ml-2">[⌘K]</span>
          </button>

          <button
            aria-label="Open Menu"
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // --- THE FIX IS HERE: Changed `items-start` to `items-center` ---
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-xl bg-[#1E1F1A] rounded-xl border border-[#3E3D32] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-[#3E3D32]">
                <input
                  type="text"
                  placeholder="Type a command or select a file..."
                  className="w-full bg-transparent text-white placeholder:text-neutral-500 outline-none"
                />
              </div>
              <ul className="p-2 max-h-[70vh] overflow-y-auto">
                {navCommands.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-lime-400/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="text-xl text-lime-400">{link.icon}</span>
                      <div>
                        <p className="font-bold">{link.command}</p>
                        <p className="text-sm text-neutral-500">{link.name}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
