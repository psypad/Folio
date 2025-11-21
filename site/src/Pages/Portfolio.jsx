import React, { useState, useEffect } from "react";
import MatrixRain from "../Components/portfolio/MatrixRain";
import HeroSection from "../Components/portfolio/HeroSection";
import AboutSection from "../Components/portfolio/AboutSection";
import SkillsSection from "../Components/portfolio/SkillsSection";
import ProjectsSection from "../Components/portfolio/ProjectsSection";
import PapersSection from "../Components/portfolio/PapersSection";
import SocialsSection from "../Components/portfolio/SocialsSection";
import TerminalFooter from "../Components/portfolio/TerminalFooter";
import LowerAbout from "../Components/portfolio/LowerAbout";
import InteractiveTerminal from "../Components/portfolio/InteractiveTerminal";


export default function Portfolio() {
  const [userData, setUserData] = useState({
    name: "Sylan Padmakumar",
    title: "Ingeniarius Machinarum",
    about: "As an innovative final-year computer science student with a minor in cyber security, I am eager to bring my skills and passion for cutting edge technology to the job. My academic foundation combined with a keen interest in low-level systems programming, cyber security, and embedded systems positions me to contribute meaningfully to innovative projects. I am ready to take advantage of my knowledge in cyber security to develop secure, efficient and scalable solutions. Looking for an opportunity to collaborate with industry-leading professionals with whom I can further hone my technical expertise and contribute to pioneering advances in technology.",
    skills: [
      "RUST",
      "C++",
      "C",
      "X86_64 ASM",
      "PYTHON",
      "MALWARE ANALYSIS",
      "Iot",
    ],
    projects: [
      {
        title: "SHELL",
        description: "A Post-modern adaptation of the POSIX shell, adapting few features but modernizing the shell by making it into a bare-bones scripting language.",
        technologies: ["RUST"],
        githubUrl: "https://github.com/psypad/rust-shell"
      },
      {
        title: "MALFORMER",
        description: "Enhancing malware classification and detection using Machine Learning methods. Exploring ways the Transformer architecture can aid in Malware analysis",
        technologies: ["PYTHON", "CUDA"],
        githubUrl: "https://github.com/psypad/Malformer"
      },
    ],
    papers: [
      {
        title: "Comparative Analysis of YOLOv8 and YOLOv11 for Malware Image Classification",
        description: "This document presents a comparative analysis of YOLOv8 and YOLOv11 architectures for malware image classification.",
        pdfUrl: "https://drive.google.com/file/d/1q4xRRVggepFEKL78HgWhyx9t63PriSMq/preview",
        thumbnailUrl: ""
      }
    ],
    socials: {
      github: "https://github.com/psypad",
      linkedin: "https://linkedin.com/in/psypad",
      email: "mailto:sylan.padmakumar@gmail.com"
    }
  });

  return (
    <div className="relative min-h-screen bg-[#1a221d] overflow-x-hidden">
      <MatrixRain />

      <div className="relative z-10">
        <HeroSection userData={userData} setUserData={setUserData} />
        <AboutSection userData={userData} setUserData={setUserData} />
        <SkillsSection userData={userData} setUserData={setUserData} />
        <ProjectsSection userData={userData} setUserData={setUserData} />
        <PapersSection userData={userData} setUserData={setUserData} />
        <SocialsSection userData={userData} setUserData={setUserData} />
        <TerminalFooter />
      </div>


      <InteractiveTerminal userData={userData} />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        
        * {
          font-family: 'Share Tech Mono', 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
}
