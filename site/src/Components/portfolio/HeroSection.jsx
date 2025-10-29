import React, { useState, useEffect } from "react";
import { Terminal, Shield, Skull, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HeroSection({ userData, setUserData }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);
  const [editedTitle, setEditedTitle] = useState(userData.title);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fullText = userData.name;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [userData.name]);

  const handleSave = () => {
    setUserData({
      ...userData,
      name: editedName,
      title: editedTitle
    });
    setIsEditing(false);
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-5xl">
        {/* Terminal Header */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#00ff41]" />
          <Terminal className="w-8 h-8 text-[#00ff41] animate-pulse" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#00ff41]" />
        </div>

        {/* Main Content Card */}
        <div className="neumorphic-card p-8 md:p-16 rounded-3xl">
          {!isEditing ? (
            <>
              {/* Animated Name */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skull className="w-6 h-6 text-[#00ff41]" />
                  <span className="text-[#00ff41] text-sm">SYSTEM.USER</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-[#00ff41] tracking-wider glitch-text mb-2">
                  {displayedText}
                  <span className={`inline-block w-4 h-12 md:h-16 bg-[#00ff41] ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                </h1>
              </div>

              {/* Title */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-[#0f0]" />
                  <span className="text-[#0f0] text-xs">ROLE.PRIMARY</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-[#0f0] tracking-wide terminal-glow">
                  {userData.title}
                </h2>
              </div>

              {/* Social Links as Buttons */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#00d936] text-xs">NETWORK.CONNECT</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(userData.socials).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neumorphic-social-btn px-6 py-3 rounded-2xl flex items-center gap-3 group hover:scale-105 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 text-[#00ff41] group-hover:text-[#0f0] transition-colors" />
                        <span className="text-[#00d936] text-sm tracking-wider uppercase group-hover:text-[#0f0] transition-colors">
                          {platform}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Access Granted Badge */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="neumorphic-badge px-6 py-3 rounded-2xl">
                  <span className="text-[#00ff41] text-sm font-bold">
                    [ ACCESS GRANTED ]
                  </span>
                </div>
                <div className="neumorphic-badge px-6 py-3 rounded-2xl">
                  <span className="text-[#0f0] text-sm">
                    STATUS: <span className="text-[#00ff41]">ONLINE</span>
                  </span>
                </div>
              </div>

              {/* Edit Button */}

            </>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="text-[#00ff41] text-sm mb-2 block">NAME</label>
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41] text-2xl"
                />
              </div>
              <div>
                <label className="text-[#00ff41] text-sm mb-2 block">TITLE</label>
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="neumorphic-input bg-[#1a221d] border-none text-[#0f0] text-xl"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-[#0f0]"
                >
                  [ SAVE ]
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-red-500"
                >
                  [ CANCEL ]
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-[#0f0] rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-[#00d936] rounded-full animate-pulse delay-300" />
        </div>
      </div>

      <style jsx>{`
        .neumorphic-card {
          background: #1a221d;
          box-shadow: 
            12px 12px 24px rgba(8, 12, 10, 0.9),
            -12px -12px 24px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-badge {
          background: #1a221d;
          box-shadow: 
            inset 6px 6px 12px rgba(8, 12, 10, 0.7),
            inset -6px -6px 12px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-button {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.9),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
          transition: all 0.3s ease;
        }

        .neumorphic-button:active {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.9),
            inset -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-social-btn {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.9),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-social-btn:active {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.9),
            inset -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-input {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.8),
            inset -8px -8px 16px rgba(35, 48, 40, 0.5);
        }

        .terminal-glow {
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.5),
                       0 0 20px rgba(0, 255, 65, 0.3);
        }

        .glitch-text {
          text-shadow: 
            0 0 20px rgba(0, 255, 65, 0.8),
            0 0 40px rgba(0, 255, 65, 0.4);
          animation: glitch 3s infinite;
        }

        @keyframes glitch {
          0%, 90%, 100% {
            text-shadow: 
              0 0 20px rgba(0, 255, 65, 0.8),
              0 0 40px rgba(0, 255, 65, 0.4);
          }
          95% {
            text-shadow: 
              -2px 0 rgba(255, 0, 0, 0.7),
              2px 0 rgba(0, 255, 0, 0.7),
              0 0 20px rgba(0, 255, 65, 0.8);
          }
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
}