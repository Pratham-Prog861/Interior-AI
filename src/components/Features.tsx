import { Calculator, Download, FileText, Palette } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

const Features = () => {
    const features = [
        {
          icon: <Calculator className="w-6 h-6" />,
          title: "Material Estimation",
          description: "Get detailed breakdown of construction materials with quantities and costs",
          gradient: "from-blue-500 to-cyan-500",
          bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
        },
        {
          icon: <Palette className="w-6 h-6" />,
          title: "Interior Planning",
          description: "Smart suggestions for furniture placement and interior design",
          gradient: "from-purple-500 to-pink-500",
          bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "Cost Analysis",
          description: "Comprehensive cost estimates for both construction and interior items",
          gradient: "from-green-500 to-emerald-500",
          bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
        },
        {
          icon: <Download className="w-6 h-6" />,
          title: "Export Reports",
          description: "Download detailed reports and estimates in PDF format",
          gradient: "from-orange-500 to-red-500",
          bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
        }
      ]
  return (
    <div id="features" className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="group text-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-y-12 border-0 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 shadow-xl backdrop-blur-sm relative overflow-hidden transform-gpu animate-fade-in"
            style={{
              animationDelay: `${index * 200}ms`,
              animation: 'fadeInUp 0.8s ease-out forwards'
            }}
          >
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
            
            <CardHeader className="relative z-10">
              <div 
                className={`mx-auto p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg hover:shadow-2xl`}
                style={{
                  boxShadow: `0 0 30px rgba(59, 130, 246, 0.3)`
                }}
              >
                <div className="text-white animate-pulse">
                  {feature.icon}
                </div>
              </div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300 group-hover:scale-105 transition-transform duration-300">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="absolute top-8 right-6 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce" style={{ animationDelay: '1s' }} />
            </div>
          </Card>
        ))}
        
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px) rotateX(10deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0deg);
            }
          }
          
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .rotate-y-12 {
            transform: rotateY(12deg);
          }
          
          .animate-fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
  )
}

export default Features