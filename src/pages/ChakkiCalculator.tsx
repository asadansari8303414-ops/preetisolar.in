import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Cog, Zap, TrendingUp, Wrench } from "lucide-react";

const calculatorSchema = z.object({
  capacity: z.string().min(1, "Capacity select karein"),
  motorType: z.string().min(1, "Motor type select karein"),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const motorCompanies = [
  { name: "Kirloskar", category: "Premium", warranty: "3 years" },
  { name: "ABB", category: "Premium", warranty: "3 years" },
  { name: "Crompton", category: "Premium", warranty: "2 years" },
  { name: "Havells", category: "Mid-Range", warranty: "2 years" },
  { name: "V-Guard", category: "Mid-Range", warranty: "2 years" },
  { name: "Lakshmi", category: "Mid-Range", warranty: "18 months" },
  { name: "Local Motors", category: "Budget", warranty: "1 year" },
];

const installationProcess = [
  { step: 1, title: "Site Survey", desc: "Aapke location ka complete analysis" },
  { step: 2, title: "Motor Selection", desc: "Capacity ke basis par sahi motor" },
  { step: 3, title: "Installation", desc: "Professional setup aur wiring" },
  { step: 4, title: "Testing", desc: "Quality check aur performance test" },
  { step: 5, title: "Training", desc: "Operation aur maintenance training" },
];

const Calculator = () => {
  const [results, setResults] = useState<any>(null);

  const form = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      capacity: "",
      motorType: "",
    },
  });

  const onSubmit = (data: CalculatorForm) => {
    const capacityKW = parseInt(data.capacity);
    const baseCost = 350000;
    const perKWCost = 35000;
    const extraKW = capacityKW - 9;
    const totalCost = extraKW > 0 ? baseCost + (extraKW * perKWCost) : baseCost;

    // Output calculation (approx 100kg per hour for 9kW)
    const outputPerHour = Math.round((capacityKW / 9) * 100);
    
    // Electricity consumption (assuming 0.8 power factor)
    const electricityPerHour = capacityKW * 0.8;
    
    // ROI calculation (assuming ₹40/kg processing cost)
    const monthlyOutput = outputPerHour * 8 * 26; // 8 hours, 26 days
    const monthlyRevenue = monthlyOutput * 40;
    const monthlyProfit = monthlyRevenue - (electricityPerHour * 8 * 26 * 7); // ₹7/unit
    const roiMonths = Math.round(totalCost / monthlyProfit);

    setResults({
      totalCost,
      capacityKW,
      motorType: data.motorType,
      outputPerHour,
      monthlyOutput,
      monthlyRevenue,
      monthlyProfit,
      roiMonths,
      electricityPerHour,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Atta Chakki Calculator</h1>
          <p className="text-muted-foreground">
            Apne business ke liye sahi capacity aur motor select karein
          </p>
        </div>

        {/* Motor Companies Showcase */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="h-6 w-6 text-primary" />
              Available Motor Brands
            </CardTitle>
            <CardDescription>Hum sabhi premium aur trusted brands provide karte hain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-primary mb-2">Premium Motors</h3>
                <ul className="space-y-1 text-sm">
                  {motorCompanies.filter(m => m.category === "Premium").map(motor => (
                    <li key={motor.name} className="flex justify-between">
                      <span>{motor.name}</span>
                      <span className="text-muted-foreground">{motor.warranty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-secondary mb-2">Mid-Range Motors</h3>
                <ul className="space-y-1 text-sm">
                  {motorCompanies.filter(m => m.category === "Mid-Range").map(motor => (
                    <li key={motor.name} className="flex justify-between">
                      <span>{motor.name}</span>
                      <span className="text-muted-foreground">{motor.warranty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">Budget Motors</h3>
                <ul className="space-y-1 text-sm">
                  {motorCompanies.filter(m => m.category === "Budget").map(motor => (
                    <li key={motor.name} className="flex justify-between">
                      <span>{motor.name}</span>
                      <span className="text-muted-foreground">{motor.warranty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Apni Requirements Select Karein</CardTitle>
            <CardDescription>Capacity aur motor type choose karein</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chakki Capacity (kW)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Capacity select karein" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((kw) => (
                            <SelectItem key={kw} value={kw.toString()}>
                              {kw} kW Chakki
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motorType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motor Brand</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Motor brand select karein" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {motorCompanies.map((motor) => (
                            <SelectItem key={motor.name} value={motor.name}>
                              {motor.name} ({motor.category}) - {motor.warranty} warranty
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Calculate Karein
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Investment</p>
                    <p className="text-2xl font-bold text-primary">₹{results.totalCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="text-2xl font-bold">{results.capacityKW} kW</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Motor Brand</p>
                    <p className="text-xl font-semibold">{results.motorType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Output Capacity</p>
                    <p className="text-xl font-semibold">{results.outputPerHour} kg/hour</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-secondary" />
                  Business Projections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Output</p>
                    <p className="text-xl font-bold">{results.monthlyOutput.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue (approx)</p>
                    <p className="text-xl font-bold text-secondary">₹{results.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Profit (after electricity)</p>
                    <p className="text-xl font-bold text-secondary">₹{results.monthlyProfit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected ROI Period</p>
                    <p className="text-xl font-bold">{results.roiMonths} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Electricity Consumption</p>
                    <p className="text-xl font-semibold">{results.electricityPerHour.toFixed(1)} units/hour</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Note:</strong> Ye calculations approximate hain aur actual results aapke usage pattern
                    aur local market rates par depend karenge.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Finance Options */}
            <Card className="mb-8 border-secondary">
              <CardHeader>
                <CardTitle className="text-secondary">Financing Options Available</CardTitle>
                <CardDescription>Asan EMI par chakki purchase karein</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Surkama Finance</h3>
                    <p className="text-sm text-muted-foreground mb-2">Quick loan approval with minimal documentation</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:9277302997">Contact for Details</a>
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Meta Finance</h3>
                    <p className="text-sm text-muted-foreground mb-2">Flexible EMI options available</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:9277302997">Contact for Details</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Installation Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-primary" />
              Installation Process
            </CardTitle>
            <CardDescription>Hum kaise install karte hain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {installationProcess.map((process) => (
                <div key={process.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Start Your Business?</h3>
            <p className="mb-4">Humse contact karein aur apni chakki setup karein</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <a href="tel:9277302997">Call: 9277302997</a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a 
                  href="https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20chakki%20ke%20baare%20mein%20jaankari%20chahiye"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Karein
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
