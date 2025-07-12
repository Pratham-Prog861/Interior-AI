"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Lightbulb, TrendingUp, Palette, Zap, Shield, Sparkles } from 'lucide-react'

interface Suggestion {
  id: string
  title: string
  description: string
  category: 'design' | 'efficiency' | 'sustainability' | 'cost' | 'safety'
  priority: 'high' | 'medium' | 'low'
  impact: string
  estimatedCost: number
  estimatedSavings?: number
}

export default function SuggestionsPage() {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    // Mock suggestions data
    const mockSuggestions: Suggestion[] = [
      {
        id: '1',
        title: 'Install Energy-Efficient Windows',
        description: 'Replace standard windows with double-glazed, energy-efficient windows to reduce heating and cooling costs by up to 30%.',
        category: 'efficiency',
        priority: 'high',
        impact: 'High energy savings and improved comfort',
        estimatedCost: 45000,
        estimatedSavings: 12000
      },
      {
        id: '2',
        title: 'Add Natural Lighting Solutions',
        description: 'Incorporate skylights or larger windows to maximize natural light, reducing the need for artificial lighting during daytime.',
        category: 'design',
        priority: 'medium',
        impact: 'Improved aesthetics and reduced electricity usage',
        estimatedCost: 25000,
        estimatedSavings: 5000
      },
      {
        id: '3',
        title: 'Use Sustainable Building Materials',
        description: 'Opt for eco-friendly materials like bamboo flooring, recycled steel, and low-VOC paints for better environmental impact.',
        category: 'sustainability',
        priority: 'medium',
        impact: 'Reduced environmental footprint and better indoor air quality',
        estimatedCost: 35000
      },
      {
        id: '4',
        title: 'Implement Smart Home Technology',
        description: 'Install smart thermostats, lighting controls, and security systems for better energy management and convenience.',
        category: 'efficiency',
        priority: 'low',
        impact: 'Automated energy optimization and enhanced security',
        estimatedCost: 15000,
        estimatedSavings: 8000
      },
      {
        id: '5',
        title: 'Optimize Space Layout',
        description: 'Reorganize furniture placement to improve traffic flow and create more functional living spaces.',
        category: 'design',
        priority: 'high',
        impact: 'Better space utilization and improved functionality',
        estimatedCost: 5000
      },
      {
        id: '6',
        title: 'Add Proper Ventilation System',
        description: 'Install mechanical ventilation to ensure proper air circulation and maintain indoor air quality.',
        category: 'safety',
        priority: 'high',
        impact: 'Improved air quality and occupant health',
        estimatedCost: 20000
      },
      {
        id: '7',
        title: 'Use Cost-Effective Flooring Options',
        description: 'Consider laminate or vinyl flooring that mimics hardwood appearance at a fraction of the cost.',
        category: 'cost',
        priority: 'medium',
        impact: 'Significant cost savings while maintaining aesthetics',
        estimatedCost: 18000,
        estimatedSavings: 25000
      },
      {
        id: '8',
        title: 'Install LED Lighting Throughout',
        description: 'Replace all lighting fixtures with energy-efficient LED alternatives for long-term cost savings.',
        category: 'efficiency',
        priority: 'medium',
        impact: 'Reduced electricity bills and longer bulb life',
        estimatedCost: 12000,
        estimatedSavings: 6000
      }
    ]
    setSuggestions(mockSuggestions)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'design':
        return <Palette className="w-5 h-5" />
      case 'efficiency':
        return <Zap className="w-5 h-5" />
      case 'sustainability':
        return <TrendingUp className="w-5 h-5" />
      case 'cost':
        return <TrendingUp className="w-5 h-5" />
      case 'safety':
        return <Shield className="w-5 h-5" />
      default:
        return <Lightbulb className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'design':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300'
      case 'efficiency':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-300'
      case 'sustainability':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300'
      case 'cost':
        return 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 dark:from-orange-900/30 dark:to-red-900/30 dark:text-orange-300'
      case 'safety':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900/30 dark:to-pink-900/30 dark:text-red-300'
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-900/30 dark:to-gray-800/30 dark:text-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900/30 dark:to-pink-900/30 dark:text-red-300'
      case 'medium':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-300'
      case 'low':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300'
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-900/30 dark:to-gray-800/30 dark:text-gray-300'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = []
    }
    acc[suggestion.category].push(suggestion)
    return acc
  }, {} as Record<string, Suggestion[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/results')}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Results</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                    AI Suggestions
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Smart Recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 px-4 py-2 rounded-full border border-yellow-200/50 dark:border-yellow-800/50">
              <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">AI-Powered Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Smart Recommendations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI has analyzed your project and generated personalized suggestions to improve design, 
              efficiency, and cost-effectiveness.
            </p>
          </div>

          {/* Suggestions by Category */}
          <div className="space-y-12">
            {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg">
                    <div className="text-gray-600 dark:text-gray-400">
                      {getCategoryIcon(category)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300 capitalize">
                      {category} Improvements
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {categorySuggestions.length} suggestions available
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {categorySuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg border-0">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl font-bold">{suggestion.title}</CardTitle>
                          <div className="flex space-x-2">
                            <Badge className={getCategoryColor(category)}>
                              {category}
                            </Badge>
                            <Badge className={getPriorityColor(suggestion.priority)}>
                              {suggestion.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {suggestion.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Impact:</span>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.impact}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                              <span className="text-sm font-bold text-red-600 dark:text-red-400">₹</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Cost:</span>
                              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                                {formatCurrency(suggestion.estimatedCost)}
                              </p>
                            </div>
                          </div>
                          
                          {suggestion.estimatedSavings && (
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">₹</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potential Savings:</span>
                                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                  {formatCurrency(suggestion.estimatedSavings)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-blue-200 dark:border-blue-800 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Implementation Summary</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Project Enhancement Plan
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {suggestions.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Suggestions
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(suggestions.reduce((sum, s) => sum + s.estimatedCost, 0))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Investment
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(suggestions.reduce((sum, s) => sum + (s.estimatedSavings || 0), 0))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Potential Savings
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => router.push('/results')}
                size="lg"
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Back to Results
              </Button>
              <Button 
                onClick={() => router.push('/upload')}
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start New Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 