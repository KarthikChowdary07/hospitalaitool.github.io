import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Menu, 
  User, 
  Bell, 
  Search,
  Settings
} from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg health-gradient flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">My Health Guardian</h1>
              <p className="text-xs text-muted-foreground">Your Digital Health Companion</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#documents" className="text-sm font-medium hover:text-primary transition-colors">
              Documents
            </a>
            <a href="#family" className="text-sm font-medium hover:text-primary transition-colors">
              Family
            </a>
            <a href="#insights" className="text-sm font-medium hover:text-primary transition-colors">
              Insights
            </a>
            <a href="#appointments" className="text-sm font-medium hover:text-primary transition-colors">
              Appointments
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Settings className="w-4 h-4" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;