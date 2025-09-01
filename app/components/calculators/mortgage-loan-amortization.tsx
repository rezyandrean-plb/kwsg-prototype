"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { amortizationScheduleAtom } from "@/app/lib/atoms/mortgage-loan-atoms"
import { formatCurrency } from "@/app/lib/utils"
import { ChevronLeft, ChevronRight, Search, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MortgageLoanAmortization() {
  const [amortizationSchedule] = useAtom(amortizationScheduleAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState("all")
  const [showExtraCols, setShowExtraCols] = useState(false)
  const [showFullTable, setShowFullTable] = useState(false)

  // Filter the schedule based on search and year filter
  const filteredSchedule = amortizationSchedule.filter((item: any) => {
    const matchesSearch = searchTerm === "" || item.month.toString().includes(searchTerm)

    const matchesYear = yearFilter === "all" || Math.ceil(item.month / 12) === Number.parseInt(yearFilter)

    return matchesSearch && matchesYear
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchedule.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedSchedule = filteredSchedule.slice(startIndex, startIndex + pageSize)

  // Generate year options
  const totalYears = Math.ceil(amortizationSchedule.length / 12)
  const yearOptions = Array.from({ length: totalYears }, (_, i) => i + 1)

  return (
    <Card className="bg-[#23232a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">
          Loan Repayment Amortisation Table
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-2 align-middle cursor-pointer"><Info className="inline h-4 w-4 text-gray-400 hover:text-gray-300" /></span>
              </TooltipTrigger>
              <TooltipContent>
                An amortisation schedule is a table showing how your monthly loan payments are split between principal and interest over time.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="yearFilter" className="text-white">Filter by Year</Label>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger id="yearFilter" className="bg-[#1c1c1d] border-gray-700 text-white">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c1c1d] border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">All Years</SelectItem>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="text-white hover:bg-gray-700">
                    Year {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label htmlFor="search" className="text-white">Search by Month</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search..."
                className="pl-8 bg-[#1c1c1d] border-gray-700 text-white placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1">
            <Label htmlFor="pageSize" className="text-white">Rows per page</Label>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number.parseInt(value))}>
              <SelectTrigger id="pageSize" className="bg-[#1c1c1d] border-gray-700 text-white">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c1c1d] border-gray-700">
                <SelectItem value="12" className="text-white hover:bg-gray-700">12 rows</SelectItem>
                <SelectItem value="24" className="text-white hover:bg-gray-700">24 rows</SelectItem>
                <SelectItem value="36" className="text-white hover:bg-gray-700">36 rows</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-2 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowExtraCols(v => !v)} className="border-gray-700 text-white hover:bg-gray-700">
            {showExtraCols ? "Hide Extra Columns" : "Show More Columns"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowFullTable(v => !v)} className="border-gray-700 text-white hover:bg-gray-700">
            {showFullTable ? "Row Select" : "Full Table"}
          </Button>
        </div>
        <div className="border border-gray-700 rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#1c1c1d] hover:bg-[#1c1c1d]">
                <TableHead className="w-[80px] text-white">Payment Month</TableHead>
                <TableHead className="text-white">Monthly Instalment ($)</TableHead>
                <TableHead className="text-white">Interest Portion ($)</TableHead>
                <TableHead className="text-white">Principle Portion ($)</TableHead>
                {showExtraCols && <TableHead className="text-white">Interest Paid To Date ($)</TableHead>}
                {showExtraCols && <TableHead className="text-white">Principal Paid To Date ($)</TableHead>}
                <TableHead className="text-white">Balance ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(showFullTable ? filteredSchedule : paginatedSchedule).length > 0 ? (
                (showFullTable ? filteredSchedule : paginatedSchedule).map((item: any, index: number) => (
                  <TableRow 
                    key={item.month} 
                    className={`hover:bg-gray-700 transition-colors duration-150 text-white ${
                      index % 2 === 0 ? "bg-[#1c1c1d]" : "bg-[#2a2a2a]"
                    }`}
                  >
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell>${formatCurrency(item.payment)}</TableCell>
                    <TableCell>${formatCurrency(item.interest)}</TableCell>
                    <TableCell>${formatCurrency(item.principal)}</TableCell>
                    {showExtraCols && <TableCell>${formatCurrency(item.interestPaidToDate)}</TableCell>}
                    {showExtraCols && <TableCell>${formatCurrency(item.principalPaidToDate)}</TableCell>}
                    <TableCell>${formatCurrency(item.balance)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={showExtraCols ? 7 : 5} className="text-center py-4 text-white">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {!showFullTable && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-300">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredSchedule.length)} of {filteredSchedule.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-gray-700 text-white hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-white">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-gray-700 text-white hover:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
