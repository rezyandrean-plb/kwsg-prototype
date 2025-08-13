"use client"

import { useAtom } from "jotai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  loanAmountAtom,
  monthlyRepaymentAtom,
  totalPaymentAtom,
  totalInterestAtom,
  loanTenureAtom,
  interestRateAtom,
  purchasePriceAtom,
  loanToValueAtom,
} from "@/app/lib/atoms/mortgage-loan-atoms"
import { formatCurrency } from "@/app/lib/utils"
import { CircleDollarSign, Calendar, Percent, Home } from "lucide-react"

interface MortgageLoanResultsProps {
  hasCalculated: boolean
}

export function MortgageLoanResults({ hasCalculated }: MortgageLoanResultsProps) {
  const [loanAmount] = useAtom(loanAmountAtom)
  const [monthlyRepayment] = useAtom(monthlyRepaymentAtom)
  const [totalPayment] = useAtom(totalPaymentAtom)
  const [totalInterest] = useAtom(totalInterestAtom)
  const [loanTenure] = useAtom(loanTenureAtom)
  const [interestRate] = useAtom(interestRateAtom)
  const [purchasePrice] = useAtom(purchasePriceAtom)
  const [loanToValue] = useAtom(loanToValueAtom)

  if (!hasCalculated) {
    return (
      <Card className="h-full flex flex-col justify-center bg-[#23232a] border-gray-800">
        <CardContent className="pt-6 text-center text-white">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#1c1c1d] flex items-center justify-center mb-4">
            <CircleDollarSign className="h-8 w-8 text-[#ce001f]" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">Mortgage Loan Calculator</h3>
          <p className="text-gray-400 mb-4">
            Fill in the details on the left and click "Calculate" to see your mortgage loan results.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full bg-[#23232a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl text-center text-white">Result of Mortgage Loan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-white">
        <div className="flex flex-col items-center mb-4">
          <span className="text-gray-400 text-sm mb-1">Your Estimated Monthly Repayment</span>
          <span className="text-3xl font-bold text-[#ce001f] tracking-tight mb-2">S$ {formatCurrency(isFinite(monthlyRepayment) ? monthlyRepayment : 0)} <span className="text-lg font-medium text-gray-400">/ month</span></span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1c1c1d] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <CircleDollarSign className="h-5 w-5 text-[#ce001f] mr-2" />
              <h3 className="text-sm font-medium text-gray-300">Loan Amount</h3>
            </div>
            <p className="text-2xl font-bold text-[#ce001f]">${formatCurrency(isFinite(loanAmount) ? loanAmount : 0)}</p>
          </div>

          <div className="bg-[#1c1c1d] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-[#ce001f] mr-2" />
              <h3 className="text-sm font-medium text-gray-300">Loan Tenure</h3>
            </div>
            <p className="text-2xl font-bold text-[#ce001f]">{loanTenure} years</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1c1c1d] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-[#ce001f] mr-2" />
              <h3 className="text-sm font-medium text-gray-300">Interest Rate</h3>
            </div>
            <p className="text-2xl font-bold text-[#ce001f]">{interestRate}%</p>
          </div>

          <div className="bg-[#1c1c1d] rounded-lg p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <Home className="h-5 w-5 text-[#ce001f] mr-2" />
              <h3 className="text-sm font-medium text-gray-300">Loan to Value</h3>
            </div>
            <p className="text-2xl font-bold text-[#ce001f]">{loanToValue}%</p>
          </div>
        </div>

        {/* Estimated Monthly Principal and Interest Section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Estimated Monthly Principal and Interest</h3>
          {/* Simple horizontal bar chart */}
                      <div className="flex w-full h-8 rounded overflow-hidden border border-gray-600">
            {/* Calculate principal and interest portions */}
            {(() => {
              // Estimate monthly principal and interest
              if (loanTenure <= 0 || monthlyRepayment <= 0) {
                return (
                  <div className="flex items-center justify-center text-gray-500 text-xs font-semibold bg-gray-200 w-full">
                    No data available
                  </div>
                )
              }
              
              const principal = loanAmount / (loanTenure * 12)
              const interest = monthlyRepayment - principal
              const principalPct = (principal / monthlyRepayment) * 100
              const interestPct = (interest / monthlyRepayment) * 100
              
              return (
                <>
                  <div
                    className="flex items-center justify-center text-white text-xs font-semibold bg-teal-700"
                    style={{ width: `${Math.max(0, Math.min(100, principalPct))}%` }}
                  >
                    {Math.round(principalPct)}%
                  </div>
                  <div
                    className="flex items-center justify-center text-white text-xs font-semibold bg-cyan-400"
                    style={{ width: `${Math.max(0, Math.min(100, interestPct))}%` }}
                  >
                    {Math.round(interestPct)}%
                  </div>
                </>
              )
            })()}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-6 mt-2">
            {(() => {
              if (loanTenure <= 0 || monthlyRepayment <= 0) {
                return (
                  <div className="text-sm text-gray-500">
                    No data available
                  </div>
                )
              }
              
              const principal = loanAmount / (loanTenure * 12)
              const interest = monthlyRepayment - principal
              return (
                <>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-teal-700"></span>
                    <span className="text-sm text-gray-300">S$ {formatCurrency(isFinite(principal) ? principal : 0)} Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-cyan-400"></span>
                    <span className="text-sm text-gray-300">S$ {formatCurrency(isFinite(interest) ? interest : 0)} Interest</span>
                  </div>
                </>
              )
            })()}
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Loan Amount:</span>
            <span className="font-medium">${formatCurrency(isFinite(loanAmount) ? loanAmount : 0)} ({loanToValue}%)</span>
          </div>
                      <div className="ml-4 mb-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Principal Payable after {loanTenure} years:</span>
                <span className="font-medium text-gray-300">${formatCurrency(isFinite(loanAmount) ? loanAmount : 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Interest Payable after {loanTenure} years:</span>
                <span className="font-medium text-gray-300">${formatCurrency(isFinite(totalInterest) ? totalInterest : 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Payable after {loanTenure} years:</span>
                <span className="font-bold text-[#ce001f]">${formatCurrency(isFinite(totalPayment) ? totalPayment : 0)}</span>
              </div>
            </div>
          {/* <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Interest:</span>
            <span className="font-medium">${formatCurrency(totalInterest)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Payment:</span>
            <span className="font-medium">${formatCurrency(totalPayment)}</span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-gray-400">Down Payment:</span>
            <span className="font-medium">${formatCurrency(isFinite(purchasePrice - loanAmount) ? purchasePrice - loanAmount : 0)} ({(100 - loanToValue)}%)</span>
          </div>
        </div>

        <div className="bg-[#1c1c1d] p-4 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Note:</h3>
          <p className="text-xs text-gray-400">
            This calculation is an estimate based on the provided information. Actual loan terms may vary based on
            credit score, bank policies, and other factors. Subject to TDSR compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
