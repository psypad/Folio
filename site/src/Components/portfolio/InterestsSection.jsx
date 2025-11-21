import React, { useState } from "react";
import { Cpu, Trash2, Plus } from "lucide-react";
import { Input } from "@/Components/ui/input";

export default function InterestsSection({ userData, setUserData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSkills, setEditedSkills] = useState([...userData.interests]);
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setEditedSkills([...editedSkills, newSkill.trim().toUpperCase()]);
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (index) => {
        setEditedSkills(editedSkills.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        setUserData({ ...userData, interests: editedSkills });
        setIsEditing(false);
    };

    return (
        <section id="interests-section" className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <Cpu className="w-6 h-6 text-[#00ff41]" />
                        <h2 className="text-3xl md:text-4xl text-[#00ff41] font-bold tracking-wider terminal-glow">
                            [ INTERESTS ]
                        </h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
                </div>

                {/* Skills Grid */}
                <div className="neumorphic-card p-8 md:p-12 rounded-3xl">
                    {!isEditing ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {userData.interests.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="neumorphic-skill-card p-4 rounded-2xl group hover:scale-105 transition-transform duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                                            <span className="text-[#00d936] text-sm md:text-base tracking-wider skill-text">
                                                {skill}
                                            </span>
                                        </div>
                                        <div className="h-1 bg-gradient-to-r from-[#00ff41] to-transparent mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                ))}
                            </div>


                        </>
                    ) : (
                        <div className="space-y-6">
                            {/* Existing Skills */}
                            <div className="space-y-3">
                                {editedSkills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Input
                                            value={skill}
                                            onChange={(e) => {
                                                const newSkills = [...editedSkills];
                                                newSkills[index] = e.target.value.toUpperCase();
                                                setEditedSkills(newSkills);
                                            }}
                                            className="neumorphic-input bg-[#1a221d] border-none text-[#00d936]"
                                        />
                                        <button
                                            onClick={() => handleRemoveSkill(index)}
                                            className="neumorphic-button p-3 rounded-xl text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add New Skill */}
                            <div className="flex items-center gap-3">
                                <Input
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="NEW SKILL"
                                    className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41] placeholder:text-[#00ff41]/30"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                />
                                <button
                                    onClick={handleAddSkill}
                                    className="neumorphic-button p-3 rounded-xl text-[#00ff41] hover:text-[#0f0]"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleSave}
                                    className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-[#0f0]"
                                >
                                    [ SAVE ]
                                </button>
                                <button
                                    onClick={() => {
                                        setEditedSkills([...userData.interests]);
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

                {/* Decorative Grid Pattern */}
                <div className="mt-12 grid grid-cols-10 gap-2">
                    {Array.from({ length: 30 }).map((_, i) => (
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
            12px 12px 24px rgba(8, 12, 10, 0.9),
            -12px -12px 24px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-skill-card {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.8),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
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

        .skill-text {
          text-shadow: 0 0 5px rgba(0, 217, 54, 0.3);
        }
      `}</style>
        </section>
    );
} 