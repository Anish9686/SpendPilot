import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, ArrowRight, Loader2 } from "lucide-react";

import { auditSchema, defaultFormValues, defaultToolValues, AI_TOOLS, USE_CASES } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuditForm() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load from localStorage if available
  const savedData = localStorage.getItem("spendpilot_audit_form");
  const initialValues = savedData ? JSON.parse(savedData) : defaultFormValues;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(auditSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tools",
  });

  // Watch for changes and save to localStorage
  const formValues = watch();
  useEffect(() => {
    localStorage.setItem("spendpilot_audit_form", JSON.stringify(formValues));
  }, [formValues]);

  const onSubmit = (data) => {
    setIsAnalyzing(true);
    // Form values are already synced to localStorage by the watcher.
    setTimeout(() => {
      navigate("/report");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border-neutral-200 dark:border-neutral-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your AI Stack</CardTitle>
        <CardDescription>
          Tell us about the AI tools your team uses. We'll analyze your spend and find savings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                placeholder="e.g. 10"
                {...register("teamSize")}
                className={errors.teamSize ? "border-red-500" : ""}
              />
              {errors.teamSize && <p className="text-sm text-red-500">{errors.teamSize.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryUseCase">Primary Use Case</Label>
              <Controller
                control={control}
                name="primaryUseCase"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger className={errors.primaryUseCase ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {USE_CASES.map((uc) => (
                        <SelectItem key={uc.value} value={uc.value}>
                          {uc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.primaryUseCase && <p className="text-sm text-red-500">{errors.primaryUseCase.message}</p>}
            </div>
          </div>

          {/* Tools List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI Tools</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ ...defaultToolValues })}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Tool
              </Button>
            </div>

            {errors.tools && !Array.isArray(errors.tools) && (
              <p className="text-sm text-red-500">{errors.tools.message}</p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg relative bg-white dark:bg-neutral-950 shadow-sm transition-all"
                >
                  <div className="md:col-span-3 space-y-2">
                    <Label>Tool Name</Label>
                    <Controller
                      control={control}
                      name={`tools.${index}.name`}
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value || ""} defaultValue={value || ""}>
                          <SelectTrigger className={errors?.tools?.[index]?.name ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select tool" />
                          </SelectTrigger>
                          <SelectContent>
                            {AI_TOOLS.map((tool) => (
                              <SelectItem key={tool} value={tool}>
                                {tool}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors?.tools?.[index]?.name && (
                      <p className="text-xs text-red-500">{errors.tools[index].name.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <Label>Plan (e.g. Pro)</Label>
                    <Input
                      placeholder="e.g. Pro"
                      {...register(`tools.${index}.plan`)}
                      className={errors?.tools?.[index]?.plan ? "border-red-500" : ""}
                    />
                    {errors?.tools?.[index]?.plan && (
                      <p className="text-xs text-red-500">{errors.tools[index].plan.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label>Monthly Spend ($)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      {...register(`tools.${index}.spend`)}
                      className={errors?.tools?.[index]?.spend ? "border-red-500" : ""}
                    />
                    {errors?.tools?.[index]?.spend && (
                      <p className="text-xs text-red-500">{errors.tools[index].spend.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label>Seats</Label>
                    <Input
                      type="number"
                      placeholder="1"
                      {...register(`tools.${index}.seats`)}
                      className={errors?.tools?.[index]?.seats ? "border-red-500" : ""}
                    />
                    {errors?.tools?.[index]?.seats && (
                      <p className="text-xs text-red-500">{errors.tools[index].seats.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 flex justify-end pt-8">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <Button type="submit" size="lg" className="w-full md:w-auto font-medium" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Stack...
                </>
              ) : (
                <>
                  Analyze My Spend <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
