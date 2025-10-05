import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/preeti-solar-logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Preeti Solar" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors hover:text-primary ${
                isActive("/") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("services")}
              className="transition-colors hover:text-primary text-foreground"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="transition-colors hover:text-primary text-foreground"
            >
              Benefits
            </button>
            <Link
              to="/calculator"
              className={`transition-colors hover:text-primary ${
                isActive("/calculator") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Solar Calculator
            </Link>
            <Link
              to="/chakki-calculator"
              className={`transition-colors hover:text-primary ${
                isActive("/chakki-calculator") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Chakki Calculator
            </Link>
            <Link
              to="/gallery"
              className={`transition-colors hover:text-primary ${
                isActive("/gallery") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Gallery
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="transition-colors hover:text-primary text-foreground"
            >
              Contact
            </button>
            <Button
              onClick={() =>
                window.open(
                  "https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20jaankari%20chahiye",
                  "_blank"
                )
              }
            >
              WhatsApp Karein
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left transition-colors hover:text-primary text-foreground"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-left transition-colors hover:text-primary text-foreground"
              >
                Benefits
              </button>
              <Link
                to="/calculator"
                onClick={() => setIsOpen(false)}
                className={`transition-colors hover:text-primary ${
                  isActive("/calculator") ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                Solar Calculator
              </Link>
              <Link
                to="/chakki-calculator"
                onClick={() => setIsOpen(false)}
                className={`transition-colors hover:text-primary ${
                  isActive("/chakki-calculator") ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                Chakki Calculator
              </Link>
              <Link
                to="/gallery"
                onClick={() => setIsOpen(false)}
                className={`transition-colors hover:text-primary ${
                  isActive("/gallery") ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                Gallery
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left transition-colors hover:text-primary text-foreground"
              >
                Contact
              </button>
              <Button
                onClick={() => {
                  window.open(
                    "https://wa.me/919277302997?text=Hello%20Preeti%20Solar%2C%20mujhe%20jaankari%20chahiye",
                    "_blank"
                  );
                  setIsOpen(false);
                }}
                className="w-full"
              >
                WhatsApp Karein
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
