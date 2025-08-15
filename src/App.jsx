// src/App.jsx
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";
// import ContactForm from "./components/ContactForm";

// Lazy load heavy / below-the-fold sections
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

// Section wrapper for consistent spacing across mobile & desktop
function SectionWrapper({ children }) {
  return <section className="px-6 py-16 sm:py-20">{children}</section>;
}

function App() {
  return (
    // Improvements:
    // 1. font-sans for better mobile readability (keep monospace only in special spots)
    // 2. scroll-smooth for anchor link smooth scrolling
    // 3. min-h-screen to avoid weird short-screen gaps
    // 4. overflow-x-hidden to avoid horizontal scrollbars
    <div className="bg-[#0A0A0A] text-neutral-300 font-sans min-h-screen overflow-x-hidden scroll-smooth">
      <Navbar />
      <main>
        <SectionWrapper>
          <Hero />
        </SectionWrapper>

        <SectionWrapper>
          <About />
        </SectionWrapper>

        <SectionWrapper>
          <Services />
        </SectionWrapper>

        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <SectionWrapper>
            <Experience />
          </SectionWrapper>

          <SectionWrapper>
            <Projects />
          </SectionWrapper>

          {
            <SectionWrapper>
              <Contact />
            </SectionWrapper>
          }
          {/* <SectionWrapper>
            <ContactForm />
          </SectionWrapper> */}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
