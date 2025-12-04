"use client"

import { useState } from "react"
import { useEffect, useRef } from "react"
import { Shield3DGlossy } from "@/components/icons"
import { WaitlistModal } from "@/components/waitlist-modal"

export function LiquidationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const shouldBeFullscreen = rect.top <= viewportHeight * 0.3 && rect.bottom >= viewportHeight * 0.5

      setIsFullscreen(shouldBeFullscreen)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section ref={sectionRef} className="relative px-6 lg:px-12 py-32 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-secondary py-20 pl-12 pr-12 shadow-lg lg:py-32 lg:pl-20 lg:pr-32">
            <div className="absolute inset-0">
              <div className="absolute inset-0 animate-glow-move" />
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 opacity-90">
              <Shield3DGlossy className="w-full h-full" />
            </div>

            <div className="relative z-10 max-w-xl">
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl lg:leading-tight">
                Liquidation Fallbacks for RWAs
              </h2>
              <p className="mt-4 text-pretty text-base leading-snug text-foreground lg:mt-6 lg:text-lg lg:leading-snug">
                Octarine backstops bad debt and enables RWAs to be onboarded in lending markets even in the absence of
                AMM liquidity. Reach out to us to know more.
              </p>
              <div className="mt-8">
                <button
                  className="px-6 py-4 rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(41,115,255,0.4)] bg-gradient-to-r from-primary to-blue-600 text-white cursor-pointer hover:from-blue-400 hover:to-blue-500 transition-all"
                  onClick={() => setIsWaitlistOpen(true)}
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  )
}
