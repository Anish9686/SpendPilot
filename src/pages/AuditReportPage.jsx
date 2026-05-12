import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingDown, DollarSign, CheckCircle2, Share2, FileX, ShieldCheck, Download, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuditReportPage() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocal, setIsLocal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      
      // 1. Try fetching from Supabase first (Truth)
      if (reportId) {
        try {
          const { data, error } = await supabase
            .from('reports')
            .select('report_data')
            .eq('id', reportId)
            .single();

          if (data && !error) {
            setReport(data.report_data);
            setIsLocal(false);
            setLoading(false);
            return;
          }
          if (error) throw error;
        } catch (err) {
          console.warn("Supabase fetch failed, trying localStorage...", err.message);
        }
      }

      // 2. Fallback to localStorage (Offline/Cache)
      const savedReportsStr = localStorage.getItem("spendpilot_reports");
      if (savedReportsStr) {
        try {
          const savedReports = JSON.parse(savedReportsStr);
          let activeId = reportId || localStorage.getItem("spendpilot_latest_report");
          
          if (activeId && savedReports[activeId]) {
            setReport(savedReports[activeId]);
            setIsLocal(true); // Indicate this is a local fallback
          }
        } catch (err) {
          console.error("Local storage parse error:", err);
        }
      }
      setLoading(false);
    }

    loadReport();
  }, [reportId]);

  const handleShare = async () => {
    const shareData = {
      title: 'SpendPilot AI Audit Report',
      text: `We found $${report?.annualSavings.toLocaleString()} in potential AI savings! Check out my SpendPilot report.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToCSV = () => {
    if (!report) return;
    const headers = ["Tool", "Current Plan", "Recommended Plan", "Monthly Savings", "Reason"];
    const rows = report.recommendations.map(r => [
      r.tool,
      r.currentPlan,
      r.recommendedPlan,
      `$${r.savings}`,
      `"${r.reason.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `SpendPilot_Audit_${report.id || "report"}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasSavings = report?.totalSavings > 0;
  const savingsRatio = (report?.totalSpend > 0) ? (report.totalSavings / report.totalSpend) : 0;
  const dynamicScore = Math.max(0, Math.min(100, Math.round(100 - (savingsRatio * 150))));
  const healthScore = (report?.totalSavings > 0) ? dynamicScore : 100;

  useEffect(() => {
    // Animate score on mount
    if (report) {
      const timer = setTimeout(() => {
        setAnimatedScore(healthScore);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [healthScore, report]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium">Fetching report from database...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
          <FileX className="w-12 h-12 text-slate-300" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Report Not Found</h2>
        <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
          The link you followed might be incorrect, or the report data was cleared from this device.
          {reportId && <span className="block mt-2 font-mono text-xs text-slate-400">ID: {reportId}</span>}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700">
            <Link to="/audit">Run New Audit</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-full px-8 text-slate-500 hover:text-slate-900">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 px-4 max-w-5xl mx-auto space-y-10 print:py-0 print:px-0 print:max-w-none">
      
      {/* Header */}
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-start justify-between print:mb-8 print:flex-row print:items-center">
        <div>
          <Link to="/audit" className="text-sm text-indigo-600 font-medium flex items-center hover:underline mb-4 transition-colors print:hidden">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Form
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Audit Results</h2>
            {isLocal && (
              <div className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                Local Version
              </div>
            )}
            {!isLocal && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 print:bg-white print:border print:border-emerald-200">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </span>
            )}
          </div>
          <p className="text-lg text-slate-600 max-w-2xl print:text-sm">
            Based on your stack, here is our financial analysis and recommendations. Pricing estimates are up to date as of May 2026.
          </p>
        </div>
        
        {report.id && (
          <div className="flex flex-wrap gap-2 print:hidden">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 rounded-full border-slate-200"
              onClick={exportToCSV}
            >
              <Download className="w-4 h-4 text-slate-500" /> Export CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 rounded-full border-slate-200"
              onClick={handleShare}
            >
              {copied ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Copied!</>
              ) : (
                <><Share2 className="w-4 h-4 text-slate-500" /> Share Report</>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 print:grid-cols-4 print:gap-4">
        <Card className="border-slate-200 shadow-sm bg-white print:shadow-none">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">Monthly Spend</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center print:text-xl">
              <DollarSign className="w-6 h-6 text-slate-400 mr-1" />
              {report.totalSpend.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Baseline</p>
          </CardContent>
        </Card>

        <Card className={`border-slate-200 shadow-sm ${hasSavings ? "bg-amber-50/50 border-amber-100" : "bg-emerald-50/50 border-emerald-100"} print:shadow-none print:bg-white`}>
          <CardHeader className="pb-2">
            <CardDescription className={`font-medium ${hasSavings ? "text-amber-700" : "text-emerald-700"}`}>
              Monthly Savings
            </CardDescription>
            <CardTitle className={`text-3xl font-bold flex items-center ${hasSavings ? "text-amber-600" : "text-emerald-600"} print:text-xl`}>
              <DollarSign className={`w-6 h-6 mr-1 ${hasSavings ? "text-amber-500" : "text-emerald-500"}`} />
              {report.totalSavings.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xs uppercase tracking-wider font-semibold ${hasSavings ? "text-amber-600" : "text-emerald-600"}`}>
              {hasSavings ? "Optimization Gap" : "Fully Optimized"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white print:shadow-none">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">Annual Savings</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center text-indigo-600 print:text-xl">
              <TrendingDown className="w-6 h-6 mr-2 text-indigo-500" />
              ${report.annualSavings.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold">12-Month Projection</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-slate-900 text-white print:bg-white print:text-slate-900 print:shadow-none print:border-slate-200">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-400 print:text-slate-500">Health Score</CardDescription>
            <CardTitle className="text-3xl font-bold print:text-xl">
              {animatedScore}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 print:bg-slate-100">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${animatedScore > 80 ? "bg-emerald-500" : animatedScore > 50 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${animatedScore}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Recommendations</h2>
        
        {report.recommendations.length > 0 ? (
          <div className="space-y-4">
            {report.recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden border-slate-200 shadow-sm print:break-inside-avoid">
                <div className="flex flex-col md:flex-row">
                  {/* Left Side: Summary block */}
                  <div className={`p-6 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 ${rec.savings > 0 ? "bg-amber-50/30" : "bg-slate-50"} print:bg-white`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {rec.tool.charAt(0)}
                      </div>
                      <h3 className="font-bold text-slate-900">{rec.tool}</h3>
                    </div>
                    <div className="text-sm text-slate-600 mb-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Current:</span>
                        <span className="font-medium text-slate-900">{rec.currentPlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target:</span>
                        <span className="font-medium text-indigo-600">{rec.recommendedPlan}</span>
                      </div>
                    </div>
                    {rec.savings > 0 && (
                      <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 w-fit print:bg-white print:border print:border-emerald-200">
                        Save ${rec.savings}/mo
                      </div>
                    )}
                  </div>
                  
                  {/* Right Side: Reason block */}
                  <div className="p-6 md:w-2/3 bg-white flex flex-col justify-center">
                    <p className="text-slate-700 leading-relaxed text-sm">{rec.reason}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No optimizations needed. Your stack is fully optimized!</p>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 md:p-10 text-center shadow-xl print:hidden">
        <h3 className="text-2xl font-bold mb-4">Want us to negotiate these rates?</h3>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
          We can automatically downgrade unused licenses and negotiate better volume pricing for your team.
        </p>
        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 text-lg">
          Talk to Sales
        </Button>
      </div>

      <div className="pt-8 mt-12 text-center border-t border-slate-200">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-sm text-slate-500 font-medium">
            SpendPilot Financial Integrity Disclaimer
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Recommendations are generated based on estimated public pricing data as of May 10, 2026. Actual savings may vary based on specific enterprise agreements, regional tax variations, and legacy billing cycles. This audit is for informational purposes and does not constitute formal financial advice.
          </p>
          <div className="flex justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> GDPR Compliant</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> No Data Sold</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SOC2 Simulation</span>
          </div>
        </div>
      </div>

    </div>
  );
}
