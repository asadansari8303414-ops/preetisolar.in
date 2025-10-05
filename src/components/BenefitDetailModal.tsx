import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingDown, DollarSign, Target } from "lucide-react";

interface BenefitDetail {
  title: string;
  icon: string;
  sections: {
    title: string;
    content: string;
  }[];
  example?: {
    title: string;
    details: string[];
  };
  cta: string;
}

interface BenefitDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  benefitType: string;
}

const benefitDetails: Record<string, BenefitDetail> = {
  "bill-saving": {
    title: "Solar Se Bill Mein 90% Tak Saving Kaise?",
    icon: "💡",
    sections: [
      {
        title: "🔹 Step 1: Current Bill Analysis",
        content: "Maan lijiye aapka monthly bill: ₹5,000\nYearly cost: ₹60,000\n25-year cost WITHOUT solar: ₹15,00,000 (bill increase bhi hogi)"
      },
      {
        title: "🔹 Step 2: Solar System Investment",
        content: "5kW system cost: ₹3,00,000\nGovernment subsidy: ₹45,000\nFinal cost: ₹2,55,000"
      },
      {
        title: "🔹 Step 3: Monthly Savings",
        content: "Solar generated: 600-650 units/month\nBill reduction: ₹4,500 (90%)\nNew bill: Sirf ₹500"
      },
      {
        title: "🔹 Step 4: Return on Investment (ROI)",
        content: "Investment recovery: 4-5 years\nRemaining 20 years: ALMOST FREE ELECTRICITY\nTotal 25-year savings: ₹12,45,000+"
      },
      {
        title: "🔹 Step 5: Additional Benefits",
        content: "✓ Property value increase\n✓ Eco-friendly image\n✓ Zero maintenance cost (almost)\n✓ Protection from rising electricity costs"
      }
    ],
    example: {
      title: "📈 Real Customer Example:",
      details: [
        "Prayagraj mein Sharma ji ne 5kW lagaya",
        "Pehle bill: ₹4,800/month",
        "Ab bill: ₹450/month",
        "Monthly saving: ₹4,350",
        "Yearly saving: ₹52,200!"
      ]
    },
    cta: "📞 Call us for FREE calculation based on YOUR bill!"
  },
  "govt-approved": {
    title: "Government Approved Vendor - Kyon Zaruri Hai?",
    icon: "✅",
    sections: [
      {
        title: "🔹 Subsidy Ka Guarantee",
        content: "Sirf approved vendors ke saath lagane par hi subsidy milti hai. Hum registered hain PM Surya Ghar Yojana ke under, toh aapki subsidy pakki hai."
      },
      {
        title: "🔹 Quality Standards",
        content: "Government approved hone ke liye quality standards follow karna padta hai:\n✓ BIS certified components\n✓ Trained technicians\n✓ Proper safety measures\n✓ Warranty compliance"
      },
      {
        title: "🔹 Documentation Support",
        content: "Subsidy ke liye sahi documents aur certificates zaruri hain:\n✓ Vendor registration certificate\n✓ Component test reports\n✓ Installation certificates\n✓ Commissioning reports"
      },
      {
        title: "🔹 Legal Protection",
        content: "Approved vendor ke saath aapko legal protection milti hai:\n✓ Registered company\n✓ GST compliant\n✓ Proper billing\n✓ Warranty validity"
      }
    ],
    cta: "Trust & Transparency ke saath kaam karte hain hum!"
  },
  "quality-components": {
    title: "High-Quality Components - Best Brands Only",
    icon: "⭐",
    sections: [
      {
        title: "🔹 Solar Panels - Tier 1",
        content: "✓ Monocrystalline / Polycrystalline\n✓ 20-22% efficiency\n✓ 25-year performance warranty\n✓ Weather resistant\n✓ Anti-reflective coating"
      },
      {
        title: "🔹 Inverters - Top Brands",
        content: "Havells:\n- Indian brand, trusted name\n- 5-year warranty\n- Smart monitoring\n\nLoom Solar:\n- Made for Indian conditions\n- High efficiency\n- WiFi monitoring\n\nLuminous:\n- 30+ years experience\n- Wide service network\n- Durable & reliable"
      },
      {
        title: "🔹 Mounting Structure",
        content: "✓ Hot-dip galvanized steel\n✓ Rust-proof coating\n✓ Wind & rain resistant\n✓ 25-year structural warranty\n✓ Professional installation"
      },
      {
        title: "🔹 Other Components",
        content: "Cables: UV resistant, ISI marked\nMCB/Breakers: Branded, safety certified\nJunction Boxes: Weatherproof, IP65 rated\nEarthing: Proper lightning protection"
      }
    ],
    example: {
      title: "💪 Quality = Long Life:",
      details: [
        "Good components = 25+ years life",
        "Cheap components = 5-10 years only",
        "Our systems still generating 90%+ after 10 years",
        "Customer complaints: Minimal"
      ]
    },
    cta: "Quality par compromise nahi karte hum!"
  },
  "smart-monitoring": {
    title: "Smart Monitoring App - Live Tracking",
    icon: "📱",
    sections: [
      {
        title: "🔹 Real-Time Data",
        content: "App mein dekhen:\n✓ Current power generation (kW)\n✓ Today's production (units)\n✓ Monthly & yearly stats\n✓ System efficiency (%)\n✓ CO₂ saved"
      },
      {
        title: "🔹 Performance Alerts",
        content: "Automatic notifications:\n✓ Low generation warning\n✓ System offline alert\n✓ Maintenance reminder\n✓ Weather impact info"
      },
      {
        title: "🔹 Bill Savings Track",
        content: "Dekhen kitna save ho raha hai:\n✓ Monthly savings (₹)\n✓ Total savings till date\n✓ ROI progress\n✓ Bill comparison graph"
      },
      {
        title: "🔹 Easy Access",
        content: "✓ Android & iOS app\n✓ Web portal bhi available\n✓ Family members ko bhi access de sakte hain\n✓ Historical data download"
      }
    ],
    cta: "Apni solar ki performance dekhen live!"
  },
  "quick-installation": {
    title: "Quick Installation - Sirf 7-10 Din Mein",
    icon: "⚡",
    sections: [
      {
        title: "🔹 Day 1-2: Site Preparation",
        content: "✓ Roof cleaning\n✓ Marking & measurements\n✓ Material delivery\n✓ Safety setup"
      },
      {
        title: "🔹 Day 3-5: Structure Installation",
        content: "✓ Mounting structure fitting\n✓ Panel installation\n✓ Wiring work\n✓ Inverter mounting"
      },
      {
        title: "🔹 Day 6-7: Electrical Work",
        content: "✓ DC/AC connections\n✓ Earthing & lightning protection\n✓ MCB/breaker installation\n✓ Meter connection"
      },
      {
        title: "🔹 Day 8-10: Testing & Handover",
        content: "✓ System testing\n✓ App setup & training\n✓ Documentation handover\n✓ Final cleanup"
      }
    ],
    example: {
      title: "⏱️ Why So Fast?",
      details: [
        "Experienced team of 5-6 technicians",
        "Pre-planned execution",
        "All materials ready beforehand",
        "Minimal disruption to your routine",
        "Weather backup plan ready"
      ]
    },
    cta: "Registration se generation - sab jaldi ho jayega!"
  },
  "expert-team": {
    title: "Expert Team - Certified Professionals",
    icon: "👨‍🔧",
    sections: [
      {
        title: "🔹 Qualified Engineers",
        content: "✓ Electrical engineering graduates\n✓ 5-10 years experience\n✓ Government certified\n✓ Regular training programs"
      },
      {
        title: "🔹 Skilled Technicians",
        content: "✓ ITI/Diploma certified\n✓ Solar installation experts\n✓ Safety trained\n✓ Customer-friendly approach"
      },
      {
        title: "🔹 Support Staff",
        content: "✓ 24×7 helpline team\n✓ Hindi/English support\n✓ Technical troubleshooting\n✓ Remote monitoring experts"
      },
      {
        title: "🔹 Quality Commitment",
        content: "✓ No subcontracting - our own team\n✓ Uniform & ID cards\n✓ Tools & safety equipment\n✓ Insurance coverage"
      }
    ],
    cta: "Experience aur expertise ka perfect combination!"
  },
  "eco-friendly": {
    title: "Eco-Friendly Energy - Dharti Ko Bachayein",
    icon: "🌱",
    sections: [
      {
        title: "🔹 Carbon Footprint Reduction",
        content: "1kW solar system = 1.5 tons CO₂ saved/year\n5kW system = 7.5 tons CO₂ saved/year\n25 years mein = 187 tons CO₂ saved!\n\nYeh equal hai:\n- 8,700 trees plant karne ke\n- 85,000 km car driving bachane ke"
      },
      {
        title: "🔹 Air Quality Improvement",
        content: "Coal-based electricity se hota hai:\n✓ SO₂ emission - acid rain\n✓ NO₂ pollution - breathing issues\n✓ Particulate matter - smog\n\nSolar se:\n✓ Zero emissions\n✓ Clean air\n✓ Healthy environment"
      },
      {
        title: "🔹 Future Generations",
        content: "Aapka ek solar system:\n✓ Aapke bacchon ke liye clean energy\n✓ Sustainable lifestyle ki misaal\n✓ Climate change se ladne mein contribution\n✓ Green India ki taraf kadam"
      },
      {
        title: "🔹 Track Your Impact",
        content: "App mein dekhen:\n✓ Total CO₂ saved\n✓ Trees equivalent\n✓ Coal saved (kg)\n✓ Your green score"
      }
    ],
    example: {
      title: "🌍 Real Impact:",
      details: [
        "1000+ customers = 5000+ tons CO₂ saved",
        "Equivalent to 2,50,000 trees",
        "Prayagraj ki air quality improve karne mein help",
        "Be part of this green revolution!"
      ]
    },
    cta: "Save money + Save planet = Win-Win!"
  },
  "govt-subsidy": {
    title: "Government Subsidy - Kitna Milega?",
    icon: "🎁",
    sections: [
      {
        title: "🔹 Subsidy Slab (PM Surya Ghar Yojana)",
        content: "1kW system: ₹30,000\n2kW system: ₹60,000\n3kW system: ₹78,000\n4kW system: ₹78,000\n5kW+ system: ₹78,000\n\n(Maximum ₹78,000 for residential)"
      },
      {
        title: "🔹 Eligibility Criteria",
        content: "✓ Residential property owner\n✓ Electricity connection hai\n✓ Roof rights available\n✓ Documents complete hain\n✓ Approved vendor se lagwana (hum hain approved!)"
      },
      {
        title: "🔹 Subsidy Process Timeline",
        content: "Week 1-2: Online registration\nWeek 3-4: Technical feasibility approval\nWeek 5-6: Installation completion\nWeek 7-8: Inspection & commissioning\nWeek 9-12: Subsidy disbursement (directly to your account)"
      },
      {
        title: "🔹 Hum Karenge Sab Kuch",
        content: "✓ Registration form filling\n✓ Document upload\n✓ Technical reports\n✓ Inspection coordination\n✓ Follow-up with authorities\n✓ Status updates to you"
      }
    ],
    example: {
      title: "💰 Real Cost Example (3kW):",
      details: [
        "System cost: ₹1,80,000",
        "Subsidy: ₹78,000",
        "Your cost: ₹1,02,000 only",
        "Monthly saving: ₹2,700",
        "Payback: Just 3 years!"
      ]
    },
    cta: "Free consultation ke liye call karein!"
  }
};

const BenefitDetailModal = ({ open, onOpenChange, benefitType }: BenefitDetailModalProps) => {
  const benefit = benefitDetails[benefitType];

  if (!benefit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="text-3xl">{benefit.icon}</span>
            {benefit.title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Sections */}
            {benefit.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-base">{section.title}</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line pl-4 border-l-2 border-primary/30">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Example */}
            {benefit.example && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold mb-3">{benefit.example.title}</h4>
                <ul className="space-y-2">
                  {benefit.example.details.map((detail, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Message */}
            <div className="text-center p-4 bg-secondary/10 rounded-lg">
              <p className="font-semibold text-secondary">{benefit.cta}</p>
            </div>
          </div>
        </ScrollArea>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button className="flex-1" asChild>
            <a href="tel:9277302997">📞 Call: 9277302997</a>
          </Button>
          <Button className="flex-1" variant="secondary" asChild>
            <a
              href={`https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20${benefit.title}%20ke%20baare%20mein%20detail%20chahiye`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Par Puchhen
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitDetailModal;
