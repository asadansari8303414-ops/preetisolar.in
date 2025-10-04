import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sun, Wrench, Users, Leaf, TrendingDown, Shield, Phone, Mail, MapPin, Cog } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FinanceSection from "@/components/FinanceSection";
import Gallery from "@/components/Gallery";

const contactSchema = z.object({
  name: z.string().min(1, "Naam zaruri hai").max(100, "Naam 100 characters se kam hona chahiye"),
  phone: z.string().min(10, "Valid phone number dalein").max(15, "Phone number 15 characters se kam hona chahiye"),
  email: z.string().email("Valid email address dalein").max(255),
  message: z.string().min(10, "Message kam se kam 10 characters ka ho").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Index = () => {
  const { toast } = useToast();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Form submitted:", data);
    toast({
      title: "Message Received!",
      description: "Hum aapko jaldi contact karenge. Thank you!",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in">
            <Sun className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Solar Energy & Atta Chakki Solutions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Uttar Pradesh mein best solar panel aur atta chakki installation. Government subsidy ke saath bijli ke
              bill mein 80% tak ki saving karein!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Free Consultation Lein
              </Button>
              <Button
                size="lg"
                variant="outline"
onClick={() =>
                  window.open(
                    "https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20jaankari%20chahiye",
                    "_blank"
                  )
                }
              >
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Humare Services</h2>
            <p className="text-muted-foreground text-lg">
              Solar energy aur atta chakki - dono solutions ek jagah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sun className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Solar Panel Installation</CardTitle>
                <CardDescription>
                  High-quality solar panels ka installation certified technicians ke saath. 25 saal ki
                  warranty.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wrench className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Maintenance & Support</CardTitle>
                <CardDescription>
                  Regular maintenance aur 24/7 customer support. Aapke system ko hamesha best
                  condition mein rakhte hain.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Expert Consultation</CardTitle>
                <CardDescription>
                  Free consultation aur customized solutions. Government subsidy claim mein bhi help
                  karte hain.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader>
                <Cog className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Atta Chakki Solutions</CardTitle>
                <CardDescription>
                  Premium quality atta chakki installation. 9kW se shuru, sabhi motor brands available.
                  Asan EMI par bhi available.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Finance Section */}
      <FinanceSection />

      {/* Gallery Section */}
      <Gallery />

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solar Energy Ke Fayde</h2>
            <p className="text-muted-foreground text-lg">
              Kyon solar energy aapke liye best choice hai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingDown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">80% Tak Bill Mein Saving</h3>
              <p className="text-muted-foreground">
                Apne monthly electricity bill ko drastically reduce karein aur paise bachayein.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly & Clean</h3>
              <p className="text-muted-foreground">
                Environment ko bachayein aur carbon footprint ko reduce karein. Clean energy ka use
                karein.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Government Subsidy</h3>
              <p className="text-muted-foreground">
                UP government se subsidy benefit lein. 1KW par ₹45,000 tak ka subsidy available hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Karein</h2>
            <p className="text-muted-foreground text-lg">
              Humse baat karein aur apne solar journey ko shuru karein
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
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
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Message Bhejein</CardTitle>
                <CardDescription>
                  Apni details share karein aur hum aapko jaldi contact karenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Naam</FormLabel>
                          <FormControl>
                            <Input placeholder="Apna naam dalein" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Apna message yahan likhein..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Submit Karein
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
