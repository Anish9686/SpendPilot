import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, Zap, TrendingDown, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 lg:py-32 flex flex-col items-center text-center px-4 relative overflow-hidden">
        {/* Subtle background gradient for modern SaaS look */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-indigo-50/50 to-white -z-10" />
        
        <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 text-sm text-indigo-600 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
          AI Spend Optimization Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6">
          Stop overpaying for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            AI tools your team doesn't use.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Instantly audit your company's AI stack (ChatGPT, Claude, Cursor, Copilot). Identify idle licenses, consolidate overlapping tools, and save thousands annually.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Input 
            placeholder="Enter your work email" 
            className="h-12 rounded-full border-slate-300 focus-visible:ring-indigo-600"
          />
          <Button className="h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 w-full sm:w-auto shrink-0">
            Start Audit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-slate-500 mt-4 flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" /> No credit card required. Free 14-day trial.
        </p>
      </section>

      {/* Features/Trust Section */}
      <section id="features" className="w-full py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How SpendPilot saves you money</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We connect to your existing tools and do the heavy lifting for you.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Instant AI Mapping</h3>
              <p className="text-slate-600">Automatically map every AI subscription across your entire organization in minutes.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                <TrendingDown className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">License Optimization</h3>
              <p className="text-slate-600">Identify overlapping capabilities (e.g. ChatGPT vs Claude), idle seats, and team tier upgrades.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Actionable Reports</h3>
              <p className="text-slate-600">Get a personalized AI-generated summary with exact next steps to cut your API and SaaS bill.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder Audit Form Section */}
      <section id="demo" className="w-full py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Try the Audit Engine</h2>
            <p className="text-slate-600">See how much you could save on your stack today.</p>
          </div>
          
          <Card className="shadow-xl border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl pb-6">
              <CardTitle>AI Spend Audit Form (Placeholder)</CardTitle>
              <CardDescription>
                We will build the actual dynamic form and AI logic here on Day 2.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tool Name</label>
                <Input placeholder="e.g. ChatGPT Plus, Claude Pro, Cursor" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Current Plan</label>
                  <Input placeholder="e.g. Team Tier" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Monthly Spend ($)</label>
                  <Input type="number" placeholder="600" />
                </div>
              </div>
              <Button className="w-full mt-4" size="lg">Run AI Audit</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-indigo-900 text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to optimize your AI stack?</h2>
          <p className="text-indigo-200 text-lg md:text-xl">Join hundreds of startups using SpendPilot to scale AI usage efficiently.</p>
          <Button className="bg-white text-indigo-900 hover:bg-slate-100 rounded-full px-8 h-14 text-lg font-medium mt-4 shadow-lg shadow-indigo-900/20">
            Start Free AI Audit
          </Button>
        </div>
      </section>
    </div>
  );
}
