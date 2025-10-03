import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calculator as CalcIcon, IndianRupee, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const calculatorSchema = z.object({
  systemSize: z.string().min(1, "System size select karein"),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

// Uttar Pradesh subsidy details
const subsidyData: Record<string, { baseCost: number; subsidy: number; afterSubsidy: number }> = {
  "1": { baseCost: 65000, subsidy: 45000, afterSubsidy: 20000 },
  "2": { baseCost: 140000, subsidy: 90000, afterSubsidy: 50000 },
  "3": { baseCost: 210000, subsidy: 108000, afterSubsidy: 102000 },
  "4": { baseCost: 280000, subsidy: 108000, afterSubsidy: 172000 },
  "5": { baseCost: 350000, subsidy: 108000, afterSubsidy: 242000 },
  "6": { baseCost: 420000, subsidy: 108000, afterSubsidy: 312000 },
  "7": { baseCost: 490000, subsidy: 108000, afterSubsidy: 382000 },
  "8": { baseCost: 560000, subsidy: 108000, afterSubsidy: 452000 },
  "9": { baseCost: 630000, subsidy: 108000, afterSubsidy: 522000 },
  "10": { baseCost: 700000, subsidy: 108000, afterSubsidy: 592000 },
};

const Calculator = () => {
  const form = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      systemSize: "",
    },
  });

  const [results, setResults] = React.useState<{
    systemSize: number;
    baseCost: number;
    subsidy: number;
    afterSubsidy: number;
    monthlyGeneration: number;
    monthlySavings: number;
    yearlySavings: number;
    roi: number;
  } | null>(null);

  const onSubmit = (data: CalculatorForm) => {
    const systemSize = parseInt(data.systemSize);
    const details = subsidyData[data.systemSize];

    // 1kW generates approximately 120 units per month
    const monthlyGeneration = systemSize * 120;
    
    // Assuming ₹6 per unit rate
    const monthlySavings = monthlyGeneration * 6;
    const yearlySavings = monthlySavings * 12;
    
    // ROI calculation based on cost after subsidy
    const roi = details.afterSubsidy / yearlySavings;

    setResults({
      systemSize,
      baseCost: details.baseCost,
      subsidy: details.subsidy,
      afterSubsidy: details.afterSubsidy,
      monthlyGeneration,
      monthlySavings,
      yearlySavings,
      roi: Math.round(roi * 10) / 10,
    });

    toast.success("Calculator ready! Neeche results dekhen.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <CalcIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Solar Savings Calculator
            </h1>
            <p className="text-xl text-muted-foreground">
              Uttar Pradesh ke liye special subsidy calculator
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Apna System Size Select Karein</CardTitle>
              <CardDescription>
                UP Government subsidy ke saath calculate karein
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="systemSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Size (kW)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="System size select karein" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(subsidyData).map((size) => (
                              <SelectItem key={size} value={size}>
                                {size} kW
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    <CalcIcon className="mr-2 h-5 w-5" />
                    Calculate Karein
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {results && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">System Size</p>
                      <p className="text-2xl font-bold">{results.systemSize} kW</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Base Cost</p>
                      <p className="text-2xl font-bold">₹{results.baseCost.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Government Subsidy</p>
                      <p className="text-2xl font-bold text-green-600">₹{results.subsidy.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                    <p className="text-sm text-muted-foreground mb-1">Total Cost (Subsidy ke baad)</p>
                    <p className="text-3xl font-bold text-primary">₹{results.afterSubsidy.toLocaleString('en-IN')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Savings Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Generation</p>
                      <p className="text-2xl font-bold">{results.monthlyGeneration} units</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
                      <p className="text-2xl font-bold text-green-600">₹{results.monthlySavings.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Yearly Savings</p>
                      <p className="text-2xl font-bold text-green-600">₹{results.yearlySavings.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary">
                      <p className="text-sm text-muted-foreground mb-1">Return on Investment</p>
                      <p className="text-2xl font-bold">{results.roi} years</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <p className="font-semibold">25 Years Total Savings</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      ₹{(results.yearlySavings * 25).toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Solar panels ki average life 25+ saal hoti hai
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground text-center">
                    * Yeh estimates approximate hain. Actual savings location, usage, aur weather conditions par depend karti hai.
                    <br />
                    ** Subsidy rates Uttar Pradesh government ke current scheme ke according hain.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
