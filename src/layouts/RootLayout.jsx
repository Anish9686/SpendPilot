import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">SpendPilot</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">Sign In</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Start Free Audit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-900">SpendPilot</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} SpendPilot. All rights reserved. Built for startup efficiency.
          </p>
        </div>
      </footer>
    </div>
  );
}
