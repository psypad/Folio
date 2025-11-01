import React, { useState } from "react";
import { Globe, Github, Linkedin, Twitter, Mail, ExternalLink, Youtube } from "lucide-react";
import { Input } from "@/Components/ui/input";

export default function SocialsSection({ userData, setUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSocials, setEditedSocials] = useState({ ...userData.socials });

  const handleSave = () => {
    setUserData({ ...userData, socials: editedSocials });
    setIsEditing(false);
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    youtube: Youtube
  };

  const socialLabels = {
    github: "GITHUB",
    linkedin: "LINKEDIN",
    email: "EMAIL",
    youtube: "YOUTUBE"
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Globe className="w-6 h-6 text-[#00ff41]" />
            <h2 className="text-3xl md:text-4xl text-[#00ff41] font-bold tracking-wider terminal-glow">
              [ NETWORK LINKS ]
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
        </div>

        {/* Socials Card */}
        <div className="neumorphic-card p-8 md:p-12 rounded-3xl">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Object.entries(userData.socials).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neumorphic-social-button p-6 rounded-2xl group hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="neumorphic-icon-circle w-12 h-12 rounded-full flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                            <Icon className="w-6 h-6 text-[#00ff41] group-hover:text-[#0f0]" />
                          </div>
                          <div>
                            <div className="text-[#00ff41] text-sm tracking-wider mb-1">
                              {socialLabels[platform]}
                            </div>
                            <div className="text-[#00d936] text-xs truncate max-w-[200px]">
                              {platform === 'email' ? url.replace('mailto:', '') : url.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="h-1 bg-gradient-to-r from-[#00ff41] to-transparent mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  );
                })}
              </div>


            </>
          ) : (
            <div className="space-y-6">
              {Object.entries(editedSocials).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                return (
                  <div key={platform} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-[#00ff41]" />
                      <label className="text-[#00ff41] text-sm tracking-wider">
                        {socialLabels[platform]}
                      </label>
                    </div>
                    <Input
                      value={url}
                      onChange={(e) => setEditedSocials({ ...editedSocials, [platform]: e.target.value })}
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00d936]"
                      placeholder={platform === 'email' ? 'your@email.com' : `https://${platform}.com/username`}
                    />
                  </div>
                );
              })}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-[#0f0]"
                >
                  [ SAVE ]
                </button>
                <button
                  onClick={() => {
                    setEditedSocials({ ...userData.socials });
                    setIsEditing(false);
                  }}
                  className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-red-500"
                >
                  [ CANCEL ]
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Connection Status Indicator */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="neumorphic-badge px-6 py-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse shadow-glow" />
              <span className="text-[#00ff41] text-sm tracking-wider">
                ESTABLISH CONNECTION
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neumorphic-card {
          background: #1a221d;
          box-shadow: 
            12px 12px 24px rgba(8, 12, 10, 0.9),
            -12px -12px 24px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-social-button {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.8),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
          cursor: pointer;
        }

        .neumorphic-social-button:active {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.8),
            inset -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-icon-circle {
          background: #1a221d;
          box-shadow: 
            inset 6px 6px 12px rgba(8, 12, 10, 0.6),
            inset -6px -6px 12px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-button {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.9),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-button:active {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.9),
            inset -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-badge {
          background: #1a221d;
          box-shadow: 
            inset 6px 6px 12px rgba(8, 12, 10, 0.7),
            inset -6px -6px 12px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-input {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.8),
            inset -8px -8px 16px rgba(35, 48, 40, 0.5);
        }

        .terminal-glow {
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        }

        .shadow-glow {
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.6);
        }
      `}</style>
    </section>
  );
}