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
  motorHP: z.string().min(1, "Motor HP select karein"),
  solarOption: z.string().optional(), // For 10HP dual option
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

// Motor and Solar System Configuration
const motorConfigs = {
  "5": {
    hp: "5 HP",
    motorCost: 20000,
    solarKW: 9.6,
    solarCost: 307200,
    totalCost: 327200,
    outputPerHour: 60, // kg/hour
    warranty: {
      motor: "2 years",
      solar: "25 years panel, 5 years inverter"
    }
  },
  "7.5": {
    hp: "7.5 HP",
    motorCost: 30000,
    solarKW: 9.6,
    solarCost: 307200,
    totalCost: 337200,
    outputPerHour: 75,
    warranty: {
      motor: "2 years",
      solar: "25 years panel, 5 years inverter"
    }
  },
  "10": {
    hp: "10 HP",
    motorCost: 40000,
    options: {
      "16.8": {
        solarKW: 16.8,
        solarCost: 487200,
        totalCost: 527200
      },
      "15.4": {
        solarKW: 15.4,
        solarCost: 462000,
        totalCost: 502000
      }
    },
    outputPerHour: 100,
    warranty: {
      motor: "2 years",
      solar: "25 years panel, 5 years inverter"
    }
  },
  "15": {
    hp: "15 HP",
    motorCost: 52000,
    solarKW: 23,
    solarCost: 667000,
    totalCost: 719000,
    outputPerHour: 150,
    warranty: {
      motor: "2 years",
      solar: "25 years panel, 5 years inverter"
    }
  }
};

const motorCompanies = [
  { name: "Kirloskar", category: "Premium", warranty: "5 years" },
  { name: "ABB", category: "Premium", warranty: "5 years" },
  { name: "Crompton", category: "Premium", warranty: "5 years" },
  { name: "Havells", category: "Mid-Range", warranty: "5 years" },
  { name: "V-Guard", category: "Mid-Range", warranty: "5 years" },
  { name: "Lakshmi", category: "Mid-Range", warranty: "5 years" },
  { name: "Local Motors", category: "Budget", warranty: "5 years" },
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
  const [selectedHP, setSelectedHP] = useState<string>("");
  const [showSolarOption, setShowSolarOption] = useState(false);

  const form = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      motorHP: "",
      solarOption: "",
    },
  });

  const watchMotorHP = form.watch("motorHP");

  const onSubmit = (data: CalculatorForm) => {
    let solarKW, solarCost, totalCost, motorCost, outputPerHour, warranty;
    
    if (data.motorHP === "10") {
      // 10HP has two options
      if (!data.solarOption) {
        form.setError("solarOption", { message: "Solar system option select karein" });
        return;
      }
      const config10 = motorConfigs["10"];
      const option = config10.options[data.solarOption as keyof typeof config10.options];
      solarKW = option.solarKW;
      solarCost = option.solarCost;
      totalCost = option.totalCost;
      motorCost = config10.motorCost;
      outputPerHour = config10.outputPerHour;
      warranty = config10.warranty;
    } else {
      const config = motorConfigs[data.motorHP as keyof typeof motorConfigs];
      if ('options' in config) {
        // This shouldn't happen, but TypeScript needs this
        return;
      }
      solarKW = config.solarKW;
      solarCost = config.solarCost;
      totalCost = config.totalCost;
      motorCost = config.motorCost;
      outputPerHour = config.outputPerHour;
      warranty = config.warranty;
    }

    const motorHP = motorConfigs[data.motorHP as keyof typeof motorConfigs].hp;
    
    // Solar units generated per day (assuming 5 peak sun hours)
    const solarUnitsPerDay = solarKW * 5;
    const solarUnitsPerMonth = solarUnitsPerDay * 30;
    
    // Electricity cost savings (₹7/unit)
    const monthlySolarSavings = solarUnitsPerMonth * 7;
    
    // Business calculations (₹40/kg processing cost)
    const monthlyOutput = outputPerHour * 8 * 26; // 8 hours, 26 days
    const monthlyRevenue = monthlyOutput * 40;
    
    // Net monthly profit (revenue - minimal grid electricity)
    const monthlyProfit = monthlyRevenue + monthlySolarSavings - 2000; // ₹2000 misc expenses
    
    // ROI calculation
    const roiMonths = Math.round(totalCost / monthlyProfit);

    setResults({
      motorHP,
      motorCost,
      solarKW,
      solarCost,
      totalCost,
      outputPerHour,
      monthlyOutput,
      monthlyRevenue,
      monthlySolarSavings,
      monthlyProfit,
      roiMonths,
      solarUnitsPerMonth,
      warranty,
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
            <CardTitle>Apni Motor HP Select Karein</CardTitle>
            <CardDescription>Motor HP ke basis par automatic solar system calculate hoga</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="motorHP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motor HP Capacity</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedHP(value);
                          setShowSolarOption(value === "10");
                          if (value !== "10") {
                            form.setValue("solarOption", "");
                          }
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Motor HP select karein" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5">5 HP Motor (9.6 kW Solar)</SelectItem>
                          <SelectItem value="7.5">7.5 HP Motor (9.6 kW Solar)</SelectItem>
                          <SelectItem value="10">10 HP Motor (16.8 kW ya 15.4 kW Solar)</SelectItem>
                          <SelectItem value="15">15 HP Motor (23 kW Solar)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchMotorHP === "10" && (
                  <FormField
                    control={form.control}
                    name="solarOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solar System Option (10 HP ke liye)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Solar option select karein" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="16.8">16.8 kW Solar - ₹5,27,200 Total</SelectItem>
                            <SelectItem value="15.4">15.4 kW Solar - ₹5,02,000 Total</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> Saare motor brands (Kirloskar, ABB, Crompton, Havells, V-Guard, Lakshmi, Local) 
                    ka same rate hai. Solar system automatically calculate hoga.
                  </p>
                </div>

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
                  Complete Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Motor Capacity</p>
                    <p className="text-2xl font-bold text-primary">{results.motorHP}</p>
                    <p className="text-xs text-muted-foreground mt-1">Motor Cost: ₹{results.motorCost.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Solar System</p>
                    <p className="text-2xl font-bold text-secondary">{results.solarKW} kW</p>
                    <p className="text-xs text-muted-foreground mt-1">Solar Cost: ₹{results.solarCost.toLocaleString()}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2 p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border-2 border-primary">
                    <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                    <p className="text-4xl font-bold text-primary">₹{results.totalCost.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Motor (₹{results.motorCost.toLocaleString()}) + Solar System (₹{results.solarCost.toLocaleString()})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Output Capacity</p>
                    <p className="text-xl font-semibold">{results.outputPerHour} kg/hour</p>
                    <p className="text-xs text-muted-foreground mt-1">Professional grade motor</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Solar Generation</p>
                    <p className="text-xl font-semibold">{results.solarUnitsPerMonth} units/month</p>
                    <p className="text-xs text-muted-foreground mt-1">5 peak sun hours basis</p>
                  </div>
                </div>

                {/* Warranty Information */}
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Warranty Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Motor Warranty:</span> {results.warranty.motor}
                    </div>
                    <div>
                      <span className="font-medium">Solar Warranty:</span> {results.warranty.solar}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    ✓ Free installation & commissioning
                    <br />
                    ✓ 24×7 technical support
                    <br />
                    ✓ On-site service available
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-secondary" />
                  Business Projections & ROI
                </CardTitle>
                <CardDescription>Aapki monthly earnings aur ROI calculation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Output</p>
                    <p className="text-xl font-bold">{results.monthlyOutput.toLocaleString()} kg</p>
                    <p className="text-xs text-muted-foreground">8 hours × 26 days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-xl font-bold text-secondary">₹{results.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">@ ₹40/kg processing</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Solar Savings</p>
                    <p className="text-xl font-bold text-green-600">₹{results.monthlySolarSavings.toLocaleString()}/month</p>
                    <p className="text-xs text-muted-foreground">Zero electricity bill!</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Monthly Profit</p>
                    <p className="text-xl font-bold text-secondary">₹{results.monthlyProfit.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">After all expenses</p>
                  </div>
                  <div className="col-span-1 md:col-span-2 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-muted-foreground mb-1">Investment Recovery (ROI)</p>
                    <p className="text-3xl font-bold text-green-600">{results.roiMonths} Months</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Uske baad pure 23+ saal FREE electricity aur continuous income! 🎉
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Real Benefit:</strong> Solar system lagane se aap electricity bill se completely free ho jayenge. 
                    Pure 25 saal tak FREE electricity aur chakki se consistent income!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Finance Options */}
            <Card className="mb-8 border-secondary">
              <CardHeader>
                <CardTitle className="text-secondary">Financing Options Available</CardTitle>
                <CardDescription>Asan EMI par chakki + solar purchase karein</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">Svakarma Finance</h3>
                    <p className="text-sm text-muted-foreground mb-2">Quick loan approval with minimal documentation</p>
                    <ul className="text-xs text-muted-foreground mb-3 space-y-1">
                      <li>✓ Low interest rates</li>
                      <li>✓ Flexible tenure options</li>
                      <li>✓ Quick approval process</li>
                    </ul>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:9277302997">Contact for Details</a>
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">Meta Finance</h3>
                    <p className="text-sm text-muted-foreground mb-2">Flexible EMI options available</p>
                    <ul className="text-xs text-muted-foreground mb-3 space-y-1">
                      <li>✓ Easy documentation</li>
                      <li>✓ Competitive rates</li>
                      <li>✓ Customer-friendly terms</li>
                    </ul>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:9277302997">Contact for Details</a>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm">
                    <strong>EMI Example:</strong> ₹3.5 lakh ka system sirf ₹12,000-15,000/month EMI mein! 
                    Aur aapki monthly income ₹40,000+ hogi. Clear profit from day 1! 💰
                  </p>
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
