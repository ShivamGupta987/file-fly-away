
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onToggleMode: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save user info in localStorage (in a real app, you'd use proper auth tokens)
      localStorage.setItem('filefly_user', JSON.stringify({
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name: mode === 'signup' ? name : email.split('@')[0]
      }));
      
      toast({
        title: mode === 'login' ? "Logged in successfully" : "Account created successfully",
        description: "Welcome to FileFly!",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
      onClose();
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-brand-600 hover:bg-brand-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-brand-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-brand-600 hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
