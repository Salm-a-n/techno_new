// src/data/services.ts
import { Code2, Cloud, Shield, Cpu, Sparkles, Server, Lock, Bot } from 'lucide-react';

export const servicesData = [
  {
    id: "software",
    icon: Code2,
    badgeIcon: Sparkles,
    title: "Software Engineering",
    description: "We architect robust, highly scalable software systems engineered for maximum performance and reliability.",
    features: ["Custom Web Applications", "API Architecture", "Legacy Modernization"],
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
    align: "left"
  },
  {
    id: "cloud",
    icon: Cloud,
    badgeIcon: Server,
    title: "Cloud Infrastructure",
    description: "Resilient cloud-native architectures designed for high availability, security, and infinite scalability.",
    features: ["AWS/Azure Migration", "Serverless Architecture", "DevOps & CI/CD"],
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
    align: "right"
  },
  {
    id: "security",
    icon: Shield,
    badgeIcon: Lock,
    title: "Cybersecurity",
    description: "Enterprise-grade, zero-trust defense mechanisms to protect your data against modern, sophisticated threats.",
    features: ["Zero-Trust Architecture", "Penetration Testing", "Compliance Auditing"],
    color: "from-indigo-400 to-purple-500",
    glowColor: "rgba(129, 140, 248, 0.15)",
    align: "left"
  },
  {
    id: "ai",
    icon: Cpu,
    badgeIcon: Bot,
    title: "AI & Automation",
    description: "Intelligent systems that learn, adapt, and automate complex workflows to drive unprecedented efficiency.",
    features: ["Machine Learning Models", "LLM Integration", "Workflow Automation"],
    color: "from-purple-400 to-fuchsia-500",
    glowColor: "rgba(192, 132, 252, 0.15)",
    align: "right"
  }
];