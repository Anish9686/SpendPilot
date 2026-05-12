import { Link } from "react-router-dom";
import { ArrowLeft, Book, Shield, Cpu, Zap, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="py-12 md:py-20 px-4 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <Link to="/" className="text-sm text-indigo-600 font-medium flex items-center hover:underline transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Documentation</h1>
        <p className="text-xl text-slate-600">Understand the architecture and logic behind SpendPilot.</p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-600">
            <Shield className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-slate-900">The Audit Engine</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            SpendPilot uses a proprietary rule-based engine to identify savings. Unlike expensive LLM calls, 
            our logic is deterministic, instant, and highly accurate for financial benchmarking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <Card className="bg-slate-50 border-none shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Benchmark Audit</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Checks tool pricing against retail standards to identify overpayment or legacy billing tiers.
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-none shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Redundancy Sweep</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Detects overlapping capabilities across general-purpose LLMs like ChatGPT and Claude.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-600">
            <Database className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-slate-900">Data Persistence</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            We employ a hybrid persistence strategy to ensure your audit data is always available.
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="font-bold text-indigo-600">1. Supabase:</span> Primary database for global sharing and persistent report URLs.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="font-bold text-indigo-600">2. LocalStorage:</span> Fail-safe local cache ensuring audits work even during network interruptions.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-600">
            <Zap className="w-6 h-6" />
            <h2 className="text-2xl font-bold text-slate-900">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {["React 19", "Vite", "Tailwind CSS", "Supabase", "Lucide Icons", "shadcn/ui"].map(tech => (
              <span key={tech} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="pt-12 border-t border-slate-100">
        <p className="text-sm text-slate-400 text-center">
          &copy; {new Date().getFullYear()} SpendPilot Documentation. Built for the Credex Assignment.
        </p>
      </div>
    </div>
  );
}
