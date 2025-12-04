import { Twitter } from "./icons"

const OctarineLogoIcon = () => (
  <svg width="28" height="28" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" className="brightness-0">
    <g transform="rotate(0)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(45)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(90)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(135)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(180)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(225)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(270)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
    <g transform="rotate(315)">
      <path d="M 0 -25 L 15 -55 L 0 -75 L -15 -55 Z" fill="#3b82f6" stroke="none" />
    </g>
  </svg>
)

export function Footer() {
  return (
    <footer className="relative bg-secondary text-foreground py-12 md:py-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-white/3 to-transparent blur-2xl pointer-events-none" />

      <div className="relative px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Brand Section */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-1 mb-3 justify-center">
                <OctarineLogoIcon />
                <span className="text-xl font-bold text-black tracking-tight">Octarine</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">© 2025 Octarine. All rights reserved.</p>
              <div className="flex items-center gap-4 justify-center">
                <a
                  href="https://x.com/octarinefi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center hover:bg-background transition-all border border-border hover:scale-110 hover:-translate-y-0.5"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
