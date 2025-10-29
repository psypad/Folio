import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export default function TerminalFooter() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Terminal Footer */}
        <div className="neumorphic-card p-6 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Terminal className="w-5 h-5 text-[#00ff41]" />
              <span className="text-[#00d936] text-sm tracking-wider">
                SYSTEM.STATUS
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                <span className="text-[#00d936]">
                  UPTIME: {Math.floor(Date.now() / 1000 / 60 / 60)}h
                </span>
              </div>
              <div className="text-[#00d936]">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>

            <div className="text-[#00d936] text-sm">
              © {new Date().getFullYear()} | ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-[#0f1612] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00ff41] to-[#0f0] animate-pulse"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* ASCII Art */}
        <div className="mt-8 text-center">
          <pre className="text-[#00ff41] text-xs opacity-30 font-mono inline-block">
{`
“I’m not a hacker — I’m a systems archaeologist.”
`}
          </pre>
        </div>
      </div>

      <style jsx>{`
        .neumorphic-card {
          background: #1a221d;
          box-shadow: 
            12px 12px 24px rgba(8, 12, 10, 0.9),
            -12px -12px 24px rgba(35, 48, 40, 0.6);
        }
      `}</style>
    </footer>
  );
}