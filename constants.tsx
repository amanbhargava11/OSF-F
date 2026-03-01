
import React from 'react';
import { Layout, Palette, Globe, BarChart3, Cpu, Users, Zap, TrendingUp, ShieldCheck, Clock, Rocket } from 'lucide-react';
import { Project, Message, ProjectFile, ActivityLog, ProjectStage } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export const STAGES: ProjectStage[] = ['Discovery', 'Design', 'Development', 'Review', 'Launch'];

// Updated SERVICES with missing properties required by Services.tsx
export const SERVICES = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'High-performance React & Next.js applications.',
    icon: <Globe className="w-6 h-6" />,
    problem: 'Slow, outdated websites that fail to convert visitors into customers.',
    solution: 'Engineered high-performance React applications with sub-second load times.',
    result: '150% increase in user engagement and 40% reduction in bounce rates.',
    forWho: ['SaaS Startups', 'E-commerce', 'Tech Platforms']
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Visual identity systems for modern startups.',
    icon: <Palette className="w-6 h-6" />,
    problem: 'Generic brand identities that get lost in the noise of the market.',
    solution: 'Strategic visual identity systems designed for digital-first companies.',
    result: 'Cohesive brand presence that builds immediate trust with investors and users.',
    forWho: ['Early Stage Founders', 'Venture Studios', 'D2C Brands']
  },
  {
    id: 'automation',
    title: 'AI Automation',
    description: 'Streamline operations with custom AI workflows.',
    icon: <Cpu className="w-6 h-6" />,
    problem: 'Bloated operational costs and repetitive manual workflows slowing down growth.',
    solution: 'Custom AI-powered automation agents and workflow integrations.',
    result: 'Saved 20+ hours per week per employee and reduced operational overhead by 30%.',
    forWho: ['Growing Teams', 'Operation Managers', 'Service Agencies']
  }
];

// Added missing TESTIMONIALS export for Home.tsx
export const TESTIMONIALS = [
  {
    id: 't1',
    content: "OSF transformed our product from a clunky MVP into a world-class platform in weeks. Their speed is unmatched.",
    name: "Alex Rivera",
    role: "CEO",
    company: "VoltPay",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    id: 't2',
    content: "The level of design and engineering talent at OSF is equivalent to what you'd find at top Silicon Valley agencies.",
    name: "Sarah Chen",
    role: "Product Lead",
    company: "Nexus AI",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 't3',
    content: "Working with OSF feels like having an in-house expert team that works 24/7. Highly recommended for growth.",
    name: "Marcus Thorne",
    role: "Founder",
    company: "Astra Cloud",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  }
];

// Added missing TRUST_CARDS export for Home.tsx
export const TRUST_CARDS = [
  { icon: <Zap className="w-5 h-5" />, title: "Rapid Turnaround", desc: "Most projects kick off within 48 hours of consultation." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Growth Focused", desc: "Every line of code and pixel is optimized for conversions." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Full Privacy", desc: "Standardized NDAs and secure data handling for all IP." },
  { icon: <Clock className="w-5 h-5" />, title: "24/7 Support", desc: "Dedicated project managers in your timezone." }
];

// Added missing HOME_PROCESS export for Home.tsx
export const HOME_PROCESS = [
  { step: 1, label: "Audit", desc: "In-depth digital audit" },
  { step: 2, label: "Strategy", desc: "Custom growth roadmap" },
  { step: 3, label: "Design", desc: "High-fidelity prototypes" },
  { step: 4, label: "Build", desc: "Clean, scalable code" },
  { step: 5, label: "Review", desc: "Iterative feedback" },
  { step: 6, label: "Launch", desc: "Market-ready deployment" }
];

// Added missing PROCESS_STEPS export for Process.tsx
export const PROCESS_STEPS = [
  { number: '01', title: 'Discovery & Audit', description: 'We start by tearing down your current digital presence and finding the leaks. We analyze your competitors and identify your unfair advantage.' },
  { number: '02', title: 'Strategy & Roadmap', description: 'Once we know the terrain, we build the map. We define the milestones, the stack, and the talent required to win.' },
  { number: '03', title: 'Sprint Design', description: 'Our designers build visual systems that aren\'t just pretty—they convert. We iterate fast based on real-world psychology.' },
  { number: '04', title: 'Agile Development', description: 'Our developers write clean, performant, and future-proof code. You get weekly builds to track progress in real-time.' },
  { number: '05', title: 'Quality Assurance', description: 'Rigorous testing across all devices and edge cases. We don\'t ship until it\'s bulletproof.' }
];

// Portfolio Projects - Currently empty, will be populated with real projects
export const PORTFOLIO_PROJECTS: any[] = [];

// Initial State for Phase 1
// Fix: progress -> progressPercent, added missing required fields to match Project interface
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    clientId: 'u1',
    title: 'CloudScale SaaS Platform',
    description: 'Enterprise-grade dashboard and marketing site.',
    stage: 'Development',
    progressPercent: 45,
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  }
];

// Fix: timestamp -> createdAt, added senderRole to match Message interface
export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    projectId: 'p1',
    senderId: 'admin-1',
    senderName: 'OSF Admin',
    senderRole: 'admin',
    text: 'Welcome to your project portal! We have initiated the Development stage.',
    createdAt: new Date().toISOString(),
    isSystem: true
  }
];

// Fix: timestamp -> createdAt to match ProjectFile interface
export const INITIAL_FILES: ProjectFile[] = [
  {
    id: 'f1',
    projectId: 'p1',
    name: 'Brand_Guidelines_v1.pdf',
    size: '2.4 MB',
    uploadedBy: 'Admin',
    createdAt: '2024-02-10',
    url: '#'
  }
];

export const INITIAL_ACTIVITY: ActivityLog[] = [
  {
    id: 'a1',
    projectId: 'p1',
    type: 'stage_change',
    content: 'Project moved to Development stage.',
    timestamp: '2024-02-12T10:00:00Z'
  }
];
