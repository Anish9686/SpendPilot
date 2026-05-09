import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingDown, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { runAuditEngine } from "@/lib/auditEngine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuditReportPage() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    // 1. Read data from localStorage
    const savedData = localStorage.getItem("spendpilot_audit_form");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // 2. Run the engine
        const result = runAuditEngine(parsedData);
        setReport(result);
      } catch (err) {
        console.error("Failed to parse audit data", err);
      }
    }
  }, []);

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-bold mb-4">No Audit Data Found</h2>
        <p className="text-slate-600 mb-6">Please complete the form first to see your report.</p>
        <Button asChild>
          <Link to="/audit">Go to Audit Form</Link>
        </Button>
      </div>
    );
  }

  const hasSavings = report.totalSavings > 0;

  return (
    <div className="py-12 md:py-20 px-4 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center justify-between">
        <div>
          <Link to="/audit" className="text-sm text-indigo-600 font-medium flex items-center hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Form
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Your AI Audit Report</h1>
          <p className="text-lg text-slate-600 mt-2">
            Based on your stack, here is our financial analysis and recommendations.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">Total Monthly Spend</CardDescription>
            <CardTitle className="text-4xl font-bold flex items-center">
              <DollarSign className="w-8 h-8 text-slate-400 mr-1" />
              {report.totalSpend.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Across all AI tools</p>
          </CardContent>
        </Card>

        <Card className={`border-slate-200 shadow-sm ${hasSavings ? "bg-emerald-50/50 border-emerald-100" : "bg-white"}`}>
          <CardHeader className="pb-2">
            <CardDescription className={`font-medium ${hasSavings ? "text-emerald-700" : ""}`}>
              Potential Monthly Savings
            </CardDescription>
            <CardTitle className={`text-4xl font-bold flex items-center ${hasSavings ? "text-emerald-600" : ""}`}>
              <DollarSign className={`w-8 h-8 mr-1 ${hasSavings ? "text-emerald-500" : "text-slate-400"}`} />
              {report.totalSavings.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm ${hasSavings ? "text-emerald-600" : "text-slate-500"}`}>
              {hasSavings ? "Money left on the table" : "You're fully optimized!"}
            </p>
          </CardContent>
        </Card>

        <Card className={`border-slate-200 shadow-sm ${hasSavings ? "bg-indigo-50/50 border-indigo-100" : "bg-white"}`}>
          <CardHeader className="pb-2">
            <CardDescription className={`font-medium ${hasSavings ? "text-indigo-700" : ""}`}>
              Projected Annual Savings
            </CardDescription>
            <CardTitle className={`text-4xl font-bold flex items-center ${hasSavings ? "text-indigo-600" : ""}`}>
              <TrendingDown className={`w-8 h-8 mr-2 ${hasSavings ? "text-indigo-500" : "text-slate-400"}`} />
              ${report.annualSavings.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm ${hasSavings ? "text-indigo-600" : "text-slate-500"}`}>
              If recommendations are applied today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Recommendations</h2>
        
        {report.recommendations.length > 0 ? (
          <div className="space-y-4">
            {report.recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row">
                  {/* Left Side: Summary block */}
                  <div className={`p-6 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 ${rec.savings > 0 ? "bg-amber-50/30" : "bg-slate-50"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {rec.savings > 0 ? (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                      <h3 className="font-semibold text-slate-900">{rec.tool}</h3>
                    </div>
                    <div className="text-sm text-slate-600 mb-4 space-y-1">
                      <div>Current Plan: <span className="font-medium text-slate-900">{rec.currentPlan}</span></div>
                      <div>Recommended Plan: <span className="font-medium text-slate-900">{rec.recommendedPlan}</span></div>
                    </div>
                    {rec.savings > 0 && (
                      <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 w-fit">
                        Save ${rec.savings}/mo
                      </div>
                    )}
                  </div>
                  
                  {/* Right Side: Reason block */}
                  <div className="p-6 md:w-2/3 bg-white flex flex-col justify-center">
                    <p className="text-slate-700 leading-relaxed">{rec.reason}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No optimizations needed. Your stack is lean!</p>
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 md:p-10 text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Want us to negotiate these rates?</h3>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
          We can automatically downgrade unused licenses and negotiate better volume pricing for your team.
        </p>
        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 text-lg">
          Talk to Sales
        </Button>
      </div>

      <div className="pt-8 mt-8 text-center border-t border-slate-200">
        <p className="text-sm text-slate-400">
          * Recommendations are based on estimated public pricing and common startup usage patterns. Actual savings may vary.
        </p>
      </div>

    </div>
  );
}
