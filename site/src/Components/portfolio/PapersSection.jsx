import React, { useState } from "react";
import { FileText, Plus, Trash2, ExternalLink } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

export default function PapersSection({ userData, setUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPapers, setEditedPapers] = useState([...(userData.papers || [])]);
  const [newPaper, setNewPaper] = useState({
    title: "",
    description: "",
    pdfUrl: "",
    thumbnailUrl: ""
  });

  const handleAddPaper = () => {
    if (newPaper.title.trim()) {
      setEditedPapers([...editedPapers, newPaper]);
      setNewPaper({
        title: "",
        description: "",
        pdfUrl: "",
        thumbnailUrl: ""
      });
    }
  };

  const handleRemovePaper = (index) => {
    setEditedPapers(editedPapers.filter((_, i) => i !== index));
  };

  const handleUpdatePaper = (index, field, value) => {
    const updated = [...editedPapers];
    updated[index] = { ...updated[index], [field]: value };
    setEditedPapers(updated);
  };

  const handleSave = () => {
    setUserData({ ...userData, papers: editedPapers });
    setIsEditing(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="w-6 h-6 text-[#00ff41]" />
            <h2 className="text-3xl md:text-4xl text-[#00ff41] font-bold tracking-wider terminal-glow">
              [ PAPERS & DOCUMENTS ]
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00ff41] to-transparent" />
        </div>

        {/* Papers Grid */}
        <div className="space-y-6">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.papers && userData.papers.map((paper, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="neumorphic-paper-card p-6 rounded-3xl group hover:scale-[1.02] transition-all duration-300 flex flex-col h-full cursor-pointer">
                        {/* Thumbnail Area */}
                        <div className="aspect-video w-full bg-[#0d110e] rounded-xl mb-6 overflow-hidden border border-[#00ff41]/20 relative group-hover:border-[#00ff41]/50 transition-colors">
                          {paper.thumbnailUrl ? (
                            <img
                              src={paper.thumbnailUrl}
                              alt={paper.title}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-12 h-12 text-[#00ff41]/40" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a221d] to-transparent opacity-60" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                            <h3 className="text-xl text-[#00ff41] font-bold tracking-wider group-hover:text-[#0f0] transition-colors">
                              {paper.title}
                            </h3>
                          </div>
                          <p className="text-[#00d936] text-sm leading-relaxed mb-6 terminal-text flex-1">
                            {paper.description}
                          </p>

                          <div className="flex items-center gap-2 text-[#00ff41] text-xs tracking-wider mt-auto group-hover:text-[#0f0] transition-colors">
                            <span>READ DOCUMENT</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl h-[80vh] bg-[#1a221d] border-[#00ff41]/30 flex flex-col p-0 overflow-hidden">
                      <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-[#00ff41] tracking-wider flex items-center gap-3">
                          <FileText className="w-5 h-5" />
                          {paper.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 w-full bg-[#0d110e] border-t border-[#00ff41]/20 relative">
                        <iframe
                          src={paper.pdfUrl}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay"
                          title={paper.title}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </>
          ) : (
            <div className="neumorphic-card p-8 rounded-3xl space-y-8">
              {/* Existing Papers */}
              <div className="space-y-6">
                <h3 className="text-[#00ff41] text-lg tracking-wider">EXISTING PAPERS</h3>
                {editedPapers.map((paper, index) => (
                  <div key={index} className="neumorphic-edit-card p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#0f0] text-sm">PAPER #{index + 1}</span>
                      <button
                        onClick={() => handleRemovePaper(index)}
                        className="neumorphic-button p-2 rounded-xl text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Input
                      value={paper.title}
                      onChange={(e) => handleUpdatePaper(index, 'title', e.target.value)}
                      placeholder="PAPER TITLE"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41]"
                    />

                    <Textarea
                      value={paper.description}
                      onChange={(e) => handleUpdatePaper(index, 'description', e.target.value)}
                      placeholder="DESCRIPTION"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] min-h-[80px]"
                    />

                    <Input
                      value={paper.pdfUrl}
                      onChange={(e) => handleUpdatePaper(index, 'pdfUrl', e.target.value)}
                      placeholder="PDF URL"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00d936]"
                    />

                    <Input
                      value={paper.thumbnailUrl}
                      onChange={(e) => handleUpdatePaper(index, 'thumbnailUrl', e.target.value)}
                      placeholder="THUMBNAIL URL (Optional)"
                      className="neumorphic-input bg-[#1a221d] border-none text-[#00d936]"
                    />
                  </div>
                ))}
              </div>

              {/* Add New Paper */}
              <div className="border-t border-[#00ff41]/20 pt-8">
                <h3 className="text-[#00ff41] text-lg tracking-wider mb-4">ADD NEW PAPER</h3>
                <div className="space-y-4">
                  <Input
                    value={newPaper.title}
                    onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
                    placeholder="PAPER TITLE"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00ff41] placeholder:text-[#00ff41]/30"
                  />

                  <Textarea
                    value={newPaper.description}
                    onChange={(e) => setNewPaper({ ...newPaper, description: e.target.value })}
                    placeholder="DESCRIPTION"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] placeholder:text-[#00d936]/30 min-h-[80px]"
                  />

                  <Input
                    value={newPaper.pdfUrl}
                    onChange={(e) => setNewPaper({ ...newPaper, pdfUrl: e.target.value })}
                    placeholder="PDF URL"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] placeholder:text-[#00d936]/30"
                  />

                  <Input
                    value={newPaper.thumbnailUrl}
                    onChange={(e) => setNewPaper({ ...newPaper, thumbnailUrl: e.target.value })}
                    placeholder="THUMBNAIL URL (Optional)"
                    className="neumorphic-input bg-[#1a221d] border-none text-[#00d936] placeholder:text-[#00d936]/30"
                  />

                  <button
                    onClick={handleAddPaper}
                    className="neumorphic-button px-6 py-3 rounded-2xl text-[#00ff41] hover:text-[#0f0] flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> ADD PAPER
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
                    setEditedPapers([...(userData.papers || [])]);
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

        .neumorphic-paper-card {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.9),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-edit-card {
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
