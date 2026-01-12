import { SiteConfig } from './types';

export const CONFIG: SiteConfig = {
  profile: {
    name: "Pi",
    title: "Explorer & Builder",
    tagline: "Bridging the gap between AI automation and human creativity.",
    // Fix: Using a remote URL for immediate visibility. 
    // To use a local image:
    // 1. Create a 'public' folder in your project root.
    // 2. Move 'head.jpg' into the 'public' folder.
    // 3. Change this line to: avatarUrl: "/head.jpg"
    avatarUrl: "/head.jpg", 
    email: "pi33ymym@gmail.com",
    about: [
      "I am a digital craftsman focused on the intersection of Artificial Intelligence and Robotic Process Automation (RPA).",
      "My passion lies in building systems that liberate people from mundane tasks, allowing them to focus on high-value creative work. I also explore the world of IP incubation and long-term investment strategies."
    ]
  },
  interests: [
    "AI Agent Systems",
    "RPA Automation",
    "IP & Brand Building",
    "Value Investing",
    "Digital Minimalism"
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/PI-33", iconName: "Github" },
    { platform: "Twitter", url: "https://twitter.com", iconName: "Twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", iconName: "Linkedin" }
  ],
  experience: [
    {
      id: "1",
      role: "AI Solutions Architect",
      company: "Future Tech Labs",
      period: "2023 - Present",
      description: "Leading the design of autonomous agents for enterprise workflows. Reduced manual data entry by 85% using LLM-based pipelines.",
      tags: ["Python", "LangChain", "OpenAI API"]
    },
    {
      id: "2",
      role: "Senior RPA Developer",
      company: "Automate Corp",
      period: "2021 - 2023",
      description: "Designed and deployed over 50 automated bots for financial reconciliation and HR onboarding processes.",
      tags: ["UiPath", "Power Automate", "C#"]
    },
    {
      id: "3",
      role: "Independent Creator",
      company: "Self-Employed",
      period: "2019 - 2021",
      description: "Built a niche tech blog reaching 10k monthly active users. Experimented with early generative art tools.",
      tags: ["Content Strategy", "SEO", "Web Dev"]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Auto-Invest Bot",
      description: "An intelligent agent that analyzes market sentiment and rebalances a crypto portfolio automatically based on risk tolerance.",
      tags: ["FinTech", "AI", "Automation"],
      link: "#"
    },
    {
      id: "p2",
      title: "Content Repurposer",
      description: "A tool that takes a single long-form video and automatically cuts it into shorts, writes tweets, and generates a blog post.",
      tags: ["RPA", "Video Processing"],
      link: "#"
    },
    {
      id: "p3",
      title: "Pi's Knowledge Graph",
      description: "A personal second brain visualization using Obsidian data to show connections between investment and tech.",
      tags: ["Data Viz", "D3.js"],
      link: "#"
    }
  ]
};