"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Loader2, 
  Brain, 
  BarChart3, 
  Calculator, 
  Palette,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { analyzeImage } from '@/lib/utils'

export default function ProcessingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [imageName, setImageName] = useState('')
  const [analysisType, setAnalysisType] = useState<'construction' | 'interior'>('construction')

  const steps = [
    {
      name: 'Image Processing',
      description: 'Analyzing image dimensions and quality',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Feature Detection',
      description: 'Identifying structural elements and features',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Material Estimation',
      description: 'Calculating material quantities and costs',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Interior Planning',
      description: 'Generating layout and design suggestions',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  useEffect(() => {
    // Get data from session storage
    const storedImageName = sessionStorage.getItem('imageName')
    const storedAnalysisType = sessionStorage.getItem('analysisType') as 'construction' | 'interior'
    
    if (storedImageName) setImageName(storedImageName)
    if (storedAnalysisType) setAnalysisType(storedAnalysisType)

    // Simulate processing steps
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Generate mock analysis results using the analyzeImage function
          const mockFile = new File([''], 'mock-image.jpg', { type: 'image/jpeg' })
          analyzeImage(mockFile, analysisType).then((results) => {
            sessionStorage.setItem('analysisResults', JSON.stringify(results))
            
            // Redirect to results page
            setTimeout(() => {
              router.push('/results')
            }, 1000)
          })
          
          return 100
        }
        
        const newProgress = prev + Math.random() * 15
        const step = Math.floor(newProgress / 25)
        setCurrentStep(Math.min(step, steps.length - 1))
        
        return Math.min(newProgress, 100)
      })
    }, 800)

    return () => clearInterval(interval)
  }, [router, analysisType, steps.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl border-0">
            <CardHeader className="pb-8">
              <div className="mx-auto p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl w-fit mb-6 shadow-xl">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                Analyzing Your {analysisType === 'construction' ? 'Blueprint' : 'Interior'}
              </CardTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                Our AI is processing your image and generating detailed analysis...
              </p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Step */}
              {currentStep < steps.length && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-br ${steps[currentStep].color} rounded-xl shadow-lg`}>
                      <div className="text-white">
                        {steps[currentStep].icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                        {steps[currentStep].name}
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200">
                        {steps[currentStep].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Completed Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      index < currentStep 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 shadow-lg' 
                        : 'bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <div className={`p-3 rounded-xl shadow-lg ${
                      index < currentStep 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <div className="text-gray-400 dark:text-gray-500">
                          {step.icon}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className={`font-semibold ${
                        index < currentStep 
                          ? 'text-green-900 dark:text-green-100' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {step.name}
                      </h4>
                      <p className={`text-sm ${
                        index < currentStep 
                          ? 'text-green-800 dark:text-green-200' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    {index < currentStep && (
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">Complete</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Image Info */}
              {imageName && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-950/20 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Processing: <span className="font-semibold text-gray-900 dark:text-gray-100">{imageName}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {analysisType === 'construction' ? 'Construction' : 'Interior'} Analysis
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 