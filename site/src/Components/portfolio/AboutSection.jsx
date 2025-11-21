import React, { useState } from "react";
import { Code2, Lock, Zap } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";

export default function AboutSection({ userData, setUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAbout, setEditedAbout] = useState(userData.about);

  const handleSave = () => {
    setUserData({ ...userData, about: editedAbout });
    setIsEditing(false);
  };

  return (
    <section id="about-section" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Lock className="w-6 h-6 text-[#00ff41]" />
            <h2 className="text-3xl md:text-4xl text-[#00ff41] font-bold tracking-wider terminal-glow">
              [ CLASSIFIED INTEL ]
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
        </div>

        {/* Content Card */}
        <div className="neumorphic-card p-8 md:p-12 rounded-3xl">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Icon Section */}
            <div className="md:col-span-3 flex justify-center">
              <div className="neumorphic-icon-wrapper w-32 h-32 rounded-full flex items-center justify-center">
                <Code2 className="w-16 h-16 text-[#00ff41] animate-pulse" />
              </div>
            </div>

            {/* About Content */}
            <div className="md:col-span-9">
              {!isEditing ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-5 h-5 text-[#0f0]" />
                    <span className="text-[#0f0] text-sm tracking-wider">ABOUT.EXE</span>
                  </div>

                  <p className="text-[#00d936] text-lg leading-relaxed mb-6 terminal-text">
                    {userData.about}
                  </p>


                </>
              ) : (
                <div className="space-y-4">
                  <label className="text-[#00ff41] text-sm block">EDIT ABOUT</label>
                  <Textarea
                    value={editedAbout}
                    onChange={(e) => setEditedAbout(e.target.value)}
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] min-h-[150px]"
                  />
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
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: "LINES OF CODE", value: "1337+" },
              { label: "BUGS SQUASHED", value: "256" },
              { label: "HOURS", value: "26280" },
              { label: "LEVEL", value: "INTERMEDIATE" }
            ].map((stat, index) => (
              <div key={index} className="neumorphic-stat p-4 rounded-2xl text-center">
                <div className="text-2xl md:text-3xl text-[#00ff41] font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-[#00d936] text-xs tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
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

        .neumorphic-icon-wrapper {
          background: #1a221d;
          box-shadow: 
            inset 10px 10px 20px rgba(8, 12, 10, 0.6),
            inset -10px -10px 20px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-stat {
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
        }

        .neumorphic-button:active {
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
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        }

        .terminal-text {
          text-shadow: 0 0 5px rgba(0, 217, 54, 0.3);
        }
      `}</style>
    </section>
  );
}