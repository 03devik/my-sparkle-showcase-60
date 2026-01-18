const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Figma", "CI/CD"],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="p-8 bg-background border border-border hover:border-primary transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-foreground text-center">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 bg-primary group-hover:scale-150 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
