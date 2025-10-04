import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/preeti-solar-logo.jpeg";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Preeti Solar" className="h-16 w-auto" />
            </div>
            <p className="text-muted-foreground">
              Uttar Pradesh mein solar energy aur atta chakki solutions provide karte hain. Clean energy ke saath
              ek bright future banayein.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Benefits
              </button>
              <Link
                to="/calculator"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Solar Calculator
              </Link>
              <Link
                to="/chakki-calculator"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Chakki Calculator
              </Link>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Gallery
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <p>Solar Panel Installation</p>
              <p>Atta Chakki Installation</p>
              <p>Maintenance & Support</p>
              <p>Consultation</p>
              <p>Government Subsidy Help</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>9277302997</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>preetisolar46@gmail.com</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prayagraj Branch</p>
                    <p className="text-sm">Prayagraj, Uttar Pradesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Varanasi Branch</p>
                    <p className="text-sm">Varanasi, Uttar Pradesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Preeti Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
