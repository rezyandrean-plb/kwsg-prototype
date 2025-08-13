import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// Input atoms
export const purchasePriceAtom = atom<number>(1000000)
export const interestRateAtom = atom<number>(2.5)
export const loanTenureAtom = atom<number>(30)
export const loanToValueAtom = atom<number>(75)
export const cpfUtilisedAtom = atom<number>(0)

// Manual loan amount input atom
export const manualLoanAmountAtom = atom<number>((1000000 * 75) / 100)

// Auto-detection atom - tracks which value was last modified
export const lastModifiedAtom = atom<"purchasePrice" | "loanAmount" | "loanToValue">("purchasePrice")

// Derived atoms with automatic calculation direction
export const loanAmountAtom = atom((get) => {
  const lastModified = get(lastModifiedAtom)
  const purchasePrice = get(purchasePriceAtom)
  const loanToValue = get(loanToValueAtom)
  const manualLoanAmount = get(manualLoanAmountAtom)
  
  if (lastModified === "loanAmount") {
    return manualLoanAmount
  } else if (lastModified === "loanToValue") {
    return (purchasePrice * loanToValue) / 100
  } else {
    return (purchasePrice * loanToValue) / 100
  }
})

export const calculatedPurchasePriceAtom = atom((get) => {
  const purchasePrice = get(purchasePriceAtom)
  return purchasePrice
})

// Calculated LTV when loan amount is manually set
export const calculatedLTVAtom = atom((get) => {
  const lastModified = get(lastModifiedAtom)
  const purchasePrice = get(purchasePriceAtom)
  const loanToValue = get(loanToValueAtom)
  const manualLoanAmount = get(manualLoanAmountAtom)
  
  if (lastModified === "loanAmount") {
    return (manualLoanAmount * 100) / purchasePrice
  } else {
    return loanToValue
  }
})

export const availableEquityAtom = atom((get) => {
  const calculatedPurchasePrice = get(calculatedPurchasePriceAtom)
  const loanAmount = get(loanAmountAtom)
  const cpfUtilised = get(cpfUtilisedAtom)
  return calculatedPurchasePrice - loanAmount - cpfUtilised
})

export const monthlyRepaymentAtom = atom((get) => {
  const loanAmount = get(loanAmountAtom)
  const interestRate = get(interestRateAtom) / 100 / 12 // Monthly interest rate
  const loanTenureMonths = get(loanTenureAtom) * 12 // Loan tenure in months

  // Calculate monthly repayment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  if (interestRate === 0) {
    return loanAmount / loanTenureMonths
  }

  const monthlyPayment =
    (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenureMonths)) /
    (Math.pow(1 + interestRate, loanTenureMonths) - 1)

  return monthlyPayment
})

// Amortization schedule atom
export const amortizationScheduleAtom = atom((get) => {
  const loanAmount = get(loanAmountAtom)
  const interestRate = get(interestRateAtom) / 100 / 12 // Monthly interest rate
  const loanTenureMonths = get(loanTenureAtom) * 12 // Loan tenure in months
  const monthlyPayment = get(monthlyRepaymentAtom)

  const schedule = []
  let remainingBalance = loanAmount
  let cumulativeInterest = 0
  let cumulativePrincipal = 0

  for (let month = 1; month <= loanTenureMonths; month++) {
    const interestPayment = remainingBalance * interestRate
    const principalPayment = monthlyPayment - interestPayment
    remainingBalance -= principalPayment
    cumulativeInterest += interestPayment
    cumulativePrincipal += principalPayment

    schedule.push({
      month,
      payment: monthlyPayment,
      interest: interestPayment,
      principal: principalPayment,
      balance: remainingBalance > 0 ? remainingBalance : 0,
      interestPaidToDate: cumulativeInterest,
      principalPaidToDate: cumulativePrincipal,
    })
  }

  return schedule
})

// Summary atoms
export const totalPaymentAtom = atom((get) => {
  const monthlyPayment = get(monthlyRepaymentAtom)
  const loanTenureMonths = get(loanTenureAtom) * 12
  return monthlyPayment * loanTenureMonths
})

export const totalInterestAtom = atom((get) => {
  const totalPayment = get(totalPaymentAtom)
  const loanAmount = get(loanAmountAtom)
  return totalPayment - loanAmount
})

// Save calculation history
export const mortgageLoanHistoryAtom = atomWithStorage<any[]>("mortgageLoanHistory", [])
