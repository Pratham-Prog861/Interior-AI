"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Upload, Zap, Star } from "lucide-react";
import Features from "./Features";
import HowItWorks from "./HowItWorks";

export default function Hero() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="container mx-auto px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Floating stars */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400/30 animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            <Star className="w-4 h-4" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-6 py-3 rounded-full border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform duration-300"
            style={{
              transform: mounted
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
                : undefined
            }}
          >
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI-Powered Analysis
            </span>
          </div>

          <h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{
              transform: mounted
                ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
                : undefined
            }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 animate-fade-in">
              Smart Construction &
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Interior Analysis
            </span>
          </h1>

          <p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            Upload your construction blueprint or room interior and get
            AI-powered estimates for materials, interior suggestions, and
            comprehensive cost analysis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            onClick={() => router.push("/upload")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <Upload className="w-5 h-5 mr-2 relative z-10" />
            Start Analysis
            <ArrowRight
              className={`w-5 h-5 ml-2 relative z-10 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 backdrop-blur-sm hover:scale-105"
            onClick={() => router.push("/upload")}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Try Demo
          </Button>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center group">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              99%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
              Accuracy
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
              5min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
              Analysis Time
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
              Available
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
