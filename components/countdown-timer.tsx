"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 12,
    minutes: 10,
    seconds: 10
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime

        // Decrease seconds
        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          // Decrease minutes
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            // Decrease hours
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              // Decrease days
              if (days > 0) {
                days -= 1
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

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
