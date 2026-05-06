import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink,
  Code2, Database, Cpu, Wrench, Sparkles, Briefcase, GraduationCap,
  Send, ArrowRight, Layers, Brain,
} from "lucide-react";
import raviImg from "@/assets/ravi.png";

const skills = {
  Frontend: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "Bootstrap", "jQuery", "Taiga UI"],
  Backend: ["Python","ASP.NET Core Web API", "ASP.NET MVC", "C#", ".NET", "Web Services", "REST APIs"],
  Database: ["SQL Server 2021", "Stored Procedures", "RDLC Reports"],
  "AI Integration": ["ChatGPT API", "Prompt Engineering", "JD Parsing"],
  Tools: ["Git", "Bitbucket", "Swagger","Postman", "Chrome Extensions", "AJAX", "Visual Studio"],
};

const experiences = [
  {
    company: "One Eighty Aamoksh Technologies",
    role: "Web Developer",
    period: "Mar 2024 – Present",
    points: [
      "Lead Angular development for the Nobel House (NH) job portal connecting consultants, candidates, and corporates.",
      "Integrated ChatGPT APIs to extract skills, industries, and experience from job descriptions.",
      "Architected reusable Angular libraries to accelerate delivery across multiple products.",
    ],
  },
  {
    company: "Virtue Analytics Pvt. Ltd.",
    role: "Web Developer",
    period: "Oct 2021 – Nov 2023",
    points: [
      "Built data-rich dashboards (Scholarship Estimator, EFC, Top5 Tool) using Angular, ECharts and Chart.js.",
      "Delivered admin/counselor/student modules with role-based workflows and analytics.",
      "Maintained and shipped a shared internal Angular library used across the platform.",
    ],
  },
  {
    company: "Mahto Software",
    role: "Web Developer",
    period: "Apr 2020 – Sep 2021",
    points: [
      "Developed Local Korner — an end-to-end e-commerce platform for online product purchases.",
      "Built responsive UIs and integrated REST APIs for catalog, cart and checkout flows.",
    ],
  },
  {
    company: "SRM Techsol Pvt. Ltd.",
    role: "Web Developer",
    period: "Oct 2018 – Mar 2020",
    points: [
      "Delivered Lab Connect — central laboratory services platform with global network support.",
      "Worked across C#, ASP.NET, SQL Server, jQuery, AJAX and Web Services.",
    ],
  },
  {
    company: "Techoptims",
    role: "Web Developer",
    period: "Jul 2017 – Oct 2018",
    points: [
      "Built an Inventory Windows Application for tracking stock, sales and purchase documents.",
      "Generated business reports with RDLC and SQL Server.",
    ],
  },
];

const projects = [
  {
    name: "Nobel House (NH)",
    desc: "Job portal where consultants post jobs, candidates apply, and corporates filter profiles by skills & experience.",
    stack: ["Angular", "Taiga UI", "Tailwind", "TypeScript", "ChatGPT"],
    features: ["AI-powered JD parsing", "Smart candidate filtering", "Multi-role dashboard"],
    accent: "from-primary to-accent",
  },
  {
    name: "JD Extractor — Chrome Extension",
    desc: "Chrome extension that scrapes LinkedIn job details and uses ChatGPT API to extract skills, industry & experience.",
    stack: ["JavaScript", "HTML/CSS", ".NET Core API", "ChatGPT API"],
    features: ["LinkedIn scraping", "AI enrichment", "Persistent storage"],
    accent: "from-accent to-primary",
  },
  {
    name: "JD Extension Dashboard",
    desc: "Admin panel to view, edit, and maintain all job records harvested by the Chrome extension.",
    stack: ["React", "Bootstrap", ".NET Core API", "SQL Server"],
    features: ["CRUD on job records", "Role-based admin tools", "Bulk operations"],
    accent: "from-primary to-accent",
  },
  {
    name: "Leisure Care (LC)",
    desc: "Old age home management system for service requests, complaints, housekeeping and transport bookings.",
    stack: ["Angular", "Taiga UI", "Tailwind", "TypeScript"],
    features: ["Request lifecycle", "Housekeeping module", "Transport scheduling"],
    accent: "from-accent to-primary",
  },
  {
    name: "Scholarship Estimator (SE)",
    desc: "Student-facing calculator for scholarship estimation with rich charts and submission analytics.",
    stack: ["Angular", "ECharts", "Chart.js", "TypeScript"],
    features: ["Dynamic forms", "Real-time charts", "Export reports"],
    accent: "from-primary to-accent",
  },
  {
    name: "EFC & Top5 Tools",
    desc: "Calculators for Expected Family Contribution and ranking the top 5 colleges with subscription dashboards.",
    stack: ["Angular", "Tailwind", "Chart.js", "TypeScript"],
    features: ["Subscription model", "Counselor workflows", "Admin controls"],
    accent: "from-accent to-primary",
  },
  {
    name: "Local Korner",
    desc: "E-commerce platform enabling online product browsing, cart and purchases.",
    stack: ["Angular", "Tailwind", "REST APIs"],
    features: ["Catalog & search", "Cart & checkout", "Order tracking"],
    accent: "from-primary to-accent",
  },
  {
    name: "Lab Connect & Inventory",
    desc: "Central laboratory services platform and a Windows inventory app with RDLC reports.",
    stack: ["C#", "ASP.NET", "SQL Server", "jQuery", "RDLC"],
    features: ["Global lab network", "Stock tracking", "Sales/purchase reports"],
    accent: "from-accent to-primary",
  },
  {
    name: "Exam Portal",
    desc: "Web platform to organize and conduct optional student exams with secure database-driven workflows.",
    stack: ["C#", "ASP.NET 4.5", "SQL Server 2012", "jQuery", "JavaScript"],
    features: ["Exam scheduling", "Stored procedures & tables", "Team-coordinated deployments via FileZilla"],
    accent: "from-primary to-accent",
  },
  {
    name: "School Management System",
    desc: "Information system to manage school data and transactions across multiple branches with role-based actors.",
    stack: ["C#", "ASP.NET 4.5", "SQL Server 2012", "jQuery", "AJAX", "RDLC"],
    features: ["Multi-branch support", "Students, staff & parent modules", "Custom UI templates per client"],
    accent: "from-accent to-primary",
  },
  {
    name: "Inventory (Windows Application)",
    desc: "Inventory management software for tracking stock, orders, sales and generating purchase/sales documents.",
    stack: ["C#", "ASP.NET 4.5", "SQL Server 2012", "Web Services", "RDLC"],
    features: ["Stock & order tracking", "Sales & purchase docs", "RDLC business reports"],
    accent: "from-primary to-accent",
  },
  {
    name: "EFC (Expected Family Contribution)",
    desc: "Calculator that provides Expected Family Contribution information with rich charts and dynamic forms.",
    stack: ["Angular", "Taiga UI", "Tailwind", "TypeScript", "ECharts", "Chart.js"],
    features: ["Multi-step calculator", "Autocomplete & multi-select inputs", "Real-time chart visualizations"],
    accent: "from-accent to-primary",
  },
  {
    name: "Platform Dashboard (SE / NPC)",
    desc: "Dashboard displaying Scholarship Estimator and NPC total submission reports with interactive charts.",
    stack: ["Angular", "Taiga UI", "Tailwind", "TypeScript", "ECharts", "Chart.js"],
    features: ["Submission analytics", "SE & NPC reporting", "Interactive charts"],
    accent: "from-primary to-accent",
  },
  {
    name: "Top5 Subscription Dashboard",
    desc: "Subscription product with Admin, Counselor and Student modules for managing and reviewing submissions.",
    stack: ["Angular", "Taiga UI", "Tailwind", "TypeScript", "ECharts", "Chart.js"],
    features: ["Role-based modules", "Activate/deactivate workflows", "Submission management"],
    accent: "from-accent to-primary",
  },
  {
    name: "Angular Shared Library",
    desc: "Reusable internal Angular library powering shared components, forms and charts across multiple products.",
    stack: ["Angular", "Taiga UI", "Tailwind", "TypeScript", "ECharts", "Chart.js"],
    features: ["Reusable components", "Cross-product consistency", "Faster delivery"],
    accent: "from-primary to-accent",
  },
];

const skillIcon: Record<string, JSX.Element> = {
  Frontend: <Code2 className="h-5 w-5" />,
  Backend: <Layers className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  "AI Integration": <Brain className="h-5 w-5" />,
  Tools: <Wrench className="h-5 w-5" />,
};

const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:ravisharmabca@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#home" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
              RV
            </span>
            <span className="gradient-text text-lg">Ravi Vishwakarma</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <a href="/RAVI-VISHWAKARMA_CV.pdf" download>
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
              <Download className="h-4 w-4" /> Resume
            </Button>
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="animate-fade-up order-2 lg:order-1">
            <Badge variant="outline" className="mb-5 border-primary/40 bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3 w-3" /> Available for new opportunities
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I'm <span className="gradient-text">Ravi Vishwakarma</span>
            </h1>
            <h2 className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl">
              Full Stack Developer · Angular· React + .NET · AI Integrations
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              8+ years crafting modern web platforms — from enterprise dashboards and job portals to
              AI-powered tools using <span className="text-foreground">ChatGPT</span>{" "}
              <span className="text-foreground"></span>. I build fast, scalable, beautifully
              engineered products end-to-end.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-glow">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="border-primary/40 hover:bg-primary/10">
                  <Mail className="h-4 w-4" /> Contact Me
                </Button>
              </a>
              <a href="/RAVI-VISHWAKARMA_CV.pdf" download>
                <Button size="lg" variant="ghost">
                  <Download className="h-4 w-4" /> Download Resume
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
              <a href="https://linkedin.com/in/ravi-vishwakarma-140a75123" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href="mailto:ravisharmabca@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> Email
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Lucknow, India
              </span>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 animate-fade-up">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-2xl" />
              <div className="relative rounded-full p-1.5 bg-gradient-to-br from-primary to-accent shadow-glow animate-float">
                <img
                  src={raviImg}
                  alt="Ravi Vishwakarma — Full Stack Developer"
                  className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 ring-4 ring-background"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-3 shadow-card">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="text-lg font-bold gradient-text">8+ Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="About" title="Engineer who ships, end-to-end" />
        <Card className="glass mt-8 p-8 shadow-card">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a <span className="text-foreground font-semibold">Full Stack Developer</span> with{" "}
            <span className="text-foreground font-semibold">8+ years</span> of experience building
            production-grade web applications. My core stack pairs{" "}
            <span className="text-foreground font-semibold">Angular & React</span> on the front end
            with <span className="text-foreground font-semibold">ASP.NET Core Web APIs</span> and{" "}
            <span className="text-foreground font-semibold">SQL Server</span> on the back end. I love
            turning vague briefs into clean, scalable products — and recently I've been deeply focused
            on integrating <span className="text-foreground font-semibold">ChatGPT</span> {" "}
            <span className="text-foreground font-semibold"></span> to ship real AI features
            users feel.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { k: "8+", v: "Years building web" },
              { k: "15+", v: "Production projects" },
              { k: "AI", v: "ChatGPT" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-secondary/40 p-5 text-center">
                <p className="text-2xl font-bold gradient-text">{s.k}</p>
                <p className="text-sm text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Skills" title="Tools I use to build things" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([cat, items]) => (
            <Card key={cat} className="glass group p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  {skillIcon[cat]}
                </div>
                <h3 className="text-lg font-semibold">{cat}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Badge key={s} variant="secondary" className="bg-secondary text-secondary-foreground border border-border">
                    {s}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Experience" title="Career timeline" />
        <div className="relative mt-10">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent sm:left-1/2" />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className={`relative flex flex-col gap-4 sm:flex-row sm:items-start ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow sm:left-1/2" />
                <div className="ml-10 sm:ml-0 sm:w-1/2 sm:px-8">
                  <Card className="glass p-6 shadow-card">
                    <div className="mb-2 flex items-center gap-2 text-xs text-primary">
                      <Briefcase className="h-3 w-3" /> {exp.period}
                    </div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {exp.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Projects" title="Selected work" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.name} className="glass group relative overflow-hidden p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.accent}`} />
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Features</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <Badge key={t} variant="outline" className="border-primary/30 text-xs text-primary">
                    {t}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Education" title="Academic background" />
        <Card className="glass mt-8 flex items-center gap-5 p-6 shadow-card">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Bachelor of Computer Applications (BCA)</h3>
            <p className="text-sm text-muted-foreground">2012 – 2015</p>
          </div>
        </Card>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Contact" title="Let's build something great" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="glass p-6 shadow-card">
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {/* Open to full-time roles, freelance and AI-powered product work. I usually reply within 24 hours. */}
              Open to collaboration on web and AI-based projects. Feel free to reach out — response within 24 hours.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="mailto:ravisharmabca@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" /> ravisharmabca@gmail.com
              </a>
              <a href="tel:+917505557321" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> +91 75055 57321
              </a>
              <a href="tel:+919555764513" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> +91 95557 64513
              </a>
              <p className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Lucknow, U.P, India
              </p>
              <a href="https://linkedin.com/in/ravi-vishwakarma-140a75123" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4 text-primary" /> linkedin.com/in/ravi-vishwakarma
              </a>
            </div>
          </Card>

          <Card className="glass p-6 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-secondary/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className="bg-secondary/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project…"
                  rows={5}
                  className="bg-secondary/40"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ravi Vishwakarma. All rights reserved.
      </footer>
    </div>
  );
};

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="text-center">
    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
      <span className="gradient-text">{title}</span>
    </h2>
  </div>
);

export default Index;
