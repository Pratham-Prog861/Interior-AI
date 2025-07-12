"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/image-upload'
import { ArrowLeft, Building2, Home, Sparkles, Upload, CheckCircle } from 'lucide-react'

export default function UploadPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<'construction' | 'interior' | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedType) return

    setIsProcessing(true)
    
    // Store data in session storage for the results page
    sessionStorage.setItem('analysisType', selectedType)
    sessionStorage.setItem('imageName', selectedImage.name)
    
    // Simulate processing delay
    setTimeout(() => {
      router.push('/processing')
    }, 500)
  }

  const analysisTypes = [
    {
      type: 'construction' as const,
      title: 'Construction Analysis',
      description: 'Analyze construction blueprints for material estimates and structural requirements',
      icon: <Building2 className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        'Material quantity estimation',
        'Construction cost breakdown',
        'Structural requirements',
        'Foundation analysis'
      ]
    },
    {
      type: 'interior' as const,
      title: 'Interior Analysis',
      description: 'Analyze room interiors for furniture placement and design suggestions',
      icon: <Home className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      features: [
        'Furniture placement suggestions',
        'Interior design recommendations',
        'Space optimization',
        'Aesthetic improvements'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Upload & Analyze
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">AI-Powered Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Analysis Type Selection */}
          {!selectedType && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Choose Analysis Type</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  What would you like to analyze?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Select the type of analysis you want to perform on your image
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {analysisTypes.map((analysisType) => (
                  <Card 
                    key={analysisType.type}
                    className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-blue-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg"
                    onClick={() => setSelectedType(analysisType.type)}
                  >
                    <CardHeader className="text-center">
                      <div className={`mx-auto p-4 bg-gradient-to-br ${analysisType.gradient} rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <div className="text-white">
                          {analysisType.icon}
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold">{analysisType.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {analysisType.description}
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">What you'll get:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          {analysisType.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload */}
          {selectedType && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 px-4 py-2 rounded-full border border-green-200/50 dark:border-green-800/50">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {selectedType === 'construction' ? 'Construction' : 'Interior'} Analysis Selected
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  Upload Your {selectedType === 'construction' ? 'Blueprint' : 'Interior'} Image
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Upload a clear image of your {selectedType === 'construction' ? 'construction blueprint' : 'room interior'} 
                  for AI analysis
                </p>
              </div>

              <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border-0">
                <CardContent className="p-8">
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    selectedImage={selectedImage}
                    onRemoveImage={handleRemoveImage}
                    disabled={isProcessing}
                  />
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setSelectedType(null)}
                  disabled={isProcessing}
                  className="px-8 py-3 text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Back to Selection
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedImage || isProcessing}
                  className="flex-1 sm:flex-none px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isProcessing ? 'Processing...' : 'Start Analysis'}
                </Button>
              </div>

              {/* Tips */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
                        Tips for Best Results
                      </h3>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 dark:text-blue-400">•</span>
                          <span>Use high-resolution images for better accuracy</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 dark:text-blue-400">•</span>
                          <span>Ensure good lighting and clear visibility</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 dark:text-blue-400">•</span>
                          <span>Include all relevant details in the image</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 dark:text-blue-400">•</span>
                          <span>For blueprints, make sure measurements are visible</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 dark:text-blue-400">•</span>
                          <span>For interiors, capture the entire room space</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 