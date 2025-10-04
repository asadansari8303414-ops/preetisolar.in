import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, CheckCircle } from "lucide-react";

const FinanceSection = () => {
  return (
    <section id="finance" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Financing Options</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Asan EMI par solar panels ya chakki installation karein. Hum aapko best loan options provide karte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Surkama Finance */}
          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-8 w-8 text-primary" />
                <CardTitle>Surkama Finance</CardTitle>
              </div>
              <CardDescription>Quick approval with minimal paperwork</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Fast loan processing - 24-48 hours</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Competitive interest rates</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Flexible tenure options</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <p className="text-sm">Minimal documentation required</p>
                </div>
              </div>
              <Button className="w-full" asChild>
                <a href="tel:9277302997">Contact for Details</a>
              </Button>
            </CardContent>
          </Card>

          {/* Meta Finance */}
          <Card className="border-secondary/20 hover:border-secondary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-8 w-8 text-secondary" />
                <CardTitle>Meta Finance</CardTitle>
              </div>
              <CardDescription>Flexible EMI plans tailored for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Customized loan packages</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Zero foreclosure charges</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">Up to 7 years tenure</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-sm">No hidden charges</p>
                </div>
              </div>
              <Button className="w-full" variant="secondary" asChild>
                <a href="tel:9277302997">Contact for Details</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* EMI Info Card */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Asan EMI Par Setup Karein</h3>
              <p className="text-muted-foreground mb-4">
                Solar panel ya chakki - dono ke liye finance available hai. Aaj hi apply karein!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:9277302997">📞 Call Now</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a 
                    href="https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20loan%20ke%20baare%20mein%20jaankari%20chahiye"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FinanceSection;
