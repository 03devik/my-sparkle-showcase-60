import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <p className="text-muted-foreground text-lg mb-4 tracking-widest uppercase">
            Welcome to my portfolio
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
            John <span className="text-primary">Doe</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Full-Stack Developer & UI/UX Designer crafting digital experiences 
            that matter.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button variant="outline" size="icon" className="border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={scrollToAbout}
            variant="ghost"
            className="animate-bounce text-muted-foreground hover:text-foreground"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
