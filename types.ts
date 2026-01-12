export interface SocialLink {
  platform: string;
  url: string;
  iconName: string; // Lucide icon name
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  imagePlaceholder?: boolean; // If true, uses a generated placeholder
  tags: string[];
}

// Updated Blog Post Definition
export interface BlogPost {
  slug: string; // The URL identifier (filename)
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  content: string; // Markdown content
  tags: string[];
  published: boolean;
}

export interface SiteConfig {
  profile: {
    name: string;
    title: string;
    tagline: string;
    about: string[];
    avatarUrl: string;
    email: string;
  };
  socials: SocialLink[];
  interests: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  // Blog is now dynamic, removed from static config type strictly, 
  // but kept here if you want to mix static/dynamic. 
  // For this implementation, we load blog from files.
}
