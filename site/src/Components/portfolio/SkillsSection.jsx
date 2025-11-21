import React, { useState } from "react";
import { Cpu, Trash2, Plus, Code, Terminal, Layers, Monitor } from "lucide-react";
import { Input } from "@/Components/ui/input";

export default function SkillsSection({ userData, setUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkills, setEditedSkills] = useState({ ...userData.skills });
  const [newSkill, setNewSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState("languages");

  const categories = {
    languages: { icon: Code, label: "LANGUAGES", color: "#00ff41" },
    tools: { icon: Terminal, label: "TOOLS", color: "#00d936" },
    frameworks: { icon: Layers, label: "FRAMEWORKS", color: "#00b32d" },
    platforms: { icon: Monitor, label: "PLATFORMS", color: "#008f24" }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setEditedSkills({
        ...editedSkills,
        [activeCategory]: [...editedSkills[activeCategory], newSkill.trim().toUpperCase()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (category, index) => {
    setEditedSkills({
      ...editedSkills,
      [category]: editedSkills[category].filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    setUserData({ ...userData, skills: editedSkills });
    setIsEditing(false);
  };

  return (
    <section id="skills-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Cpu className="w-6 h-6 text-[#00ff41]" />
            <h2 className="text-3xl md:text-4xl text-[#00ff41] font-bold tracking-wider terminal-glow">
              [ CAPABILITIES ]
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(categories).map(([key, { icon: Icon, label, color }]) => (
            <div key={key} className="neumorphic-card p-6 md:p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-24 h-24" style={{ color }} />
              </div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Icon className="w-5 h-5" style={{ color }} />
                <h3 className="text-xl font-bold tracking-wider" style={{ color }}>
                  {label}
                </h3>
              </div>

              {!isEditing ? (
                <div className="flex flex-wrap gap-3 relative z-10">
                  {userData.skills[key]?.map((skill, index) => (
                    <div
                      key={index}
                      className="neumorphic-skill-card px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-300"
                    >
                      <span className="text-sm tracking-wider" style={{ color }}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 relative z-10">
                  <div className="flex flex-wrap gap-3">
                    {editedSkills[key]?.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 bg-[#151b17] px-3 py-1 rounded-lg border border-[#00ff41]/20">
                        <span className="text-sm text-[#00ff41]">{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(key, index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {activeCategory === key && (
                    <div className="flex gap-2 mt-4">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder={`ADD ${label}...`}
                        className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41] h-9 text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      />
                      <button
                        onClick={handleAddSkill}
                        className="neumorphic-button p-2 rounded-lg text-[#00ff41] hover:text-[#0f0]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {activeCategory !== key && (
                    <button
                      onClick={() => setActiveCategory(key)}
                      className="text-xs text-[#00ff41]/50 hover:text-[#00ff41] flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> ADD SKILL
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>


        {/* Decorative Grid Pattern */}
        <div className="mt-12 grid grid-cols-10 gap-2 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-1 bg-[#00ff41] opacity-10 rounded-full"
              style={{
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .neumorphic-card {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.5),
            -8px -8px 16px rgba(35, 48, 40, 0.3);
          border: 1px solid rgba(0, 255, 65, 0.05);
        }

        .neumorphic-skill-card {
          background: #1a221d;
          box-shadow: 
            inset 4px 4px 8px rgba(0, 0, 0, 0.6),
            inset -4px -4px 8px rgba(35, 48, 40, 0.3);
          border: 1px solid rgba(0, 255, 65, 0.02);
          transition: all 0.3s ease;
        }

        .neumorphic-skill-card:hover {
          box-shadow: 
            inset 6px 6px 12px rgba(0, 0, 0, 0.8),
            inset -6px -6px 12px rgba(35, 48, 40, 0.4);
          transform: translateY(1px);
        }

        .neumorphic-button {
          background: #1a221d;
          box-shadow: 
            6px 6px 12px rgba(8, 12, 10, 0.6),
            -6px -6px 12px rgba(35, 48, 40, 0.4);
        }

        .neumorphic-button:active {
          box-shadow: 
            inset 6px 6px 12px rgba(8, 12, 10, 0.6),
            inset -6px -6px 12px rgba(35, 48, 40, 0.4);
        }

        .neumorphic-input {
          box-shadow: 
            inset 4px 4px 8px rgba(8, 12, 10, 0.6),
            inset -4px -4px 8px rgba(35, 48, 40, 0.4);
        }

        .terminal-glow {
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        }
      `}</style>
    </section>
  );
}