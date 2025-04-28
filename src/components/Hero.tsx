
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative gradient-bg py-20 md:py-32 px-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[5%] w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] -left-[5%] w-72 h-72 bg-blue-100/50 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Share files <span className="gradient-text">securely</span> and <span className="gradient-text">effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 md:pr-12">
              Upload your files and share them instantly with anyone. No size limits, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={onGetStarted} size="lg" className="bg-brand-600 hover:bg-brand-700 text-lg">
                Get Started for Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Learn More
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-sm text-gray-500">No credit card required • Free plan available</p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform md:rotate-1 md:scale-110">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                <div className="w-full h-40 bg-gradient-to-br from-brand-100 to-blue-50 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">presentation.pdf</h3>
                    <p className="text-sm text-gray-500">8.2 MB • Shared 2m ago</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">Copy Link</Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-100 rounded w-full animate-pulse-slow"></div>
                <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
