'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TdsrCalculatorProps {
  propertyPrice?: number;
  loanTenure?: number;
  interestRate?: number;
}

interface CalculationResult {
  monthlyIncome: number;
  totalDebt: number;
  tdsr: number;
  msr: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

const TdsrCalculator: React.FC<TdsrCalculatorProps> = ({
  propertyPrice = 1500000,
  loanTenure = 30,
  interestRate = 3.5,
}) => {
  // Form state
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    existingLoans: '',
    propertyPrice: propertyPrice.toString(),
    downPayment: '25',
    loanTenure: loanTenure.toString(),
    interestRate: interestRate.toString(),
  });

  // Results state
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Constants
  const TDSR_LIMIT = 55; // 55% TDSR limit
  const MSR_LIMIT = 30; // 30% MSR limit for private properties
  const MIN_DOWN_PAYMENT = 25; // Minimum 25% down payment for private properties

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateResults = () => {
    const monthlyIncome = parseFloat(formData.monthlyIncome) || 0;
    const existingLoans = parseFloat(formData.existingLoans) || 0;
    const propertyPrice = parseFloat(formData.propertyPrice) || 0;
    const downPaymentPercent = parseFloat(formData.downPayment) || MIN_DOWN_PAYMENT;
    const loanTenure = parseFloat(formData.loanTenure) || 30;
    const interestRate = parseFloat(formData.interestRate) || 3.5;

    // Calculate loan amount
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;

    // Calculate monthly mortgage payment
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTenure * 12;
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate TDSR and MSR
    const totalDebt = existingLoans + monthlyPayment;
    const tdsr = (totalDebt / monthlyIncome) * 100;
    const msr = (monthlyPayment / monthlyIncome) * 100;

    // Calculate maximum loan amount based on TDSR
    const maxMonthlyPayment = (monthlyIncome * TDSR_LIMIT / 100) - existingLoans;
    const maxLoanAmount = maxMonthlyPayment * 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));

    // Determine status and message
    let status: 'pass' | 'fail' | 'warning' = 'pass';
    let message = 'Your application meets the TDSR and MSR requirements.';

    if (tdsr > TDSR_LIMIT) {
      status = 'fail';
      message = `TDSR exceeds the ${TDSR_LIMIT}% limit. Consider reducing the loan amount or increasing your income.`;
    } else if (msr > MSR_LIMIT) {
      status = 'fail';
      message = `MSR exceeds the ${MSR_LIMIT}% limit. Consider increasing your down payment or reducing the loan amount.`;
    } else if (tdsr > TDSR_LIMIT * 0.9 || msr > MSR_LIMIT * 0.9) {
      status = 'warning';
      message = 'Your application is close to the limits. Consider a more conservative approach.';
    }

    setResult({
      monthlyIncome,
      totalDebt,
      tdsr,
      msr,
      maxLoanAmount,
      monthlyPayment,
      status,
      message
    });
  };

  useEffect(() => {
    if (formData.monthlyIncome && formData.propertyPrice) {
      calculateResults();
    }
  }, [formData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Section */}
        <Card className="bg-[#1c1c1d] border-gray-700">
          <CardContent className="pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Income & Existing Loans</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome" className="text-gray-300">
                  Monthly Income (S$)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="inline-block ml-1 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your total monthly income from all sources</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter monthly income"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="existingLoans" className="text-gray-300">
                  Monthly Existing Loans (S$)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="inline-block ml-1 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total monthly payments for all existing loans</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="existingLoans"
                  name="existingLoans"
                  type="number"
                  value={formData.existingLoans}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter existing loan payments"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details Section */}
        <Card className="bg-[#1c1c1d] border-gray-700">
          <CardContent className="pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Property Details</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="propertyPrice" className="text-gray-300">
                  Property Price (S$)
                </Label>
                <Input
                  id="propertyPrice"
                  name="propertyPrice"
                  type="number"
                  value={formData.propertyPrice}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter property price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="downPayment" className="text-gray-300">
                  Down Payment (%)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="inline-block ml-1 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimum 25% for private properties</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="downPayment"
                  name="downPayment"
                  type="number"
                  value={formData.downPayment}
                  onChange={handleInputChange}
                  min={MIN_DOWN_PAYMENT}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter down payment percentage"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanTenure" className="text-gray-300">
                    Loan Tenure (Years)
                  </Label>
                  <Input
                    id="loanTenure"
                    name="loanTenure"
                    type="number"
                    value={formData.loanTenure}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter loan tenure"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate" className="text-gray-300">
                    Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    step="0.01"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter interest rate"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {result && (
        <Card className="bg-[#1c1c1d] border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Results</h4>
              <Badge 
                className={
                  result.status === 'pass' 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                    : result.status === 'warning'
                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }
              >
                {result.status === 'pass' ? 'Eligible' : result.status === 'warning' ? 'Warning' : 'Not Eligible'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">TDSR</div>
                  <div className="text-2xl font-bold text-white">
                    {result.tdsr.toFixed(1)}%
                    <span className="text-sm text-gray-400 ml-2">/ {TDSR_LIMIT}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">MSR</div>
                  <div className="text-2xl font-bold text-white">
                    {result.msr.toFixed(1)}%
                    <span className="text-sm text-gray-400 ml-2">/ {MSR_LIMIT}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Monthly Payment</div>
                  <div className="text-2xl font-bold text-white">
                    S$ {result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Maximum Loan Amount</div>
                  <div className="text-2xl font-bold text-white">
                    S$ {result.maxLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Monthly Debt</div>
                  <div className="text-2xl font-bold text-white">
                    S$ {result.totalDebt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {result.message}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA Section */}
      <Card className="bg-[#1c1c1d] border-gray-700">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h4 className="text-lg font-semibold text-white">Need Help Understanding TDSR & MSR?</h4>
            <p className="text-sm text-gray-400 max-w-md">
              Learn more about how TDSR and MSR affect your property purchase and what these ratios mean for your loan eligibility.
            </p>
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-gray-800">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1c1c1d] border-gray-700 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Understanding TDSR & MSR</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400 mt-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Total Debt Servicing Ratio (TDSR)</h5>
                      <p className="mb-4">
                        TDSR is the percentage of your gross monthly income that goes towards repaying all your monthly debt obligations, including the new property loan you're applying for. The current TDSR limit is {TDSR_LIMIT}%.
                      </p>
                      <p className="mb-4">
                        This includes:
                      </p>
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        <li>Property loans (including the new loan)</li>
                        <li>Car loans</li>
                        <li>Personal loans</li>
                        <li>Credit card payments</li>
                        <li>Other monthly debt obligations</li>
                      </ul>
                      <p>
                        TDSR = (Total Monthly Debt Obligations / Gross Monthly Income) × 100%
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Mortgage Servicing Ratio (MSR)</h5>
                      <p className="mb-4">
                        MSR is the portion of your gross monthly income that goes towards repaying your property loan. For private properties, the MSR limit is {MSR_LIMIT}%.
                      </p>
                      <p className="mb-4">
                        Key points about MSR:
                      </p>
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        <li>Applies to all property loans</li>
                        <li>Different limits for different property types</li>
                        <li>Based on gross monthly income</li>
                        <li>Includes all property-related loans</li>
                      </ul>
                      <p>
                        MSR = (Monthly Mortgage Payment / Gross Monthly Income) × 100%
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h6 className="font-semibold text-red-500 mb-2">Important Notes</h6>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• TDSR and MSR limits are set by the Monetary Authority of Singapore (MAS)</li>
                      <li>• These limits may change based on market conditions and government policies</li>
                      <li>• Additional restrictions may apply for multiple property ownership</li>
                      <li>• The calculator provides estimates only - final approval depends on the bank's assessment</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Contact Agent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TdsrCalculator; 