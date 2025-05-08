"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center gap-4">
      <div className="bg-white/20 rounded-lg p-3 w-20 text-center">
        <div className="text-3xl font-bold">{timeLeft.days}</div>
        <div className="text-xs uppercase">Days</div>
      </div>
      <div className="bg-white/20 rounded-lg p-3 w-20 text-center">
        <div className="text-3xl font-bold">{timeLeft.hours}</div>
        <div className="text-xs uppercase">Hours</div>
      </div>
      <div className="bg-white/20 rounded-lg p-3 w-20 text-center">
        <div className="text-3xl font-bold">{timeLeft.minutes}</div>
        <div className="text-xs uppercase">Minutes</div>
      </div>
      <div className="bg-white/20 rounded-lg p-3 w-20 text-center">
        <div className="text-3xl font-bold">{timeLeft.seconds}</div>
        <div className="text-xs uppercase">Seconds</div>
      </div>
    </div>
  )
}
