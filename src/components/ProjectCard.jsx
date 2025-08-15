// src/components/ProjectCard.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLink } from "react-icons/fa";

export default function ProjectCard({ title, desc, github, live }) {
  return (
    <motion.div
      className="backdrop-blur-md bg-neutral-900/40 p-6 rounded-xl border border-neutral-800 shadow-lg 
                 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Animates only when visible
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg md:text-2xl font-bold text-white mb-3 break-words">
        {title}
      </h3>

      <p className="text-neutral-300 mb-6 text-sm md:text-base leading-relaxed break-words">
        {desc}
      </p>

      <div className="flex flex-wrap gap-3">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-base
                       text-black bg-gradient-to-r from-lime-400 to-green-300 
                       rounded-md hover:from-lime-300 hover:to-green-200 
                       transition-colors duration-300 min-w-[120px] justify-center"
          >
            <FaLink /> Live Demo
          </a>
        )}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm md:text-base
                     text-white border border-neutral-700 rounded-md 
                     hover:bg-neutral-800 transition-colors duration-300 
                     min-w-[120px] justify-center"
        >
          <FaGithub /> Code
        </a>
      </div>
    </motion.div>
  );
}
