"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import react-confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false })

interface ConfettiCelebrationProps {
  active: boolean
  duration?: number
  onComplete?: () => void
}

export default function ConfettiCelebration({ active, duration = 3000, onComplete }: ConfettiCelebrationProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isActive, setIsActive] = useState(false)
  const [pieces, setPieces] = useState(200)

  // Set up window dimensions
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial dimensions
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle activation and deactivation
  useEffect(() => {
    if (active && !isActive) {
      setIsActive(true)
      setPieces(200)

      // Gradually reduce the number of confetti pieces
      const fadeInterval = setInterval(() => {
        setPieces((prev) => Math.max(0, prev - 20))
      }, duration / 2)

      // Deactivate after duration
      const timer = setTimeout(() => {
        clearInterval(fadeInterval)
        setIsActive(false)
        if (onComplete) onComplete()
      }, duration)

      return () => {
        clearTimeout(timer)
        clearInterval(fadeInterval)
      }
    }
  }, [active, duration, isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={pieces}
        recycle={false}
        gravity={0.5}
        colors={[
          "#E53935", // Red
          "#FB8C00", // Orange
          "#FFB300", // Amber
          "#7CB342", // Light Green
          "#039BE5", // Light Blue
          "#8E24AA", // Purple
          "#00897B", // Teal
          "#5E35B1", // Deep Purple
        ]}
      />
    </div>
  )
}

