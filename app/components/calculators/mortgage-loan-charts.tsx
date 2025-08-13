"use client"

import { useAtom } from "jotai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loanAmountAtom, totalInterestAtom, amortizationScheduleAtom } from "@/app/lib/atoms/mortgage-loan-atoms"
import { formatCurrency } from "@/app/lib/utils"
import React, { useState } from "react"

export function MortgageLoanCharts() {
  const [loanAmount] = useAtom(loanAmountAtom)
  const [totalInterest] = useAtom(totalInterestAtom)
  const [amortizationSchedule] = useAtom(amortizationScheduleAtom)
  const [hoveredYearIdx, setHoveredYearIdx] = useState<number | null>(null)

  // Prepare data for payment breakdown chart
  const paymentBreakdownData = [
    { name: "Principal", value: loanAmount, color: "#3b82f6" },
    { name: "Interest", value: totalInterest, color: "#f59e0b" },
  ]

  // Prepare data for amortization chart
  const amortizationChartData = []
  const yearlyData = []

  // Group by year for the chart
  for (let i = 0; i < amortizationSchedule.length; i += 12) {
    const yearIndex = Math.floor(i / 12)
    if (i < amortizationSchedule.length) {
      yearlyData.push({
        year: yearIndex + 1,
        balance: amortizationSchedule[i].balance,
        paidToDate: amortizationSchedule[i].payment * (i + 1),
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Loan Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakdown">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breakdown">Payment Breakdown</TabsTrigger>
            <TabsTrigger value="amortization">Amortization Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="pt-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Create a simple donut chart */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray={`${(loanAmount / (loanAmount + totalInterest)) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray={`${(totalInterest / (loanAmount + totalInterest)) * 251.2} 251.2`}
                    strokeDashoffset={`-${(loanAmount / (loanAmount + totalInterest)) * 251.2}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-500">Total Payment</span>
                  <span className="text-xl font-bold">${formatCurrency(loanAmount + totalInterest)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Principal: ${formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${(loanAmount / (loanAmount + totalInterest)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-sm">Interest: ${formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full"
                      style={{ width: `${(totalInterest / (loanAmount + totalInterest)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Interest to Principal Ratio: </span>
                    {((totalInterest / loanAmount) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amortization" className="pt-4">
            <div className="h-[450px] w-full">
              <div className="h-full w-full relative bg-white rounded-lg shadow-sm p-4">
                {/* Enhanced line chart for loan balance over time */}
                <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
                  {/* X and Y axes */}
                  <line x1="80" y1="360" x2="1120" y2="360" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="80" y1="40" x2="80" y2="360" stroke="#e5e7eb" strokeWidth="1" />

                  {/* Y-axis label */}
                  {/* <text
                    x="30"
                    y="180"
                    fontSize="16"
                    fill="#374151"
                    textAnchor="middle"
                    transform="rotate(-90 30 200)"
                  >
                    Loan Amount ($)
                  </text> */}

                  {/* X-axis label */}
                  <text
                    x="600"
                    y="390"
                    fontSize="16"
                    fill="#374151"
                    textAnchor="middle"
                  >
                    Years
                  </text>

                  {/* Y-axis grid lines and labels */}
                  {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                    <g key={i}>
                      <line
                        x1="80"
                        x2="1120"
                        y1={360 - t * 320}
                        y2={360 - t * 320}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                      <text
                        x="70"
                        y={365 - t * 320}
                        fontSize="12"
                        fill="#6b7280"
                        textAnchor="end"
                      >
                        ${formatCurrency(loanAmount * t)}
                      </text>
                    </g>
                  ))}

                  {/* X-axis year labels and grid lines */}
                  {yearlyData.map((data, idx) => {
                    const x = 80 + (idx / (yearlyData.length - 1)) * 1040
                    return (
                      <g key={idx}>
                        <line
                          x1={x}
                          x2={x}
                          y1="40"
                          y2="360"
                          stroke="#f3f4f6"
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y="375"
                          fontSize="12"
                          fill="#6b7280"
                          textAnchor="middle"
                        >
                         {data.year}
                        </text>
                      </g>
                    )
                  })}

                  {/* Amortization line */}
                  <polyline
                    points={yearlyData
                      .map((data, index) => {
                        const x = 80 + (index / (yearlyData.length - 1)) * 1040
                        const y = 360 - (data.balance / loanAmount) * 320
                        return `${x},${y}`
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                  />

                  {/* Dots for each year */}
                  {yearlyData.map((data, index) => {
                    const x = 80 + (index / (yearlyData.length - 1)) * 1040
                    const y = 360 - (data.balance / loanAmount) * 320
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="7"
                        fill="#3b82f6"
                        style={{ cursor: 'pointer', stroke: hoveredYearIdx === index ? '#2563eb' : 'white', strokeWidth: hoveredYearIdx === index ? 4 : 2 }}
                        onMouseEnter={() => setHoveredYearIdx(index)}
                        onMouseLeave={() => setHoveredYearIdx(null)}
                      />
                    )
                  })}
                </svg>
                {/* Tooltip for hovered year */}
                {hoveredYearIdx !== null && (() => {
                  const data = yearlyData[hoveredYearIdx]
                  const x = 80 + (hoveredYearIdx / (yearlyData.length - 1)) * 1040
                  const y = 360 - (data.balance / loanAmount) * 320
                  return (
                    <div
                      className="absolute z-20 px-4 py-3 rounded-xl shadow-xl bg-white border border-blue-200 text-xs text-gray-800"
                      style={{
                        left: x - 80,
                        top: y - 70,
                        minWidth: 160,
                        pointerEvents: 'none',
                      }}
                    >
                      <div className="font-semibold text-blue-700 mb-1">Year {data.year}</div>
                      <div><span className="font-medium">Total Paid To Date:</span> <span className="text-blue-900">${formatCurrency(data.paidToDate)}</span></div>
                      <div><span className="font-medium">Balance Remaining:</span> <span className="text-blue-900">${formatCurrency(data.balance)}</span></div>
                    </div>
                  )
                })()}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                This chart shows how your loan balance decreases over time as you make payments.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
