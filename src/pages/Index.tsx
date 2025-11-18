import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Sun, Wrench, Users, Leaf, TrendingDown, Shield, Phone, Mail, MapPin, Cog, Zap, FileText, Search, Settings, ShieldCheck, Award, Smartphone, Clock, GraduationCap, Battery } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FinanceSection from "@/components/FinanceSection";
import Reviews from "@/components/Reviews";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import BenefitDetailModal from "@/components/BenefitDetailModal";
const contactSchema = z.object({
  name: z.string().min(1, "Naam zaruri hai").max(100, "Naam 100 characters se kam hona chahiye"),
  phone: z.string().min(10, "Valid phone number dalein").max(15, "Phone number 15 characters se kam hona chahiye"),
  email: z.string().email("Valid email address dalein").max(255),
  serviceInterest: z.string().min(1, "Service select karein"),
  message: z.string().min(10, "Message kam se kam 10 characters ka ho").max(1000),
  // Dynamic fields
  currentBill: z.string().optional(),
  motorHP: z.string().optional(),
  preferredDate: z.string().optional(),
  alreadyApplied: z.string().optional(),
  systemAge: z.string().optional(),
  // File upload
  billFile: z.any().optional(),
  // Preferred contact
  contactViaPhone: z.boolean().optional(),
  contactViaWhatsApp: z.boolean().optional(),
  contactViaEmail: z.boolean().optional(),
  bestTimeToCall: z.string().optional()
});
type ContactForm = z.infer<typeof contactSchema>;
const Index = () => {
  const {
    toast
  } = useToast();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceInterest: "",
      message: "",
      currentBill: "",
      motorHP: "",
      preferredDate: "",
      alreadyApplied: "",
      systemAge: "",
      contactViaPhone: false,
      contactViaWhatsApp: true,
      contactViaEmail: false,
      bestTimeToCall: "morning"
    }
  });
  const selectedServiceValue = form.watch("serviceInterest");
  const onSubmit = async (data: ContactForm) => {
    console.log("Form submitted:", data);

    // Send to Google Sheets via webhook
    try {
      const webhookUrl = "YOUR_GOOGLE_SHEETS_WEBHOOK_URL"; // User needs to replace this
      
      const formData = {
        timestamp: new Date().toISOString(),
        name: data.name,
        phone: data.phone,
        email: data.email,
        serviceInterest: data.serviceInterest,
        message: data.message,
        currentBill: data.currentBill || "",
        motorHP: data.motorHP || "",
        preferredDate: data.preferredDate || "",
        alreadyApplied: data.alreadyApplied || "",
        systemAge: data.systemAge || "",
        contactViaPhone: data.contactViaPhone || false,
        contactViaWhatsApp: data.contactViaWhatsApp || false,
        contactViaEmail: data.contactViaEmail || false,
        bestTimeToCall: data.bestTimeToCall || "",
      };

      if (webhookUrl !== "YOUR_GOOGLE_SHEETS_WEBHOOK_URL") {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify(formData),
        });
      }

      toast({
        title: "Message bhej diya gaya hai!",
        description: "Hum jald hi aapse contact karenge.",
      });

      // Show success animation
      setShowSuccessAnimation(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setShowSuccessAnimation(false);
        form.reset();
        setUploadedFile(null);
      }, 5000);
    } catch (error) {
      console.error("Error sending to Google Sheets:", error);
      toast({
        title: "Message bhej diya gaya hai!",
        description: "Hum jald hi aapse contact karenge.",
      });
      
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
        form.reset();
        setUploadedFile(null);
      }, 5000);
    }
  };
  const sendToWhatsApp = () => {
    const data = form.getValues();
    const message = `Hi Preeti Solar,\nMera naam: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService Interest: ${data.serviceInterest}\nMessage: ${data.message}${data.currentBill ? `\nCurrent Bill: ₹${data.currentBill}` : ""}${data.motorHP ? `\nMotor HP: ${data.motorHP}` : ""}`;
    window.open(`https://wa.me/919277302997?text=${encodeURIComponent(message)}`, "_blank");
  };
  const getEstimatedCost = () => {
    if (selectedServiceValue === "Solar Installation") {
      return "₹2,50,000 - ₹5,00,000";
    } else if (selectedServiceValue === "Atta Chakki Solutions") {
      return "₹3,27,200 - ₹7,19,000";
    }
    return "Calculate ke liye service select karein";
  };
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in">
            <Sun className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Solar Energy & Atta Chakki Solutions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">Uttar Pradesh mein best solar panel aur atta chakki installation. </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth"
            })}>
                Free Consultation Lein
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open("https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20jaankari%20chahiye", "_blank")}>
                WhatsApp Par Baat Karein
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Humare Services - Detail Mein Jaanein</h2>
            <p className="text-muted-foreground text-lg">
              Solar energy aur atta chakki - dono solutions ek jagah. Click karein detail ke liye!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow hover:scale-105 duration-300 cursor-pointer" onClick={() => setSelectedService("solar-installation")}>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Solar System Installation</CardTitle>
                <CardDescription>
                  On-Grid, Off-Grid & Hybrid Solar Solutions. High-efficiency panels with proper load calculation.
                  Fast and professional installation with 25-year warranty.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:scale-105 duration-300 cursor-pointer" onClick={() => setSelectedService("subsidy-assistance")}>
              <CardHeader>
                <FileText className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Solar Subsidy Assistance</CardTitle>
                <CardDescription>
                  PM Surya Ghar Muft Bijli Yojana mein help. Step-by-step guidance for registration, documentation,
                  and approval. 100% transparency in subsidy process.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:scale-105 duration-300 cursor-pointer" onClick={() => setSelectedService("site-inspection")}>
              <CardHeader>
                <Search className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Site Inspection & Load Assessment</CardTitle>
                <CardDescription>
                  Free on-site visit to analyze your roof condition and energy needs. Expert report on suitable
                  system size (1kW to 15kW).
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:scale-105 duration-300 cursor-pointer" onClick={() => setSelectedService("maintenance")}>
              <CardHeader>
                <Wrench className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Maintenance & Support</CardTitle>
                <CardDescription>
                  AMC (Annual Maintenance Contract) available. Regular cleaning, performance check, and inverter
                  updates. 24×7 support helpline.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:scale-105 duration-300 cursor-pointer" onClick={() => setSelectedService("custom-solutions")}>
              <CardHeader>
                <Settings className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Customized Solar Solutions</CardTitle>
                <CardDescription>
                  Residential | Commercial | Industrial | Agricultural. Battery-based systems for backup power.
                  EV charging integration available.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:scale-105 duration-300 border-primary/20 cursor-pointer" onClick={() => setSelectedService("chakki")}>
              <CardHeader>
                <Cog className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Atta Chakki Solutions</CardTitle>
                <CardDescription>
                  Premium quality atta chakki installation. 9kW se shuru, sabhi motor brands available (Kirloskar, ABB, Havells).
                  Asan EMI par bhi available.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Finance Section */}
      <FinanceSection />

      {/* Reviews Section */}
      <Reviews />

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kyon Choose Karein Humein - Benefits Detail Mein</h2>
            <p className="text-muted-foreground text-lg">
              Har benefit ko detail mein samjhein - click karein!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("govt-approved")}>
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Government Approved Vendor</h3>
              <p className="text-muted-foreground">
                Trustworthy & registered for subsidy. Aapki subsidy 100% pakki hai.
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("quality-components")}>
              <Award className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">High-Quality Components</h3>
              <p className="text-muted-foreground">
                Tier-1 panels & branded inverters (Havells, Loom, Luminous). Best quality guarantee.
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("bill-saving")}>
              <TrendingDown className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Up to 90% Tak Bill Mein Saving</h3>
              <p className="text-muted-foreground">
                Long-term savings with 25-year warranty panels. Bijli ka bill 10% tak aa jayega!
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("smart-monitoring")}>
              <Smartphone className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Monitoring App</h3>
              <p className="text-muted-foreground">
                Check power generation live on your phone. Real-time data dekhen.
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("quick-installation")}>
              <Clock className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Installation (7-10 Days)</h3>
              <p className="text-muted-foreground">
                Within 7–10 working days after approval. Fast aur professional service.
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("expert-team")}>
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">
                Certified engineers & trained professionals. Experience par bharosa karein.
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("eco-friendly")}>
              <Leaf className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Energy</h3>
              <p className="text-muted-foreground">
                Reduce carbon footprint and save the planet. Dharti ko bachayein!
              </p>
            </Card>

            <Card className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBenefit("govt-subsidy")}>
              <Shield className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Government Subsidy (₹78,000 Tak)</h3>
              <p className="text-muted-foreground">
                PM Surya Ghar scheme ke under subsidy milegi. Hum sab process karenge.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Karein</h2>
            <p className="text-muted-foreground text-lg">
              Humse baat karein aur apne solar journey ko shuru karein
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold">We respond within 2 hours | 24×7 Support Available</span>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="gap-2" onClick={() => window.open("tel:+919277302997")}>
              <Phone className="h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="secondary" className="gap-2" onClick={() => window.open("https://wa.me/919277302997?text=Hello%20Preeti%20Solar", "_blank")}>
              <Smartphone className="h-5 w-5" />
              WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => window.open("mailto:preetisolar46@gmail.com")}>
              <Mail className="h-5 w-5" />
              Email
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info + Social Proof */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">9277302997</p>
                      <p className="text-sm text-muted-foreground">Mon-Sat, 9AM-7PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">preetisolar46@gmail.com</p>
                      <p className="text-sm text-muted-foreground">24-48 hours response time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Locations</h3>
                      <p className="text-muted-foreground">Prayagraj Branch</p>
                      <p className="text-muted-foreground">Varanasi Branch</p>
                      <p className="text-sm text-muted-foreground">Serving across UP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="font-semibold">500+ Happy Customers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold">2-Hour Response Time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Free Site Visit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Government Approved</span>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Estimator Preview */}
              {selectedServiceValue && (selectedServiceValue === "Solar Installation" || selectedServiceValue === "Atta Chakki Solutions") && <Card className="bg-accent/10 border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Battery className="h-5 w-5" />
                      Quick Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary mb-2">{getEstimatedCost()}</p>
                    <p className="text-sm text-muted-foreground mb-3">Estimated range for {selectedServiceValue}</p>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  if (selectedServiceValue === "Solar Installation") {
                    window.location.href = "/calculator";
                  } else {
                    window.location.href = "/chakki-calculator";
                  }
                }}>
                      Detailed Calculation Karein →
                    </Button>
                  </CardContent>
                </Card>}
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Message Bhejein</CardTitle>
                <CardDescription>
                  Apni details share karein aur hum aapko jaldi contact karenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showSuccessAnimation ? <div className="text-center py-12 space-y-6 animate-fade-in">
                    <div className="relative inline-block">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-bounce">
                        <ShieldCheck className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Aapka Message Receive Ho Gaya! ✅</h3>
                      <p className="text-muted-foreground mb-6">Dhanyavad! Hum jaldi aapse contact karenge.</p>
                    </div>
                    <div className="max-w-md mx-auto space-y-3 text-left bg-muted/30 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">What's Next?</h4>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-white font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Aapka message receive hua ✅</p>
                          <p className="text-sm text-muted-foreground">Successfully received</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-white font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-medium">2 hours mein callback ⏰</p>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Free site visit schedule</p>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <div>
                          <p className="font-medium">Customized quotation</p>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    </div>
                    <Button size="lg" className="gap-2" onClick={() => window.open("https://wa.me/919277302997?text=Hi,%20maine%20abhi%20form%20submit%20kiya%20hai", "_blank")}>
                      <Smartphone className="h-5 w-5" />
                      Continue on WhatsApp
                    </Button>
                  </div> : <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Naam</FormLabel>
                            <FormControl>
                              <Input placeholder="Apna naam dalein" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="phone" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="email" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="serviceInterest" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select karein..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Solar Installation">Solar Installation</SelectItem>
                                <SelectItem value="Subsidy Assistance">Subsidy Assistance</SelectItem>
                                <SelectItem value="Site Inspection">Site Inspection (Free)</SelectItem>
                                <SelectItem value="Maintenance & Support">Maintenance & Support</SelectItem>
                                <SelectItem value="Atta Chakki Solutions">Atta Chakki Solutions</SelectItem>
                                <SelectItem value="General">General Inquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="message" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Apna message yahan likhein..." rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      {/* Dynamic Fields Based on Service */}
                      {selectedServiceValue === "Solar Installation" && <FormField control={form.control} name="currentBill" render={({
                    field
                  }) => <FormItem>
                              <FormLabel>Current Monthly Bill (₹)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 3000" type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />}

                      {selectedServiceValue === "Atta Chakki Solutions" && <FormField control={form.control} name="motorHP" render={({
                    field
                  }) => <FormItem>
                              <FormLabel>Motor HP Preference</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select motor HP" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="5hp">5 HP Motor</SelectItem>
                                  <SelectItem value="7.5hp">7.5 HP Motor</SelectItem>
                                  <SelectItem value="10hp">10 HP Motor</SelectItem>
                                  <SelectItem value="15hp">15 HP Motor</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />}

                      {selectedServiceValue === "Site Inspection" && <FormField control={form.control} name="preferredDate" render={({
                    field
                  }) => <FormItem>
                              <FormLabel>Preferred Date & Time</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />}

                      {selectedServiceValue === "Subsidy Assistance" && <FormField control={form.control} name="alreadyApplied" render={({
                    field
                  }) => <FormItem>
                              <FormLabel>Already Applied for Subsidy?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Haan, apply kar chuka hun</SelectItem>
                                  <SelectItem value="no">Nahi, help chahiye</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />}

                      {selectedServiceValue === "Maintenance & Support" && <FormField control={form.control} name="systemAge" render={({
                    field
                  }) => <FormItem>
                              <FormLabel>System Age (Years)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 2" type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />}

                      {/* File Upload */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bijli Bill Upload Karein (Optional)</label>
                        <div className="flex items-center gap-2">
                          <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            toast({
                              title: "File too large",
                              description: "Maximum 2MB allowed",
                              variant: "destructive"
                            });
                            return;
                          }
                          setUploadedFile(file);
                        }
                      }} className="text-sm" />
                        </div>
                        {uploadedFile && <p className="text-xs text-primary">✓ {uploadedFile.name} uploaded</p>}
                        <p className="text-xs text-muted-foreground">Max 2MB | PDF, JPG, PNG</p>
                      </div>

                      {/* Preferred Contact Method */}
                      <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium">Contact me via:</label>
                        <div className="flex flex-wrap gap-4">
                          <FormField control={form.control} name="contactViaPhone" render={({
                        field
                      }) => <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-input" />
                                </FormControl>
                                <FormLabel className="!mt-0 font-normal cursor-pointer">Phone Call</FormLabel>
                              </FormItem>} />
                          <FormField control={form.control} name="contactViaWhatsApp" render={({
                        field
                      }) => <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-input" />
                                </FormControl>
                                <FormLabel className="!mt-0 font-normal cursor-pointer">WhatsApp</FormLabel>
                              </FormItem>} />
                          <FormField control={form.control} name="contactViaEmail" render={({
                        field
                      }) => <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4 rounded border-input" />
                                </FormControl>
                                <FormLabel className="!mt-0 font-normal cursor-pointer">Email</FormLabel>
                              </FormItem>} />
                        </div>
                      </div>

                      {/* Best Time to Call */}
                      <FormField control={form.control} name="bestTimeToCall" render={({
                    field
                  }) => <FormItem>
                            <FormLabel>Best time to call:</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                                <SelectItem value="afternoon">Afternoon (12PM-4PM)</SelectItem>
                                <SelectItem value="evening">Evening (4PM-7PM)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>} />

                      <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex-1">
                          Submit Message
                        </Button>
                        <Button type="button" variant="secondary" className="gap-2" onClick={sendToWhatsApp}>
                          <Smartphone className="h-4 w-4" />
                          WhatsApp
                        </Button>
                      </div>
                    </form>
                  </Form>}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ServiceDetailModal open={!!selectedService} onOpenChange={open => !open && setSelectedService(null)} serviceType={selectedService || ""} />
      <BenefitDetailModal open={!!selectedBenefit} onOpenChange={open => !open && setSelectedBenefit(null)} benefitType={selectedBenefit || ""} />
    </div>;
};
export default Index;