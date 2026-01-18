import { Code, Palette, Rocket } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time.",
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Blending aesthetics with functionality for stunning user interfaces.",
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Efficient workflows that bring ideas to life quickly.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate developer with over 5 years of experience building 
              web applications and digital products. I specialize in creating 
              seamless user experiences that combine beautiful design with robust 
              functionality.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with 
              the developer community.
            </p>
          </div>
          
          {/* Highlights */}
          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-background border border-border hover:border-primary transition-all duration-300 group"
              >
                <div className="p-3 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
