import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

export default function InteractiveTerminal({ userData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: "system", text: "Terminal initialized... Type 'help' for available commands." },
    ]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const historyEndRef = useRef(null);

    const scrollToSection = (sectionId) => {
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => setIsOpen(false), 800);
            }
        }, 300);
    };

    const commands = {
        help: {
            description: "Display available commands",
            execute: () => {
                return [
                    { type: "output", text: "Available commands:" },
                    { type: "output", text: "  help       - Display this help message" },
                    { type: "output", text: "  ls         - List available sections" },
                    { type: "output", text: "  whoami     - Display user information" },
                    { type: "output", text: "  about      - Show about information" },
                    { type: "output", text: "  about      - Show about information" },
                    { type: "output", text: "  skills     - List all skills" },
                    { type: "output", text: "  projects   - Display all projects" },
                    { type: "output", text: "  papers     - Display Papers and Documents" },
                    { type: "output", text: "  contact    - Show contact information" },
                    { type: "output", text: "  social     - Display social media links" },
                    { type: "output", text: "  clear      - Clear terminal screen" },
                    { type: "output", text: "  exit       - Close terminal" },
                ];
            }
        },
        ls: {
            description: "List available sections",
            execute: () => {
                return [
                    { type: "output", text: "about/" },
                    { type: "output", text: "skills/" },
                    { type: "output", text: "projects/" },
                    { type: "output", text: "papers/" },
                    { type: "output", text: "contact/" },
                    { type: "output", text: "README.md" },
                ];
            }
        },
        whoami: {
            description: "Display user information",
            execute: () => {
                return [
                    { type: "output", text: `USER: ${userData.name}` },
                    { type: "output", text: `ROLE: ${userData.title}` },
                    { type: "output", text: `STATUS: ACTIVE` },
                    { type: "output", text: `CLEARANCE: LEVEL 5` },
                ];
            }
        },
        about: {
            description: "Show about information",
            execute: () => {
                scrollToSection('about-section');
                return [
                    { type: "output", text: "=== ABOUT ===" },
                    { type: "output", text: "Navigating to About section..." },
                ];
            }
        },
        skills: {
            description: "List all skills",
            execute: () => {
                scrollToSection('skills-section');
                return [
                    { type: "output", text: "=== SKILLS MATRIX ===" },
                    { type: "output", text: "Navigating to Skills section..." },
                ];
            }
        },
        papers: {
            description: "List all papers and documents",
            execute: () => {
                scrollToSection('papers-section');
                return [
                    { type: "output", text: "=== Accessing Classified Documents ===" },
                    { type: "output", text: "Navigating to Papers section..." },
                ];
            }
        },
        projects: {
            description: "Display all projects",
            execute: () => {
                scrollToSection('projects-section');
                return [
                    { type: "output", text: "=== OPERATIONS ARCHIVE ===" },
                    { type: "output", text: "Navigating to Projects section..." },
                ];
            }
        },
        contact: {
            description: "Show contact information",
            execute: () => {
                scrollToSection('social-section');
                return [
                    { type: "output", text: "=== CONTACT INFORMATION ===" },
                    { type: "output", text: "Navigating to Contact section..." },
                ];
            }
        },
        social: {
            description: "Display social media links",
            execute: () => {
                scrollToSection('social-section');
                return [
                    { type: "output", text: "=== SOCIAL NETWORKS ===" },
                    { type: "output", text: "Navigating to Social section..." },
                ];
            }
        },
        clear: {
            description: "Clear terminal screen",
            execute: () => {
                return [{ type: "clear" }];
            }
        },
        exit: {
            description: "Close terminal",
            execute: () => {
                setIsOpen(false);
                return [{ type: "system", text: "Closing terminal..." }];
            }
        }
    };

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized]);

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add command to history
        const newHistory = [
            ...history,
            { type: "command", text: `$ ${cmd}` }
        ];

        if (!trimmedCmd) {
            setHistory(newHistory);
            return;
        }

        // Add to command history for up/down arrow navigation
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        if (commands[trimmedCmd]) {
            const result = commands[trimmedCmd].execute();

            // Check if clear command
            if (result.some(item => item.type === "clear")) {
                setHistory([]);
                return;
            }

            // Execute any actions
            result.forEach(item => {
                if (item.type === "action" && item.action) {
                    setTimeout(() => item.action(), 500);
                }
            });

            // Add output to history
            setHistory([...newHistory, ...result.filter(item => item.type !== "action")]);
        } else {
            setHistory([
                ...newHistory,
                { type: "error", text: `Command not found: ${trimmedCmd}. Type 'help' for available commands.` }
            ]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        }
    };

    const handleLinkClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            {/* Floating Terminal Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 neumorphic-float-button p-4 rounded-full group hover:scale-110 transition-all duration-300"
                    aria-label="Open Terminal"
                >
                    <Terminal className="w-6 h-6 text-[#00ff41] group-hover:text-[#0f0]" />
                    <div className="absolute inset-0 rounded-full bg-[#00ff41] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                </button>
            )}

            {/* Terminal Window */}
            {isOpen && (
                <div className={`fixed bottom-8 right-8 z-50 ${isMinimized ? 'w-80' : 'w-full max-w-3xl'} transition-all duration-300`}>
                    <div className="neumorphic-terminal rounded-3xl overflow-hidden shadow-2xl">
                        {/* Terminal Header */}
                        <div className="terminal-header px-6 py-4 flex items-center justify-between border-b border-[#00ff41]/20">
                            <div className="flex items-center gap-3">
                                <Terminal className="w-5 h-5 text-[#00ff41]" />
                                <span className="text-[#00ff41] text-sm tracking-wider font-bold">
                                    SYSTEM_TERMINAL.EXE
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="neumorphic-icon-button p-2 rounded-lg hover:bg-[#00ff41]/10 transition-colors"
                                    aria-label="Minimize"
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4 text-[#00d936]" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4 text-[#00d936]" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="neumorphic-icon-button p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        {!isMinimized && (
                            <div className="terminal-content p-6 h-96 overflow-y-auto font-mono text-sm">
                                <div className="space-y-2">
                                    {history.map((entry, index) => (
                                        <div key={index} className="terminal-line">
                                            {entry.type === "command" && (
                                                <div className="text-[#00ff41]">{entry.text}</div>
                                            )}
                                            {entry.type === "output" && (
                                                <div className="text-[#00d936]">{entry.text}</div>
                                            )}
                                            {entry.type === "error" && (
                                                <div className="text-red-500">{entry.text}</div>
                                            )}
                                            {entry.type === "system" && (
                                                <div className="text-[#0f0] terminal-glow">{entry.text}</div>
                                            )}
                                            {entry.type === "link" && (
                                                <div
                                                    className="text-[#00d936] hover:text-[#00ff41] cursor-pointer underline"
                                                    onClick={() => handleLinkClick(entry.url)}
                                                >
                                                    {entry.text}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={historyEndRef} />
                                </div>

                                {/* Input Form */}
                                <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
                                    <span className="text-[#00ff41]">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent border-none outline-none text-[#00ff41] caret-[#00ff41]"
                                        placeholder="Type a command..."
                                        autoComplete="off"
                                        spellCheck="false"
                                    />
                                    <div className="w-2 h-4 bg-[#00ff41] animate-pulse" />
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
        .neumorphic-float-button {
          background: #1a221d;
          box-shadow: 
            8px 8px 16px rgba(8, 12, 10, 0.9),
            -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-float-button:active {
          box-shadow: 
            inset 8px 8px 16px rgba(8, 12, 10, 0.9),
            inset -8px -8px 16px rgba(35, 48, 40, 0.6);
        }

        .neumorphic-terminal {
          background: #1a221d;
          box-shadow: 
            20px 20px 40px rgba(8, 12, 10, 0.95),
            -20px -20px 40px rgba(35, 48, 40, 0.6);
        }

        .terminal-header {
          background: linear-gradient(135deg, #1a221d 0%, #15191c 100%);
        }

        .terminal-content {
          background: #151a17;
        }

        .neumorphic-icon-button {
          background: #1a221d;
          box-shadow: 
            4px 4px 8px rgba(8, 12, 10, 0.8),
            -4px -4px 8px rgba(35, 48, 40, 0.5);
        }

        .neumorphic-icon-button:active {
          box-shadow: 
            inset 4px 4px 8px rgba(8, 12, 10, 0.8),
            inset -4px -4px 8px rgba(35, 48, 40, 0.5);
        }

        .terminal-glow {
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
        }

        .terminal-content::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-content::-webkit-scrollbar-track {
          background: #0f1612;
        }

        .terminal-content::-webkit-scrollbar-thumb {
          background: #00ff41;
          border-radius: 4px;
        }

        .terminal-content::-webkit-scrollbar-thumb:hover {
          background: #0f0;
        }

        input::placeholder {
          color: rgba(0, 255, 65, 0.3);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
}