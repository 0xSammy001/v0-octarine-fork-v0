"use client"

import { useState, useEffect, useRef } from "react"
import { SwapCard } from "@/components/swap-card"
import { OctarineLogo } from "@/components/octarine-logo"
import { RotatingText } from "@/components/rotating-text"
import { WaitlistModal } from "@/components/waitlist-modal"

function GalacticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const morphoColors = {
      vibrantBlue: "rgba(41, 115, 255, 0.9)",
      mediumBlue: "rgba(87, 146, 255, 0.7)",
      lightBlue: "rgba(100, 180, 255, 0.5)",
      paleBlue: "rgba(150, 200, 255, 0.4)",
      white: "rgba(255, 255, 255, 0.8)",
    }

    // Star class for twinkling star field
    class Star {
      x: number
      y: number
      size: number
      twinkleSpeed: number
      opacity: number
      opacityDirection: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.8 // Slightly larger stars
        this.twinkleSpeed = Math.random() * 0.015 + 0.008 // Faster twinkling
        this.opacity = Math.random() * 0.7 + 0.4
        this.opacityDirection = Math.random() > 0.5 ? 1 : -1
        const colorChoice = Math.random()
        if (colorChoice > 0.7) {
          this.color = morphoColors.vibrantBlue
        } else if (colorChoice > 0.4) {
          this.color = morphoColors.lightBlue
        } else {
          this.color = morphoColors.white
        }
      }

      update() {
        this.opacity += this.twinkleSpeed * this.opacityDirection
        if (this.opacity > 1 || this.opacity < 0.3) {
          this.opacityDirection *= -1
        }
      }

      draw() {
        if (!ctx) return
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/, `${this.opacity})`))
        gradient.addColorStop(0.5, this.color.replace(/[\d.]+\)$/, `${this.opacity * 0.5})`))
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // ShootingStar class for dynamic shooting stars
    class ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
      active: boolean

      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height * 0.5
        this.length = Math.random() * 120 + 60 // Longer trails
        this.speed = Math.random() * 12 + 8 // Faster shooting stars
        this.angle = Math.PI / 4 + (Math.random() * 0.4 - 0.2)
        this.opacity = 1
        this.active = false
      }

      activate() {
        this.reset()
        this.active = true
      }

      update() {
        if (!this.active) return

        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed
        this.opacity -= 0.012

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.active = false
        }
      }

      draw() {
        if (!this.active || !ctx) return

        const tailX = this.x - Math.cos(this.angle) * this.length
        const tailY = this.y - Math.sin(this.angle) * this.length

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
        gradient.addColorStop(0.2, `rgba(150, 200, 255, ${this.opacity * 0.9})`)
        gradient.addColorStop(0.5, `rgba(87, 146, 255, ${this.opacity * 0.7})`)
        gradient.addColorStop(0.8, `rgba(41, 115, 255, ${this.opacity * 0.4})`)
        gradient.addColorStop(1, `rgba(41, 115, 255, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3.5 // Thicker trail
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
      }
    }

    class EnergyWave {
      x: number
      y: number
      radius: number
      maxRadius: number
      opacity: number
      speed: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = 0
        this.maxRadius = Math.random() * 150 + 100
        this.opacity = 0.6
        this.speed = Math.random() * 2 + 1
        this.color = Math.random() > 0.5 ? morphoColors.vibrantBlue : morphoColors.mediumBlue
      }

      update() {
        this.radius += this.speed
        this.opacity = 0.6 * (1 - this.radius / this.maxRadius)

        if (this.radius >= this.maxRadius) {
          this.radius = 0
          this.opacity = 0.6
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.strokeStyle = this.color.replace(/[\d.]+\)$/, `${this.opacity})`)
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 1
        this.speedX = Math.random() * 0.8 - 0.4 // Faster particles
        this.speedY = Math.random() * 0.8 - 0.4
        this.opacity = Math.random() * 0.6 + 0.3
        this.color = Math.random() > 0.5 ? morphoColors.lightBlue : morphoColors.paleBlue
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.opacity})`)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const starsArray: Star[] = []
    const numberOfStars = 150
    for (let i = 0; i < numberOfStars; i++) {
      starsArray.push(new Star())
    }

    const particlesArray: Particle[] = []
    const numberOfParticles = 200
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    const shootingStarsArray: ShootingStar[] = []

    const energyWavesArray: EnergyWave[] = []
    const numberOfWaves = 5
    for (let i = 0; i < numberOfWaves; i++) {
      energyWavesArray.push(new EnergyWave())
    }

    const triggerShootingStar = () => {
      const inactiveStars = shootingStarsArray.filter((s) => !s.active)
      if (inactiveStars.length > 0) {
        const randomStar = inactiveStars[Math.floor(Math.random() * inactiveStars.length)]
        randomStar.activate()
      }
      setTimeout(triggerShootingStar, Math.random() * 3000 + 2000) // More frequent
    }
    triggerShootingStar()

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, "rgba(220, 235, 255, 0.98)")
      bgGradient.addColorStop(0.2, "rgba(200, 225, 255, 0.95)")
      bgGradient.addColorStop(0.4, "rgba(180, 215, 255, 0.92)")
      bgGradient.addColorStop(0.6, "rgba(160, 200, 250, 0.88)")
      bgGradient.addColorStop(0.8, "rgba(140, 185, 245, 0.85)")
      bgGradient.addColorStop(1, "rgba(120, 170, 240, 0.82)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update()
        starsArray[i].draw()
      }

      // Draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 0.3 * (1 - distance / 120)
            ctx.strokeStyle = `rgba(87, 146, 255, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }

      // Draw shooting stars
      for (let i = 0; i < shootingStarsArray.length; i++) {
        shootingStarsArray[i].update()
        shootingStarsArray[i].draw()
      }

      const radialGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        canvas.width * 0.8,
      )
      radialGradient.addColorStop(0, "rgba(255, 255, 255, 0.15)")
      radialGradient.addColorStop(0.4, "rgba(200, 225, 255, 0.08)")
      radialGradient.addColorStop(1, "rgba(120, 170, 240, 0)")
      ctx.fillStyle = radialGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export function HeroSection() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      <section className="relative overflow-hidden px-6 lg:px-12 bg-secondary">
        <div className="absolute inset-0 pointer-events-none">
          <GalacticBackground />
        </div>

        {/* Transmutation Circle Overlay (Large Watermark) */}
        <div className="absolute -left-20 top-20 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
          <OctarineLogo variant="dark" size="lg" className="w-full h-full [&_svg]:w-full [&_svg]:h-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 items-center">
            {/* Left: Text Content */}
            <div className="animate-fade-in min-w-0">
              {/* Headline */}
              <h1 className="text-black text-3xl sm:text-4xl md:text-5xl mb-6 leading-[1.1] font-bold tracking-tight">
                Instant
                <br />
                liquidity for <br />
                <span className="relative inline-block h-[1.1em] align-baseline w-full overflow-hidden">
                  <span className="relative z-10 text-black absolute left-0 top-0 w-full">
                    <RotatingText
                      words={["Real-World Assets", "US Treasuries", "Tokenized Funds", "Private Credit"]}
                      className="inline-block whitespace-nowrap"
                    />
                  </span>
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-black text-lg mb-10 leading-relaxed max-w-lg font-normal mt-1">
                Octarine enables 24/7 instant swaps between stablecoins and tokenized RWAs by aggregating offchain
                liquidity from partner solvers and market makers.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <button
                  className="px-6 py-4 rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(41,115,255,0.4)] bg-gradient-to-r from-primary to-blue-600 text-white cursor-pointer hover:from-blue-400 hover:to-blue-500 transition-all"
                  onClick={() => setIsWaitlistOpen(true)}
                >
                  Join Waitlist
                </button>
              </div>
            </div>

            {/* Right: Demo Interface */}
            <div className="relative animate-fade-in-delay">
              <SwapCard />
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  )
}
