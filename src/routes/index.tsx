import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import workGrocery from "@/assets/work-grocery.jpg";
import workZeal from "@/assets/work-zeal.jpg";
import workTerra from "@/assets/work-terra.jpg";

const TITLE = "Arnold Shaju — Full-Stack Developer Portfolio";
const DESCRIPTION =
  "Computer Science Engineering fresher building backend systems, mobile tools, and the machinery that keeps them running. Python, Django, React, Next.js.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MARQUEE_ITEMS = [
  "Python",
  "Django",
  "React",
  "Next.js",
  "Postgres",
  "Docker",
  "Redis",
  "Celery",
  "CI/CD",
];

type ProjectItem = {
  index: string;
  tag: string;
  period: string;
  image: string;
  title: string;
  description: string;
  stack: string[];
  demoUrl: string;
  githubUrl: string;
  architecture: string;
  highlights: string[];
  challenges: string;
};

const PROJECTS: ProjectItem[] = [
  {
    index: "01",
    tag: "AI · Backend",
    period: "Jul 2025 — Present",
    image: workGrocery,
    title: "Smart Grocery Assistant",
    description:
      "OCR-powered grocery assistant on Django — AI-driven recommendations, expiry and refill alerts, and in-store navigation with route optimization.",
    stack: ["OCR", "AI", "Django", "Python", "SQLite"],
    demoUrl: "",
    githubUrl: "https://github.com/Arnoldshaju",
    architecture: "Django REST Framework + Tesseract OCR Engine + A* Pathfinding Service",
    highlights: [
      "Integrated OCR receipt parsing to automatically import purchased items & dates.",
      "Engineered automated predictive expiration algorithms with dynamic push notifications.",
      "Implemented A* algorithm for optimized step-by-step in-store item navigation."
    ],
    challenges: "Optimizing low-latency image processing for mobile receipt uploads and real-time route graph generation."
  },
  {
    index: "02",
    tag: "Full-Stack",
    period: "2025 — Present",
    image: workZeal,
    title: "Zeal",
    description:
      "Full-stack collaborative document editor with authentication, role-based sharing, real-time WebSocket updates and live presence — built with Next.js and Django REST Framework.",
    stack: ["Next.js", "Django REST", "WebSockets", "Redis", "JWT"],
    demoUrl: "https://zeal-sepia.vercel.app",
    githubUrl: "https://github.com/Arnoldshaju",
    architecture: "Next.js 15 Client + Django Channels WebSockets + Redis Pub/Sub + JWT Auth",
    highlights: [
      "Low-latency real-time collaborative document editing and cursor presence tracking.",
      "Granular Role-Based Access Control (RBAC) with secure access link generation.",
      "Asynchronous document auto-saving with Conflict-free Replicated Data Type concepts."
    ],
    challenges: "Handling concurrent WebSocket state synchronization and state persistence with low latency."
  },
  {
    index: "03",
    tag: "Web · Frontend",
    period: "2025",
    image: workTerra,
    title: "Terra Mindspace",
    description:
      "A modern restaurant website with an elegant, immersive dining experience — built with TanStack Start, React, TypeScript and Tailwind CSS.",
    stack: ["TanStack Start", "React", "TypeScript", "Tailwind CSS", "Nitro"],
    demoUrl: "https://terra-mindspace.vercel.app",
    githubUrl: "https://github.com/Arnoldshaju",
    architecture: "TanStack Start SSR Engine + React 19 + Nitro Serverless + Tailwind CSS v4",
    highlights: [
      "Fullstack SSR application with glassmorphic UI design system and ambient kinetic motion.",
      "Optimized Core Web Vitals achieving sub-second LCP and responsive layout scores.",
      "Seamless client hydration with custom Nitro adapter setup for production deployment."
    ],
    challenges: "Configuring server-side rendering routes with Vite Nitro plugin for zero cold-start latency."
  }
];

const SKILLS = [
  "Python",
  "Django",
  "React",
  "Next.js",
  "Java",
  "JWT & Auth",
  "Postgres",
  "SQLite",
  "HTML & CSS",
  "Redis",
  "Celery",
  "CI/CD",
  "Docker",
  "DevOps",
  "Firebase",
];

const SOFT_SKILLS = [
  "Team Management",
  "Communication",
  "Event Coordination",
  "Leadership",
  "Problem-Solving",
];

const LANGUAGES = [
  { name: "English", level: "Full Professional" },
  { name: "Malayalam", level: "Native / Bilingual" },
];

const ACTIVITIES = [
  {
    title: "NRPF Unit Coordinator",
    role: "Leadership",
    description: "Coordinating National Resource Protection Force activities and campus initiatives.",
  },
  {
    title: "NSS Volunteer",
    role: "Community Service",
    description: "Active member in National Service Scheme social welfare and community outreach drives.",
  },
];

const INTERNSHIPS = [
  {
    title: "Mobile App Dev",
    meta: "CEC · DevFactory · Jun 2023",
    description:
      "Internship in designing and building mobile applications with Android Studio, SQLite and MySQL.",
  },
  {
    title: "IBOT Robotics",
    meta: "SCET · TEKWIZA · Dec 2022",
    description:
      "Built a programmable robot with Arduino IDE and C++ — IR and motor sensors for responsive autonomous movement.",
  },
];

const EDUCATION = [
  {
    level: "B.Tech — Computer Science & Engineering",
    school: "College of Engineering Cherthala, IHRD",
    period: "2022 — 2026",
    score: "CGPA 7.2",
  },
  {
    level: "Higher Secondary (12th)",
    school: "St Antony's HSS, Mala",
    period: "2019 — 2021",
    score: "99%",
  },
  {
    level: "Secondary — SSLC (10th)",
    school: "St Joseph EMHSS, Aloor",
    period: "March 2018",
    score: "98%",
  },
];

function Index() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* Ambient glows & Interactive Spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-40 -left-32 h-[42vw] w-[42vw] animate-drift rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[36vw] w-[36vw] animate-drift-reverse rounded-full bg-ice/20 blur-[150px]" />
        <div className="absolute top-1/3 left-1/2 h-[26vw] w-[26vw] animate-drift-slow rounded-full bg-primary/10 blur-[130px]" />
        {mousePos && (
          <div
            className="fixed inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100, 220, 255, 0.16), transparent 75%)`,
            }}
          />
        )}
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-panel/40 px-6 py-4 backdrop-blur-2xl md:px-12">
        <span className="font-mono text-sm text-primary">ARNOLD_SHAJU</span>
        <div className="hidden gap-8 font-mono text-xs tracking-widest text-muted-foreground uppercase md:flex">
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#work" className="transition-colors hover:text-foreground">
            Work
          </a>
          <a href="#skills" className="transition-colors hover:text-foreground">
            Stack
          </a>
          <a href="#path" className="transition-colors hover:text-foreground">
            Path
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/terminal"
            className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-xs tracking-widest text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            💻 Terminal OS
          </Link>
          <a
            href="#about"
            className="rounded-full border border-primary/40 px-4 py-1.5 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:border-primary hover:bg-primary/10"
          >
            About me
          </a>
          <a
            href="/arnold-shaju-resume.pdf"
            download="Arnold-Shaju-Resume.pdf"
            className="rounded-full border border-border px-4 py-1.5 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-foreground/5"
          >
            Résumé ↓
          </a>
          <a
            href="#contact"
            className="rounded-full border border-primary/40 px-4 py-1.5 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Hire me
          </a>
        </div>
      </nav>

      {/* Hero / About */}
      <header id="about" className="relative z-10 px-6 pt-16 pb-10 md:px-12 md:pt-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-6 animate-rise font-mono text-xs tracking-[0.3em] text-primary uppercase [animation-delay:80ms]">
              Computer Science · Class of 2026
            </p>
            <h1 className="animate-rise font-display leading-[0.82] tracking-tight text-balance [animation-delay:160ms] text-[clamp(4rem,13vw,12rem)]">
              ARNOLD
              <br />
              <span className="text-primary">SHAJU</span>
            </h1>
            <p className="mt-8 max-w-60 animate-rise font-mono text-sm text-pretty text-muted-foreground [animation-delay:260ms]">
              I build web frontends, backend systems, and DevOps pipelines
              that keep applications running smoothly. Currently shipping in
              React, Django &amp; Docker.
            </p>
            <div className="mt-10 flex animate-rise flex-wrap items-center gap-4 [animation-delay:360ms]">
              <a
                href="#contact"
                className="group rounded-full bg-primary px-7 py-3 font-mono text-xs tracking-widest text-primary-foreground uppercase transition-colors duration-300 hover:bg-ice"
              >
                <span className="inline-flex items-center gap-2">
                  Start a project{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <a
                href="#work"
                className="rounded-full border border-border px-7 py-3 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:bg-foreground/5"
              >
                See the work
              </a>
              <a
                href="/arnold-shaju-resume.pdf"
                download="Arnold-Shaju-Resume.pdf"
                className="rounded-full border border-border px-7 py-3 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:border-primary/40 hover:text-primary"
              >
                Download résumé ↓
              </a>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="animate-rise rounded-2xl border border-border bg-foreground/5 p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 [animation-delay:420ms]">
              <div className="mb-5 flex items-center gap-2.5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                </span>
                NOW AVAILABLE FOR JOBS
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Degree
                  </span>
                  <span className="text-right text-sm">B.Tech CSE</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    CGPA
                  </span>
                  <span className="font-display text-3xl text-primary">
                    7.2
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Focus
                  </span>
                  <span className="text-right text-sm">
                    Frontend · Backend · DevOps
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Based
                  </span>
                  <span className="text-right text-sm">Kerala, IN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="relative z-10 border-y border-border bg-panel/30 py-4 backdrop-blur-xl">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center font-display text-2xl tracking-tight whitespace-nowrap uppercase md:text-4xl">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className={`px-6 ${i % 2 === 1 ? "text-primary" : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Work */}
      <section id="work" className="relative z-10 px-6 py-20 md:px-12 md:py-28">
        <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
          <h2 className="font-display text-5xl tracking-tight text-balance md:text-7xl">
            SELECTED WORK
          </h2>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            (three systems)
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.index}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-foreground/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
            >
              <div>
                <div className="mb-6 flex items-center justify-between font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                  <span>({project.index})</span>
                  <span className="text-primary">{project.tag}</span>
                </div>
                <p className="mb-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                  {project.period}
                </p>
                <div
                  className="group/img relative mb-6 cursor-pointer overflow-hidden rounded-xl border border-border"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover/img:opacity-100">
                    <span className="rounded-full bg-primary px-4 py-2 font-mono text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow-lg">
                      Deep Dive 🔍
                    </span>
                  </div>
                </div>
                <h3 className="mb-3 font-display text-2xl tracking-tight">
                  {project.title}
                </h3>
                <p className="mb-5 text-sm text-pretty text-muted-foreground">
                  {project.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 border-t border-border pt-4">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-full bg-primary/10 py-2 text-center font-mono text-[11px] tracking-wider text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Live Demo ↗
                  </a>
                ) : (
                  <span className="flex-1 rounded-full border border-border/40 bg-foreground/5 py-2 text-center font-mono text-[11px] tracking-wider text-muted-foreground/60 uppercase">
                    Backend App
                  </span>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-border py-2 text-center font-mono text-[11px] tracking-wider text-muted-foreground uppercase transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  GitHub ↗
                </a>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  title="Inspect Details"
                >
                  🔍
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Project Deep-Dive Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl animate-rise duration-300"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-primary/40 bg-panel p-6 shadow-2xl backdrop-blur-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs tracking-widest text-primary uppercase">
                    ({selectedProject.index}) {selectedProject.tag}
                  </span>
                  <h2 className="mt-1 font-display text-3xl tracking-tight text-foreground md:text-4xl">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  ✕ Close
                </button>
              </div>

              {/* Modal Image */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="mb-6 aspect-[16/9] w-full rounded-xl border border-border object-cover"
              />

              {/* Direct Links */}
              <div className="mb-8 flex flex-wrap gap-4">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-mono text-xs tracking-widest text-primary-foreground uppercase transition-colors hover:bg-ice"
                  >
                    Launch Live Demo <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 font-mono text-xs tracking-widest text-foreground uppercase transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Inspect Source Code <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-xs text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture */}
              <div className="mb-6 rounded-xl border border-border bg-foreground/5 p-4">
                <h4 className="mb-1 font-mono text-xs tracking-widest text-primary uppercase">
                  System Architecture
                </h4>
                <p className="font-mono text-xs text-foreground">
                  {selectedProject.architecture}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Key Achievements &amp; Features
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenge */}
              <div className="rounded-xl border border-border bg-foreground/5 p-4">
                <h4 className="mb-1 font-mono text-xs tracking-widest text-primary uppercase">
                  Engineering Challenge Solved
                </h4>
                <p className="text-xs text-muted-foreground">
                  {selectedProject.challenges}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Skills & Capabilities */}
      <section
        id="skills"
        className="relative z-10 px-6 py-20 md:px-12 md:py-24"
      >
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              (skills & capabilities)
            </span>
            <h2 className="mt-4 font-display text-5xl tracking-tight text-balance md:text-6xl">
              What I<br />
              bring to<br />
              the table
            </h2>
            <p className="mt-6 max-w-60 text-sm text-pretty text-muted-foreground">
              A backend-first engineering toolkit complemented by strong communication, team management, and problem-solving abilities.
            </p>
          </div>
          <div className="space-y-10 md:col-span-8">
            {/* Technical Stack */}
            <div>
              <h3 className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">
                Technical Stack
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SKILLS.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-xl border border-border bg-foreground/5 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="font-mono text-base text-foreground">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SOFT_SKILLS.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-xl border border-border bg-foreground/5 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="font-mono text-base text-foreground">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path */}
      <section id="path" className="relative z-10 px-6 py-20 md:px-12 md:py-24">
        <div className="mb-12 border-b border-border pb-6">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            (path & involvement)
          </span>
          <h2 className="mt-4 font-display text-5xl tracking-tight text-balance md:text-6xl">
            Experience, Education &amp; Activities
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          {/* Column 1: Internships & Activities */}
          <div className="space-y-10">
            <div>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-primary uppercase">
                Internships
              </h3>
              <div className="space-y-6">
                {INTERNSHIPS.map((item) => (
                  <div
                    key={item.title}
                    className="border-l border-border pl-5"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-2xl tracking-tight">
                        {item.title}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.meta}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-primary uppercase">
                Activities &amp; Leadership
              </h3>
              <div className="space-y-4">
                {ACTIVITIES.map((act) => (
                  <div
                    key={act.title}
                    className="rounded-xl border border-border bg-foreground/5 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl tracking-tight text-foreground">
                        {act.title}
                      </span>
                      <span className="font-mono text-[11px] tracking-widest text-primary uppercase">
                        {act.role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {act.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Education & Languages */}
          <div className="space-y-10">
            <div>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-primary uppercase">
                Education
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.level}
                    className="border-l border-border pl-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-display text-2xl tracking-tight">
                        {edu.level}
                      </span>
                      <span className="font-display text-xl text-primary">
                        {edu.score}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {edu.school} · {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-primary uppercase">
                Languages
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.name}
                    className="rounded-xl border border-border bg-foreground/5 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="block font-display text-2xl tracking-tight text-foreground">
                      {lang.name}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer
        id="contact"
        className="relative z-10 border-t border-border bg-panel/40 px-6 py-24 backdrop-blur-2xl md:px-12"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
          Have a project in mind?
        </p>
        <h2 className="mt-6 font-display leading-[0.85] tracking-tight text-balance text-[clamp(3rem,9vw,8rem)]">
          LET'S BUILD
          <br />
          <span className="text-primary">SOMETHING.</span>
        </h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:arnoldshaju75@gmail.com"
            className="group inline-flex items-center gap-4 rounded-full border border-primary/40 px-8 py-4 font-mono text-sm text-foreground transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            arnoldshaju75@gmail.com{" "}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="tel:+916238046258"
            className="inline-flex items-center gap-4 rounded-full border border-border px-8 py-4 font-mono text-sm text-foreground transition-colors duration-300 hover:bg-foreground/5"
          >
            +91 62380 46258
          </a>
          <a
            href="https://github.com/Arnoldshaju"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-full border border-border px-8 py-4 font-mono text-sm text-foreground transition-colors duration-300 hover:bg-foreground/5"
          >
            GitHub{" "}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          <span>Arnold Shaju — CSE Fresher</span>
          <span>Chalakudy, Thrissur, Kerala · 2026</span>
        </div>
      </footer>
    </div>
  );
}
