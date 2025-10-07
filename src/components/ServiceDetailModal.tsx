import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Zap, Battery, Home } from "lucide-react";
import SystemDiagram from "./SystemDiagram";

interface ServiceDetail {
  title: string;
  steps: {
    step: number;
    title: string;
    description: string;
  }[];
  pricing?: string;
  benefits: string[];
  hasSystemTypes?: boolean;
}

interface ServiceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: string;
}

const serviceDetails: Record<string, ServiceDetail> = {
  "solar-installation": {
    title: "Solar System Installation - Lagwaayein Aasani Se",
    steps: [
      {
        step: 1,
        title: "Site Survey - Free Visit",
        description: "Humare expert aapke ghar/office aayenge aur roof condition check karenge. Load calculation karenge (aapka monthly consumption dekh kar)."
      },
      {
        step: 2,
        title: "System Design - Perfect Planning",
        description: "Panel size select karenge (1kW se 15kW tak). On-Grid, Off-Grid ya Hybrid - aapki zarurat ke hisaab se recommend karenge."
      },
      {
        step: 3,
        title: "Government Approval - Subsidy Ka Process",
        description: "PM Surya Ghar Yojana mein registration karwayenge. Subsidy application complete karenge (₹45,000/kW tak mil sakta hai)."
      },
      {
        step: 4,
        title: "Installation - Professional Team (7-10 Din)",
        description: "High-quality mounting structure lagayenge. Branded inverters install karenge (Havells, Loom, Luminous). Complete wiring aur safety setup."
      },
      {
        step: 5,
        title: "Testing & Commissioning",
        description: "System ki complete testing karenge. Smart monitoring app setup karenge. Aapko training denge kaise use karna hai."
      },
      {
        step: 6,
        title: "Warranty & Support - Lifelong",
        description: "25-year panel warranty milegi. 5-year inverter warranty. 24×7 helpline support available."
      }
    ],
    pricing: "Starting ₹60,000 for 1kW system (Subsidy ke baad kam ho jayega)",
    benefits: [
      "90% tak bill mein saving",
      "25-year warranty with panels",
      "Free smart monitoring app",
      "Government subsidy assistance",
      "Professional installation team"
    ],
    hasSystemTypes: true
  },
  "subsidy-assistance": {
    title: "Solar Subsidy Assistance - Puri Madad Karenge Hum",
    steps: [
      {
        step: 1,
        title: "Document Collection",
        description: "Aadhar Card, Electricity Bill, Property Papers - sab documents collect karenge."
      },
      {
        step: 2,
        title: "Online Registration",
        description: "PM Surya Ghar portal par registration karwayenge. Form filling mein help karenge."
      },
      {
        step: 3,
        title: "Technical Details Submission",
        description: "Solar system ki technical details submit karenge. Feasibility report upload karenge."
      },
      {
        step: 4,
        title: "Approval Tracking",
        description: "Application ka status regular track karenge. Missing documents ki information denge."
      },
      {
        step: 5,
        title: "Subsidy Disbursement",
        description: "Approval ke baad subsidy amount direct aapke account mein aayega. Hum poori process monitor karenge."
      }
    ],
    pricing: "Service completely FREE with solar installation",
    benefits: [
      "Up to ₹45,000/kW subsidy",
      "100% paperwork support",
      "Regular application tracking",
      "Expert guidance at every step",
      "No hidden charges"
    ]
  },
  "site-inspection": {
    title: "Site Inspection & Load Assessment - FREE Visit",
    steps: [
      {
        step: 1,
        title: "Roof Analysis",
        description: "Roof ki condition check karenge - structural strength, shadow analysis, direction."
      },
      {
        step: 2,
        title: "Electricity Bill Analysis",
        description: "Last 6 months ke bill dekh kar consumption pattern samjhenge."
      },
      {
        step: 3,
        title: "Load Calculation",
        description: "Aapke appliances ki list banayenge. Daily/monthly load calculate karenge."
      },
      {
        step: 4,
        title: "System Size Recommendation",
        description: "Perfect system size recommend karenge (1kW to 15kW). On-Grid/Off-Grid suggestion denge."
      },
      {
        step: 5,
        title: "Detailed Report",
        description: "Complete written report denge - cost estimate, savings calculation, ROI timeline."
      }
    ],
    pricing: "Completely FREE - No charges",
    benefits: [
      "Expert roof analysis",
      "Accurate load calculation",
      "Written detailed report",
      "Cost & savings estimate",
      "No obligation to buy"
    ]
  },
  "maintenance": {
    title: "Maintenance & Support - AMC Available",
    steps: [
      {
        step: 1,
        title: "Regular Cleaning (Quarterly)",
        description: "Panel ki professional cleaning. Dust aur bird dropping removal. Performance restore karna."
      },
      {
        step: 2,
        title: "Performance Monitoring",
        description: "Generation data analysis. Efficiency check. Problem detection."
      },
      {
        step: 3,
        title: "Inverter Updates",
        description: "Software updates. Settings optimization. Error log check."
      },
      {
        step: 4,
        title: "Connection Check",
        description: "All wiring inspection. Loose connection tightening. Rust/corrosion prevention."
      },
      {
        step: 5,
        title: "Emergency Support",
        description: "24×7 helpline. Same-day visit for critical issues. Spare parts availability."
      }
    ],
    pricing: "AMC starting ₹3,000/year (per kW)",
    benefits: [
      "Regular cleaning service",
      "24×7 helpline support",
      "Priority service calls",
      "Free minor repairs",
      "Extended system life"
    ]
  },
  "custom-solutions": {
    title: "Customized Solar Solutions - Har Zarurat Ke Liye",
    steps: [
      {
        step: 1,
        title: "Requirement Analysis",
        description: "Aapki specific needs samjhenge - Residential, Commercial, Industrial, Agricultural."
      },
      {
        step: 2,
        title: "Custom Design",
        description: "Unique system design karenge. Battery backup integration. EV charging point setup."
      },
      {
        step: 3,
        title: "Component Selection",
        description: "Best suited panels choose karenge. Right inverter type. Battery capacity calculation."
      },
      {
        step: 4,
        title: "Implementation Plan",
        description: "Phased installation planning. Minimal business disruption. Timeline commitment."
      },
      {
        step: 5,
        title: "Post-Installation Support",
        description: "Training for your team. Remote monitoring setup. Maintenance schedule."
      }
    ],
    pricing: "Custom quote based on requirements",
    benefits: [
      "Tailored solutions",
      "Battery backup option",
      "EV charging integration",
      "Commercial scale projects",
      "Agricultural pump support"
    ]
  },
  "chakki": {
    title: "Atta Chakki Solutions - Shuru Karein Apna Business",
    steps: [
      {
        step: 1,
        title: "Business Consultation",
        description: "Aapke business plan discuss karenge. Market analysis. Location suitability check."
      },
      {
        step: 2,
        title: "Motor Selection",
        description: "Best quality motor select karenge - Havells, Loom Solar, Luminous. Capacity: 5HP to 20HP."
      },
      {
        step: 3,
        title: "Complete Setup",
        description: "Chakki machine installation. Motor mounting. Belt & pulley setup. Electrical connections."
      },
      {
        step: 4,
        title: "Testing & Training",
        description: "Complete testing of chakki. Operation training. Maintenance tips."
      },
      {
        step: 5,
        title: "After-Sales Support",
        description: "Warranty service. Spare parts availability. Technical support."
      }
    ],
    pricing: "Starting ₹80,000 for complete 10HP setup",
    benefits: [
      "High-quality motors",
      "Complete installation",
      "Operation training",
      "Low maintenance cost",
      "Business support guidance"
    ]
  }
};

const ServiceDetailModal = ({ open, onOpenChange, serviceType }: ServiceDetailModalProps) => {
  const service = serviceDetails[serviceType];

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.title}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* System Types Comparison - Only for Solar Installation */}
            {service.hasSystemTypes && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">🔌 Kaun Sa System Chunein?</h3>
                
                {/* On-Grid System */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Zap className="h-5 w-5 text-primary" />
                      On-Grid System (सबसे सस्ता)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-2"><strong>💡 Kya Hai:</strong> Seedha grid se juda hua, no battery</p>
                        <p className="text-sm mb-2"><strong>📍 Best For:</strong> Jin areas mein light 20+ hours aati ho</p>
                        <p className="text-sm mb-2"><strong>💰 Cost:</strong> Sabse sasta (₹60,000/kW se start)</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-green-600">✓ Net metering se extra units bech sakte hain</p>
                          <p className="text-sm text-green-600">✓ Minimal maintenance</p>
                          <p className="text-sm text-green-600">✓ Quick ROI (3-4 years)</p>
                          <p className="text-sm text-red-600">✗ Power cut mein solar bhi band ho jayega</p>
                          <p className="text-sm text-red-600">✗ Night time mein grid electricity use hogi</p>
                        </div>
                      </div>
                      <div>
                        <SystemDiagram type="on-grid" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Off-Grid System */}
                <Card className="border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Battery className="h-5 w-5 text-orange-600" />
                      Off-Grid System (पूर्ण स्वतंत्रता)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-2"><strong>💡 Kya Hai:</strong> Poori tarah independent, battery ke saath</p>
                        <p className="text-sm mb-2"><strong>📍 Best For:</strong> Remote areas, jahan power cut zyada hoti ho</p>
                        <p className="text-sm mb-2"><strong>💰 Cost:</strong> Battery ke saath (₹90,000/kW + battery ₹80,000)</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-green-600">✓ 24×7 guaranteed electricity</p>
                          <p className="text-sm text-green-600">✓ Grid failures se independent</p>
                          <p className="text-sm text-green-600">✓ Complete energy independence</p>
                          <p className="text-sm text-red-600">✗ High initial cost</p>
                          <p className="text-sm text-red-600">✗ Battery replacement har 5-7 saal mein</p>
                          <p className="text-sm text-red-600">✗ Maintenance cost zyada</p>
                        </div>
                      </div>
                      <div>
                        <SystemDiagram type="off-grid" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hybrid System */}
                <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="h-5 w-5 text-green-600" />
                      Hybrid System (सबसे अच्छा - Recommended ⭐)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-2"><strong>💡 Kya Hai:</strong> Grid + Battery dono ka fayda</p>
                        <p className="text-sm mb-2"><strong>📍 Best For:</strong> Commercial use, jahan power backup zaroori ho</p>
                        <p className="text-sm mb-2"><strong>💰 Cost:</strong> ₹75,000/kW + battery (₹60,000-₹80,000)</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-green-600">✓ Power cut mein battery backup</p>
                          <p className="text-sm text-green-600">✓ Grid available hone par export bhi kar sakte hain</p>
                          <p className="text-sm text-green-600">✓ Maximum savings with security</p>
                          <p className="text-sm text-green-600">✓ Smart switching between grid and battery</p>
                          <p className="text-sm text-orange-600">~ Most expensive option</p>
                          <p className="text-sm text-orange-600">~ Complex installation</p>
                        </div>
                      </div>
                      <div>
                        <SystemDiagram type="hybrid" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Table */}
                <Card className="bg-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">तुलना - Quick Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Feature</th>
                            <th className="text-center p-2">On-Grid</th>
                            <th className="text-center p-2">Off-Grid</th>
                            <th className="text-center p-2">Hybrid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Cost/kW</td>
                            <td className="text-center p-2 text-green-600">₹60,000</td>
                            <td className="text-center p-2 text-orange-600">₹90,000</td>
                            <td className="text-center p-2">₹75,000</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Battery Required</td>
                            <td className="text-center p-2">✗</td>
                            <td className="text-center p-2 text-green-600">✓</td>
                            <td className="text-center p-2 text-green-600">✓</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Power Backup</td>
                            <td className="text-center p-2">✗</td>
                            <td className="text-center p-2 text-green-600">✓</td>
                            <td className="text-center p-2 text-green-600">✓</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Net Metering</td>
                            <td className="text-center p-2 text-green-600">✓</td>
                            <td className="text-center p-2">✗</td>
                            <td className="text-center p-2 text-green-600">✓</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Best For</td>
                            <td className="text-center p-2">Stable Grid</td>
                            <td className="text-center p-2">Remote Areas</td>
                            <td className="text-center p-2">Critical Power</td>
                          </tr>
                          <tr>
                            <td className="p-2">ROI Period</td>
                            <td className="text-center p-2 text-green-600">3-4 years</td>
                            <td className="text-center p-2">5-7 years</td>
                            <td className="text-center p-2">4-6 years</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Steps */}
            <div className="space-y-4">
              {service.steps.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      {step.title}
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            {service.pricing && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-lg font-semibold text-primary">💰 {service.pricing}</p>
              </div>
            )}

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">🎁 Benefits:</h4>
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button className="flex-1" asChild>
            <a href="tel:9277302997">📞 Call Karein</a>
          </Button>
          <Button className="flex-1" variant="secondary" asChild>
            <a
              href={`https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20${service.title}%20ke%20baare%20mein%20jaankari%20chahiye`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Karein
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
