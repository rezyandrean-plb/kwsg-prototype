"use client"
// @ts-ignore
// webpack: disable hmr for this component

import type React from "react"

import { useState } from "react"
import { useAtom } from "jotai"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
// import { ClientSelector } from "@/components/clients/client-selector"
import { useToast } from "@/components/ui/use-toast"
// import { InputNumber } from "antd"
import {
  purchasePriceAtom,
  interestRateAtom,
  loanTenureAtom,
  loanToValueAtom,
  loanAmountAtom,
  monthlyRepaymentAtom,
  mortgageLoanHistoryAtom,
  cpfUtilisedAtom,
  lastModifiedAtom,
  manualLoanAmountAtom,
  calculatedPurchasePriceAtom,
  calculatedLTVAtom,
} from "@/app/lib/atoms/mortgage-loan-atoms"
import { formatCurrency } from "@/app/lib/utils"
import { MortgageLoanResults } from "./mortgage-loan-results"
import { MortgageLoanCharts } from "./mortgage-loan-charts"
import { MortgageLoanAmortization } from "./mortgage-loan-amortization"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function MortgageLoanCalculator() {
  const { toast } = useToast()
  const [purchasePrice, setPurchasePrice] = useAtom(purchasePriceAtom)
  const [interestRate, setInterestRate] = useAtom(interestRateAtom)
  const [loanTenure, setLoanTenure] = useAtom(loanTenureAtom)
  const [loanToValue, setLoanToValue] = useAtom(loanToValueAtom)
  const [cpfUtilised, setCpfUtilised] = useAtom(cpfUtilisedAtom)
  const [loanAmount] = useAtom(loanAmountAtom)
  const [monthlyRepayment] = useAtom(monthlyRepaymentAtom)
  const [history, setHistory] = useAtom(mortgageLoanHistoryAtom)
  const [lastModified, setLastModified] = useAtom(lastModifiedAtom)
  const [manualLoanAmount, setManualLoanAmount] = useAtom(manualLoanAmountAtom)
  const [calculatedPurchasePrice] = useAtom(calculatedPurchasePriceAtom)
  const [calculatedLTV] = useAtom(calculatedLTVAtom)

  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [showDetailedResults, setShowDetailedResults] = useState(false)

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") {
      setPurchasePrice(0)
      setLastModified("purchasePrice")
    } else {
      const value = Number.parseFloat(inputValue.replace(/,/g, ""))
      if (!isNaN(value)) {
        setPurchasePrice(value)
        setLastModified("purchasePrice")
      }
    }
  }

  const handleInterestRateChange = (value: number[]) => {
    setInterestRate(value[0])
  }

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") {
      setInterestRate(0)
    } else {
      const value = Number.parseFloat(inputValue)
      if (!isNaN(value) && value >= 0 && value <= 7) {
        setInterestRate(value)
      }
    }
  }

  const handleLoanTenureChange = (value: number[]) => {
    setLoanTenure(value[0])
  }

  const handleLoanTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") {
      setLoanTenure(0)
    } else {
      const value = Number.parseInt(inputValue)
      if (!isNaN(value) && value >= 0 && value <= 35) {
        setLoanTenure(value)
      }
    }
  }

  const handleLoanToValueChange = (value: number[]) => {
    setLoanToValue(value[0])
    setLastModified("loanToValue")
    // Clear manual loan amount when LTV is changed
    setManualLoanAmount(0)
  }

  const handleLoanToValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") {
      setLoanToValue(0)
      setLastModified("loanToValue")
      setManualLoanAmount(0)
    } else {
      const value = Number.parseInt(inputValue)
      if (!isNaN(value) && value >= 0 && value <= 90) {
        setLoanToValue(value)
        setLastModified("loanToValue")
        // Clear manual loan amount when LTV is changed
        setManualLoanAmount(0)
      }
    }
  }

  const handleCpfUtilisedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/,/g, ""))
    if (!isNaN(value)) {
      setCpfUtilised(value)
    }
  }

  const handleManualLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === "") {
      setManualLoanAmount(0)
      setLastModified("loanAmount")
    } else {
      const value = Number.parseFloat(inputValue.replace(/,/g, ""))
      if (!isNaN(value)) {
        // Validate that loan amount doesn't exceed purchase price, if it does, set the loan amount to the purchase price
        if (value > purchasePrice) {
          toast({
            title: "Invalid Loan Amount",
            description: "Loan amount cannot exceed the purchase price.",
            variant: "destructive",
          })
          setManualLoanAmount(purchasePrice)
          setLastModified("loanAmount")
          return
        }
        setManualLoanAmount(value)
        setLastModified("loanAmount")
      }
    }
  }

  const handleCalculate = () => {
    setHasCalculated(true)
    setShowDetailedResults(false) // Reset detailed results visibility when new calculation is made

    // Save calculation to history if client is selected
    if (selectedClient) {
      const calculationResult = {
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        timestamp: new Date().toISOString(),
        purchasePrice: calculatedPurchasePrice,
        interestRate,
        loanTenure,
        loanToValue,
        loanAmount,
        monthlyRepayment,
      }

      setHistory([calculationResult, ...history])

      toast({
        title: "Calculation saved",
        description: `Mortgage loan calculation saved for ${selectedClient.name}`,
      })
    }
  }

  const handleShowDetailedResults = () => {
    setShowDetailedResults(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Card className="bg-[#23232a] border-gray-800">
          <CardContent className="pt-6 text-white">
           

            <div className="space-y-6">
              <div>
                <Label htmlFor="purchasePrice" className="text-base text-white">
                  Purchase Price <span className="text-[#ce001f]">*</span>
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">$</span>
                  <Input
                    id="purchasePrice"
                    className="pl-7 bg-[#1c1c1d] border-gray-700 text-white placeholder-gray-500"
                    value={lastModified === "purchasePrice" ? (purchasePrice > 0 ? Math.round(purchasePrice).toLocaleString() : "") : (calculatedPurchasePrice > 0 ? Math.round(calculatedPurchasePrice).toLocaleString() : "")}
                    onChange={handlePurchasePriceChange}
                  />
                </div>
              </div>

              {/* <div>
                <Label htmlFor="cpfUtilised" className="text-base">
                  CPF Utilised + Interest
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                  <Input
                    id="cpfUtilised"
                    className="pl-7"
                    value={cpfUtilised.toLocaleString()}
                    onChange={handleCpfUtilisedChange}
                  />
                </div>
              </div> */}

              <div>
                <Label htmlFor="interestRate" className="text-base text-white">
                  Interest Rate (%) <span className="text-[#ce001f]">*</span>
                </Label>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1">
                    <Slider
                      id="interestRate"
                      value={[interestRate]}
                      min={0}
                      max={7}
                      step={0.1}
                      onValueChange={handleInterestRateChange}
                    />
                  </div>
                  <div className="w-28 relative">
                    <Input
                      id="interestRateInput"
                      type="number"
                      min={0}
                      max={7}
                      step={0.1}
                      value={interestRate > 0 ? interestRate : ""}
                      onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                      className="w-full bg-[#1c1c1d] border-gray-700 text-white placeholder-gray-500 pr-8"
                      placeholder="0"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">%</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="loanTenure" className="text-base text-white">
                  Loan Tenure <span className="text-[#ce001f]">*</span>
                </Label>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1">
                    <Slider
                      id="loanTenure"
                      value={[loanTenure]}
                      min={1}
                      max={35}
                      step={1}
                      onValueChange={handleLoanTenureChange}
                    />
                  </div>
                  <div className="w-28 relative">
                    <Input
                      id="loanTenureInput"
                      type="number"
                      min={0}
                      max={35}
                      step={1}
                      value={loanTenure > 0 ? loanTenure : ""}
                      onChange={(e) => setLoanTenure(Number(e.target.value) || 0)}
                      className="w-full bg-[#1c1c1d] border-gray-700 text-white placeholder-gray-500 pr-16"
                      placeholder="0"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">year(s)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="loanToValue" className="text-base text-white">
                  Loan to Value (LTV) <span className="text-[#ce001f]">*</span>
                </Label>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1">
                    <Slider
                      id="loanToValue"
                      value={[Number(calculatedLTV.toFixed(0))]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handleLoanToValueChange}
                      // disabled={lastModified === "loanAmount"}
                    />
                  </div>
                  <div className="w-28 relative">
                    <Input
                      id="loanToValueInput"
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={calculatedLTV > 0 ? Number(calculatedLTV.toFixed(0)) : ""}
                      onChange={(e) => {
                        setLoanToValue(Number(e.target.value) || 0)
                        setLastModified("loanToValue")
                        setManualLoanAmount(0)
                      }}
                      className="w-full bg-[#1c1c1d] border-gray-700 text-white placeholder-gray-500 pr-8"
                      placeholder="0"
                      // disabled={lastModified === "loanAmount"}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">%</span>
                  </div>
                </div>
                {lastModified === "loanAmount" && (
                  <p className="text-xs text-gray-400 mt-1">
                    LTV calculated from loan amount
                  </p>
                )}
                {lastModified === "loanToValue" && (
                  <p className="text-xs text-gray-400 mt-1">
                    Loan amount calculated from LTV
                  </p>
                )}
              </div>

              <Button className="w-full bg-[#ce001f] hover:bg-[#b3001a] text-white" size="lg" onClick={handleCalculate}>
                Calculate Mortgage Loan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="bg-[#23232a] border-gray-800 rounded-lg">
          <MortgageLoanResults hasCalculated={hasCalculated} />
        </div>
        
        {/* Show Result Details Button */}
        {hasCalculated && !showDetailedResults && (
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={handleShowDetailedResults}
              className="bg-[#ce001f] hover:bg-[#b3001a] text-white"
              size="lg"
            >
              Show Result Details
            </Button>
          </div>
        )}
      </div>

      {hasCalculated && showDetailedResults && (
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <MortgageLoanCharts />
          <MortgageLoanAmortization />
          <Accordion type="single" collapsible className="mt-8 bg-[#23232a] border-gray-800 rounded-lg p-6">
            <AccordionItem value="q2">
              <AccordionTrigger>Why does the interest amount decrease every month?</AccordionTrigger>
              <AccordionContent>
                As you repay the principal, the outstanding loan amount gets smaller—so the interest, which is based on the remaining balance, also reduces.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can I make early repayments? How will it affect my schedule?</AccordionTrigger>
              <AccordionContent>
                Yes, early repayments reduce your principal faster, which can shorten your loan tenure and reduce total interest paid.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>What happens if I miss a monthly payment?</AccordionTrigger>
              <AccordionContent>
                Missing a payment may result in late fees and more interest. Check with your bank for exact penalties and terms.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>Is this schedule fixed or will it change?</AccordionTrigger>
              <AccordionContent>
                This schedule is based on a fixed interest rate and regular monthly payments. It will change if your loan is on a floating rate or if you make additional repayments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q6">
              <AccordionTrigger>Why do I pay more interest at the start of the loan?</AccordionTrigger>
              <AccordionContent>
                Because interest is calculated on the outstanding loan amount, and early in the loan, that amount is highest.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q7">
              <AccordionTrigger>What is the difference between principal and interest?</AccordionTrigger>
              <AccordionContent>
                Principal is the amount you borrowed. Interest is the cost charged by the bank for lending you that money.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q8">
              <AccordionTrigger>How accurate is this calculator?</AccordionTrigger>
              <AccordionContent>
                The calculator gives a close estimate based on the inputs. For exact figures, refer to your bank's official loan offer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}
