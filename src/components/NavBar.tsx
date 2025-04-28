
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 bg-white/80 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="m9 15 3 3 3-3" />
            </svg>
          </span>
          <span className="font-bold text-xl text-gray-900">FileFly</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex gap-6">
              <li><a href="#features" className="text-gray-600 hover:text-brand-600">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-brand-600">Pricing</a></li>
              {user && (
                <li>
                  <Link to="/dashboard" className="text-gray-600 hover:text-brand-600">Dashboard</Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={openLoginModal}>Login</Button>
                <Button onClick={openSignupModal} className="bg-brand-600 hover:bg-brand-700">Sign Up</Button>
              </>
            )}
          </div>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-md p-4 z-50">
          <nav className="flex flex-col gap-4">
            <a href="#features" className="text-gray-600 py-2 px-4" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-gray-600 py-2 px-4" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            {user && (
              <Link to="/dashboard" className="text-gray-600 py-2 px-4" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            )}
            {user ? (
              <Button 
                variant="ghost" 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => { openLoginModal(); setIsMenuOpen(false); }} className="justify-start">Login</Button>
                <Button onClick={() => { openSignupModal(); setIsMenuOpen(false); }} className="bg-brand-600 hover:bg-brand-700 justify-start">Sign Up</Button>
              </>
            )}
          </nav>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        mode={authMode} 
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} 
      />
    </header>
  );
};
