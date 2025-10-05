import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ServiceDetail {
  title: string;
  steps: {
    step: number;
    title: string;
    description: string;
  }[];
  pricing?: string;
  benefits: string[];
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
    ]
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
