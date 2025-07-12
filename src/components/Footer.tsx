"use client"
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Interior AI
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Smart Analysis
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Revolutionizing construction and interior design with AI-powered analysis and cost estimation.
            </p>
          </div>
          
          <div className="group">
            <h4 className="font-semibold mb-4 text-white group-hover:scale-105 transition-transform duration-300">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div className="group">
            <h4 className="font-semibold mb-4 text-white group-hover:scale-105 transition-transform duration-300">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div className="group">
            <h4 className="font-semibold mb-4 text-white group-hover:scale-105 transition-transform duration-300">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
            &copy; 2024 Interior AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="https://github.com/Pratham-Prog861" 
              target="_blank" 
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm"
            >
              <Github />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/pratham-darji-b704092a2/" 
              target="_blank" 
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm"
            >
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
