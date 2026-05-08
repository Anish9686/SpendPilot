import AuditForm from "@/components/AuditForm";

export default function AuditPage() {
  return (
    <div className="py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Audit Your AI Spend
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Enter the tools your team uses below to generate your optimization report.
        </p>
      </div>
      <AuditForm />
    </div>
  );
}
