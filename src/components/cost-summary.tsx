"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CostSummaryProps {
  constructionTotal: number
  interiorTotal: number
  grandTotal: number
  roomArea: number
  roomType: string
  suggestions: string[]
  onDownloadReport?: () => void
  onViewSuggestions?: () => void
  className?: string
}

export function CostSummary({ 
  constructionTotal, 
  interiorTotal, 
  grandTotal, 
  roomArea, 
  roomType, 
  suggestions,
  onDownloadReport,
  onViewSuggestions,
  className 
}: CostSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const costPerSqFt = grandTotal / roomArea

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Cost Summary */}
      <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-green-800 dark:text-green-200">
            Total Project Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(grandTotal)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {roomArea} sq ft • {roomType} • {formatCurrency(costPerSqFt)} per sq ft
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">Construction Materials</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(constructionTotal)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">Interior Items</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {formatCurrency(interiorTotal)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Grand Total</span>
              <span className="font-bold text-xl text-green-600 dark:text-green-400">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Suggestions Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Quick Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
              </div>
            ))}
            {suggestions.length > 3 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onViewSuggestions}
                className="mt-3"
              >
                View All Suggestions
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onDownloadReport}
          className="flex-1"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button 
          variant="outline" 
          onClick={onViewSuggestions}
          className="flex-1"
          size="lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </div>
  )
} 