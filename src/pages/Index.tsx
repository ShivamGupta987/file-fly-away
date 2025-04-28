
import React, { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-16">
        <Hero onGetStarted={handleGetStarted} />
        <Features />
        
        {/* Pricing Section */}
        <section className="py-16 bg-gray-50" id="pricing">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No hidden fees, no surprises. Just straightforward file sharing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-500 mb-2">Free</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>10 uploads per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Files up to 100MB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Links expire after 7 days</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 border border-brand-600 text-brand-600 rounded-lg hover:bg-brand-50">
                  Get Started
                </button>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-brand-600 rounded-xl p-8 border border-brand-600 shadow-lg text-white relative transform scale-105 z-10">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-800 text-xs text-white px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-lg font-medium text-brand-100 mb-2">Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-brand-200">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-200 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Unlimited uploads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-200 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Files up to 5GB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-200 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Custom expiration dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-200 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Download tracking</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 bg-white text-brand-600 font-medium rounded-lg hover:bg-brand-50">
                  Get Started
                </button>
              </div>
              
              {/* Business Plan */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-500 mb-2">Business</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Unlimited uploads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Files up to 10GB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Advanced security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Team collaboration</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 border border-brand-600 text-brand-600 rounded-lg hover:bg-brand-50">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">FileFly</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Status</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">GDPR</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-center">© 2025 FileFly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
