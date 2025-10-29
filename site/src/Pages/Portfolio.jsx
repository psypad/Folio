import React, { useState, useEffect } from "react";
import MatrixRain from "../components/portfolio/MatrixRain";
import HeroSection from "../components/portfolio/HeroSection";
import AboutSection from "../components/portfolio/AboutSection";
import SkillsSection from "../components/portfolio/SkillsSection";
import ProjectsSection from "../components/portfolio/ProjectsSection";
import SocialsSection from "../components/portfolio/SocialsSection";
import TerminalFooter from "../components/portfolio/TerminalFooter";

export default function Portfolio() {
  const [userData, setUserData] = useState({
    name: "Sylan Padmakumar",
    title: "Ingeniarius Machinarum",
    about: "Elite security researcher specializing in vulnerability assessment, penetration testing, and defensive security strategies. Breaking systems to build them stronger.",
    skills: [
      "PENETRATION TESTING",
      "NETWORK SECURITY",
      "EXPLOIT DEVELOPMENT",
      "REVERSE ENGINEERING",
      "CRYPTOGRAPHY",
      "MALWARE ANALYSIS",
      "SOCIAL ENGINEERING",
      "INCIDENT RESPONSE"
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
        githubUrl: "https://github.com/username/cryptex-vault"
      },
      {
        title: "PHANTOM PROXY",
        description: "Multi-layered proxy network for anonymous browsing. Routes traffic through randomized nodes with military encryption.",
        technologies: ["GO", "TOR", "VPN", "DOCKER"],
        githubUrl: "https://github.com/username/phantom-proxy"
      },
      {
        title: "EXPLOIT FRAMEWORK",
        description: "Modular penetration testing framework with automated vulnerability detection and exploitation capabilities.",
        technologies: ["C++", "METASPLOIT", "ASSEMBLY", "SHELLCODE"],
        githubUrl: "https://github.com/username/exploit-framework"
      }
    ],
    socials: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
      email: "contact@example.com"
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
        <SocialsSection userData={userData} setUserData={setUserData} />
        <TerminalFooter />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        
        * {
          font-family: 'Share Tech Mono', 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
}