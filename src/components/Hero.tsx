"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calculator, 
  Palette, 
  FileText, 
  Download, 
  Sparkles,
  ArrowRight,
  Upload,
  Brain,
  Zap,
  Target
} from 'lucide-react'

export default function Hero() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Material Estimation",
      description: "Get detailed breakdown of construction materials with quantities and costs",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Interior Planning",
      description: "Smart suggestions for furniture placement and interior design",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Cost Analysis",
      description: "Comprehensive cost estimates for both construction and interior items",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Reports",
      description: "Download detailed reports and estimates in PDF format",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Upload Image",
      description: "Upload your construction blueprint or room interior photo",
      icon: <Upload className="w-8 h-8" />
    },
    {
      number: "02", 
      title: "AI Analysis",
      description: "Our AI analyzes the image and generates detailed estimates",
      icon: <Brain className="w-8 h-8" />
    },
    {
      number: "03",
      title: "Get Results", 
      description: "Receive comprehensive reports with materials, costs, and suggestions",
      icon: <Target className="w-8 h-8" />
    }
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI-Powered Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Smart Construction & 
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Interior Analysis
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload your construction blueprint or room interior and get AI-powered estimates for materials, 
            interior suggestions, and comprehensive cost analysis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => router.push('/upload')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Upload className="w-5 h-5 mr-2" />
            Start Analysis
            <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={() => router.push('/upload')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Try Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5min</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg">
            <CardHeader>
              <div className={`mx-auto p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="mt-32 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simple three-step process to get your comprehensive analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div className="text-blue-600 dark:text-blue-400">
                      {step.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}