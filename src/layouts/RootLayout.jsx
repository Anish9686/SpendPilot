import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">SpendPilot</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Platform</Link>
            <Link to="/audit" className="hover:text-indigo-600 transition-colors">Pricing Audit</Link>
            <a href="https://github.com/Anish9686/SpendPilot" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">Docs</a>
          </nav>

          <div className="flex items-center space-x-3 md:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600 hover:text-indigo-600" onClick={() => alert("Demo environment: Authentication is simulated.")}>
              Sign In
            </Button>
            <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 md:px-6 shadow-md shadow-indigo-100">
              <Link to="/audit">Start Audit</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-slate-900">SpendPilot</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
              <Link to="/" className="hover:text-slate-900">Privacy</Link>
              <Link to="/" className="hover:text-slate-900">Terms</Link>
              <Link to="/" className="hover:text-slate-900">Contact</Link>
            </nav>

            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} SpendPilot. Credex Internship Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
