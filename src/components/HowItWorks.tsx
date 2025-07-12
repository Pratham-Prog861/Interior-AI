import { Brain, Target, Upload, Sparkles } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Image",
      description: "Upload your construction blueprint or room interior photo",
      icon: <Upload className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI analyzes the image and generates detailed estimates",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
    },
    {
      number: "03",
      title: "Get Results",
      description:
        "Receive comprehensive reports with materials, costs, and suggestions",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
    },
  ];
  
  return (
    <div id="how-it-works" className="mt-32 text-center relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="mb-16 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 mb-6">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Simple Process
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300 mb-4 animate-fade-in">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Simple three-step process to get your comprehensive analysis
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative z-10">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="relative group animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-y-6 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm relative overflow-hidden transform-gpu">
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute top-8 right-6 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce" style={{ animationDelay: '1s' }} />
              </div>

              {/* Improved number badge */}
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-gray-800">
                {step.number}
              </div>
              
              <div className="mb-6 relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg hover:shadow-2xl`}>
                  <div className="text-white animate-pulse">
                    {step.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10 group-hover:scale-105 transition-transform duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {step.description}
              </p>
            </div>

            {/* Improved connecting line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
