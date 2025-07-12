"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MaterialList } from '@/components/material-list'
import { InteriorLayout } from '@/components/interior-layout'
import { CostSummary } from '@/components/cost-summary'
import { ArrowLeft, Download, FileText, Home, Sparkles, CheckCircle, Loader2 } from 'lucide-react'

interface AnalysisResults {
  roomArea: number
  roomType: string
  constructionEstimate: any[]
  interiorEstimate: any[]
  constructionTotal: number
  interiorTotal: number
  grandTotal: number
  suggestions: string[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<AnalysisResults | null>(null)
  const [analysisType, setAnalysisType] = useState<'construction' | 'interior'>('construction')
  const [imageName, setImageName] = useState('')

  useEffect(() => {
    // Get data from session storage
    const storedResults = sessionStorage.getItem('analysisResults')
    const storedAnalysisType = sessionStorage.getItem('analysisType') as 'construction' | 'interior'
    const storedImageName = sessionStorage.getItem('imageName')
    
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
    if (storedAnalysisType) setAnalysisType(storedAnalysisType)
    if (storedImageName) setImageName(storedImageName)

    // If no results, redirect to upload
    if (!storedResults) {
      router.push('/upload')
    }
  }, [router])

  const handleDownloadReport = () => {
    // Simulate download
    alert('Report download started! (This is a demo)')
  }

  const handleViewSuggestions = () => {
    router.push('/suggestions')
  }

  const handleNewAnalysis = () => {
    // Clear session storage
    sessionStorage.clear()
    router.push('/upload')
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl w-fit">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                    Analysis Results
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Complete Report</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                onClick={handleNewAnalysis}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Home className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
              <Button 
                onClick={handleDownloadReport}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 px-4 py-2 rounded-full border border-green-200/50 dark:border-green-800/50">
              <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Analysis Complete</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Your {analysisType === 'construction' ? 'Construction' : 'Interior'} Analysis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive analysis of your <span className="font-semibold text-gray-900 dark:text-gray-100">{imageName}</span> with detailed estimates and recommendations
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Construction Materials */}
            <div className="lg:col-span-2 space-y-8">
              <MaterialList
                materials={results.constructionEstimate}
                title="Construction Materials"
                totalCost={results.constructionTotal}
              />
              
              <InteriorLayout
                items={results.interiorEstimate}
                title="Interior Items & Layout"
                totalCost={results.interiorTotal}
              />
            </div>

            {/* Right Column - Cost Summary */}
            <div className="lg:col-span-1">
              <CostSummary
                constructionTotal={results.constructionTotal}
                interiorTotal={results.interiorTotal}
                grandTotal={results.grandTotal}
                roomArea={results.roomArea}
                roomType={results.roomType}
                suggestions={results.suggestions}
                onDownloadReport={handleDownloadReport}
                onViewSuggestions={handleViewSuggestions}
              />
            </div>
          </div>

          {/* Additional Actions */}
          <div className="text-center space-y-6 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              What would you like to do next?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={handleViewSuggestions}
                size="lg"
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Detailed Suggestions
              </Button>
              <Button 
                onClick={handleNewAnalysis}
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Start New Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 