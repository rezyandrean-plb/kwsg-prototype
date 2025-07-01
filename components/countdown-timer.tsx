"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate?: string // Making it optional since we'll use a fixed date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const target = new Date('2025-07-05T00:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="relative">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 w-20 text-center transition-all duration-300">
        <div className="text-4xl font-bold tracking-tight">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-xs uppercase tracking-wider mt-1">{label}</div>
      </div>
    </div>
  )

  return (
    <div className="flex justify-center gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}
