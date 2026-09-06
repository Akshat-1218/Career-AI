import { useEffect, useState } from "react";
import LandingNetworkBackdrop from "../components/LandingNetworkBackdrop";
import FloatingLandingDock from "../components/FloatingLandingDock";
import LandingHero from "../components/LandingHero";
import LandingCapabilities from "../components/LandingCapabilities";
import LandingWorkflow from "../components/LandingWorkflow";
import ProductShowcase from "../components/ProductShowcase";
import LandingTrust from "../components/LandingTrust";
import LandingFooter from "../components/LandingFooter";
import "../style/landing.scss";
import "../style/landingSections.scss";

const dockSections = ["home", "capabilities", "workflow"];
const progressSections = ["home", "capabilities", "workflow", "showcase", "trust"];
export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeProgressSection, setActiveProgressSection] = useState("home");
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.body.classList.add("is-landing");
    document.title = "CareerPilot AI | Interview Strategy, ATS Intelligence & Learning Roadmaps";
    description?.setAttribute("content", "CareerPilot AI turns a job description and your real experience into interview strategy, ATS Intelligence, learning roadmaps, job-market comparison, and resume ATS guidance.");
    return () => { document.body.classList.remove("is-landing"); document.title = previousTitle; if (description && previousDescription) description.setAttribute("content", previousDescription); };
  }, []);
  useEffect(() => {
    let frameId = null;
    const updateActiveSection = () => {
      frameId = null;
      const activationLine = window.innerHeight * 0.42;
      const getCurrentSection = (sections) => sections.reduce((active, id) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= activationLine ? id : active;
      }, "home");
      const nextSection = getCurrentSection(dockSections);
      const nextProgressSection = getCurrentSection(progressSections);
      setActiveSection((current) => current === nextSection ? current : nextSection);
      setActiveProgressSection((current) => current === nextProgressSection ? current : nextProgressSection);
    };
    const scheduleUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateActiveSection);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);
  const scrollTo = (id) => {
    if (dockSections.includes(id)) setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return <main className="landing-page"><LandingNetworkBackdrop /><LandingHero activeSection={activeProgressSection} onExplore={() => scrollTo("capabilities")} /><LandingCapabilities /><LandingWorkflow /><ProductShowcase /><LandingTrust /><LandingFooter onSectionChange={scrollTo} /><FloatingLandingDock activeSection={activeSection} onSectionChange={scrollTo} /></main>;
}
