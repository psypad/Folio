import React, { useState } from "react";
import { Folder, Github, Plus, Trash2, Edit2 } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Badge } from "@/Components/ui/badge";

export default function ProjectsSection({ userData, setUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProjects, setEditedProjects] = useState([...userData.projects]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    githubUrl: ""
  });
  const [techInput, setTechInput] = useState("");

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setEditedProjects([...editedProjects, newProject]);
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        githubUrl: ""
      });
      setTechInput("");
    }
  };

  const handleRemoveProject = (index) => {
    setEditedProjects(editedProjects.filter((_, i) => i !== index));
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...editedProjects];
    updated[index] = { ...updated[index], [field]: value };
    setEditedProjects(updated);
  };

  const handleAddTech = (projectIndex = null) => {
    if (projectIndex !== null) {
      const tech = prompt("Add technology/language:");
      if (tech && tech.trim()) {
        handleUpdateProject(projectIndex, 'technologies', [
          ...editedProjects[projectIndex].technologies,
          tech.trim().toUpperCase()
        ]);
      }
    } else {
      if (techInput.trim()) {
        setNewProject({
          ...newProject,
          technologies: [...newProject.technologies, techInput.trim().toUpperCase()]
        });
        setTechInput("");
      }
    }
  };

  const handleRemoveTech = (projectIndex, techIndex) => {
    const updated = [...editedProjects];
    updated[projectIndex].technologies = updated[projectIndex].technologies.filter((_, i) => i !== techIndex);
    setEditedProjects(updated);
  };

  const handleSave = () => {
    setUserData({ ...userData, projects: editedProjects });
    setIsEditing(false);
    setEditingIndex(null);
  };

  return (
    <section id="projects-section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Folder className="w-6 h-6 text-[#00ff41]" />
            <h2 className="text-3xl md:text-4xl text-[#00ff41] font-bold tracking-wider terminal-glow">
              [ OPERATIONS ARCHIVE ]
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userData.projects.map((project, index) => (
                  <div key={index} className="neumorphic-project-card p-6 md:p-8 rounded-3xl group hover:scale-[1.02] transition-all duration-300">
                    {/* Project Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse" />
                        <h3 className="text-xl md:text-2xl text-[#00ff41] font-bold tracking-wider">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#00d936] text-sm md:text-base leading-relaxed mb-6 terminal-text">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="text-[#0f0] text-xs mb-3 tracking-wider">STACK.USED</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className="neumorphic-tech-badge px-4 py-2 rounded-xl">
                            <span className="text-[#00d936] text-xs tracking-wider">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Link */}
                    <div className="pt-4 border-t border-[#00ff41]/20">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neumorphic-link-button px-5 py-3 rounded-2xl flex items-center justify-center gap-3 group/link hover:scale-105 transition-all duration-300"
                      >
                        <Github className="w-5 h-5 text-[#00ff41] group-hover/link:text-[#0f0] transition-colors" />
                        <span className="text-[#00ff41] text-sm tracking-wider group-hover/link:text-[#0f0] transition-colors">
                          VIEW REPOSITORY
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>


            </>
          ) : (
            <div className="neumorphic-card p-8 rounded-3xl space-y-8">
              {/* Existing Projects */}
              <div className="space-y-6">
                <h3 className="text-[#00ff41] text-lg tracking-wider">EXISTING PROJECTS</h3>
                {editedProjects.map((project, index) => (
                  <div key={index} className="neumorphic-edit-card p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#0f0] text-sm">PROJECT #{index + 1}</span>
                      <button
                        onClick={() => handleRemoveProject(index)}
                        className="neumorphic-button p-2 rounded-xl text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Input
                      value={project.title}
                      onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                      placeholder="PROJECT TITLE"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41]"
                    />

                    <Textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                      placeholder="PROJECT DESCRIPTION"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] min-h-[100px]"
                    />

                    <div>
                      <label className="text-[#0f0] text-xs mb-2 block">TECHNOLOGIES</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            className="bg-[#1a221d] text-[#00d936] border border-[#00ff41]/30 flex items-center gap-2"
                          >
                            {tech}
                            <button
                              onClick={() => handleRemoveTech(index, techIndex)}
                              className="text-red-500 hover:text-red-600"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <button
                        onClick={() => handleAddTech(index)}
                        className="neumorphic-button px-4 py-2 rounded-xl text-[#00ff41] text-xs hover:text-[#0f0] flex items-center gap-2"
                      >
                        <Plus className="w-3 h-3" /> ADD TECH
                      </button>
                    </div>

                    <Input
                      value={project.githubUrl}
                      onChange={(e) => handleUpdateProject(index, 'githubUrl', e.target.value)}
                      placeholder="GITHUB URL"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00d936]"
                    />
                  </div>
                ))}
              </div>

              {/* Add New Project */}
              <div className="border-t border-[#00ff41]/20 pt-8">
                <h3 className="text-[#00ff41] text-lg tracking-wider mb-4">ADD NEW PROJECT</h3>
                <div className="space-y-4">
                  <Input
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="PROJECT TITLE"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41] placeholder:text-[#00ff41]/30"
                  />

                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="PROJECT DESCRIPTION"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] placeholder:text-[#00d936]/30 min-h-[100px]"
                  />

                  <div>
                    <label className="text-[#0f0] text-xs mb-2 block">TECHNOLOGIES</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newProject.technologies.map((tech, index) => (
                        <Badge key={index} className="bg-[#1a221d] text-[#00d936] border border-[#00ff41]/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="ADD TECHNOLOGY"
                        className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] placeholder:text-[#00d936]/30"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                      />
                      <button
                        onClick={() => handleAddTech()}
                        className="neumorphic-button px-4 py-2 rounded-xl text-[#00ff41] hover:text-[#0f0]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <Input
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    placeholder="GITHUB URL"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] placeholder:text-[#00d936]/30"
                  />

                  <button
                    onClick={handleAddProject}
                    className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-[#0f0] flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> ADD PROJECT
                  </button>
                </div>
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
                    setEditedProjects([...userData.projects]);
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
      </div>

      <style jsx>{`
        .neumorphic-card {
          background: #1a221d;
          box-shadow: 
            12px 12px 24px rgba(8, 12, 10, 0.9),
            -12px -12px 24px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-project-card {
          background: #1a221d;
          box-shadow: 
            12px 12px 24px rgba(8, 12, 10, 0.9),
            -12px -12px 24px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-edit-card {
          background: #1a221d;
          box-shadow: 
            inset 6px 6px 12px rgba(8, 12, 10, 0.6),
            inset -6px -6px 12px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-tech-badge {
          background: #1a221d;
          box-shadow: 
            inset 4px 4px 8px rgba(8, 12, 10, 0.7),
            inset -4px -4px 8px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-link-button {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.9),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-link-button:active {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.9),
            inset -8px -8px 16px rgba(35, 48, 40, 0.6);
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