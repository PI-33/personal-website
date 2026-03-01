import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from './constants';
import { Card, ActionButton, Tag } from './components/UI';
import { BlogList, BlogDetail } from './components/Blog';
import HeroCard from './components/HeroCard';
import { fetchAllPosts } from './lib/content';
import { BlogPost } from './types';
import { Github, Mail, ExternalLink, BookOpen, ArrowUpRight, Briefcase, Rocket, User, Loader2 } from 'lucide-react';

// --- Reusable Module Card Component ---
const ModuleCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  rightElement 
}: { 
  title: string, 
  subtitle: string, 
  icon: any, 
  children: React.ReactNode,
  rightElement?: React.ReactNode 
}) => (
  <div className="relative group">
    {/* Subtle Background Glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-orange-50 to-neutral-100 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-1000"></div>
    
    <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-neutral-200 shadow-sm">
      {/* Header with Tech Aesthetic */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-dashed border-neutral-200">
        <div className="flex items-center gap-4">
          <div className="bg-[#1A1A1A] text-white p-2 rounded-lg">
             <Icon size={24} />
          </div>
          <div>
             <h3 className="text-xl font-black text-[#1A1A1A] tracking-wide uppercase leading-none">
               {title}
             </h3>
             <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
               {subtitle}
             </span>
          </div>
        </div>
        {rightElement}
      </div>
      
      {/* Content Body */}
      <div>{children}</div>
    </div>
  </div>
);

type ViewState = 
  | { type: 'about' }
  | { type: 'thoughts' }
  | { type: 'post'; slug: string };

export default function App() {
  const [view, setView] = useState<ViewState>({ type: 'about' });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Load posts asynchronously on mount
  useEffect(() => {
    fetchAllPosts().then((data) => {
      setPosts(data);
      setLoadingPosts(false);
    });
  }, []);

  // Helper to get active post if in post view
  const activePost = useMemo(() => {
    if (view.type !== 'post') return undefined;
    return posts.find(p => p.slug === view.slug);
  }, [view, posts]);

  return (
    <div className="min-h-screen bg-[#EEEDEB] text-[#1F1F1F] font-sans selection:bg-[#FF6B00] selection:text-white">

      {/* --- Full-screen Digital Business Card --- */}
      {view.type !== 'post' && <HeroCard />}

      {/* --- Sticky Header (appears after scrolling past card) --- */}
      <nav className="sticky top-0 z-50 bg-[#EEEDEB]/85 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setView({ type: 'about' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="w-3 h-3 bg-[#FF6B00] rounded-full group-hover:scale-110 transition-transform duration-200"></div>
              <span className="font-bold text-lg tracking-tight text-[#1F1F1F]">Pi</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setView({ type: 'about' })}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${view.type === 'about' ? 'bg-[#1A1A1A] text-white' : 'text-neutral-500 hover:text-[#1A1A1A] hover:bg-neutral-200/60'}`}
              >
                Home
              </button>
              <button
                onClick={() => setView({ type: 'thoughts' })}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${view.type === 'thoughts' ? 'bg-[#1A1A1A] text-white' : 'text-neutral-500 hover:text-[#1A1A1A] hover:bg-neutral-200/60'}`}
              >
                Essays
              </button>
            </div>
        </div>
      </nav>

      {/* --- Main Content Container --- */}
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12">

        {/* --- Content Views --- */}
        <div className="min-h-[400px] transition-opacity duration-300">
          
          {/* VIEW: ABOUT */}
          {view.type === 'about' && (
            <div className="space-y-16 animate-fade-in-up">
              
              {/* 1. ABOUT ME (Previously System_Overview) */}
              <ModuleCard 
                title="About Me" 
                subtitle="Personal Profile" 
                icon={User}
                rightElement={
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] rounded-full border border-neutral-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-neutral-400 font-mono">ONLINE</span>
                  </div>
                }
              >
                <div className="space-y-6">
                  {CONFIG.profile.about.map((para, i) => (
                    <p key={i} className={`leading-relaxed ${i === 0 ? "text-lg md:text-xl font-medium text-[#1A1A1A]" : "text-base text-[#555]"}`}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <ActionButton primary onClick={() => window.location.href = `mailto:${CONFIG.profile.email}`} className="shadow-lg shadow-orange-500/10">
                    <Mail size={18} className="mr-2" /> Connect
                  </ActionButton>
                  <div className="font-mono text-xs text-neutral-300 flex items-center gap-2">
                    <span>ID: {CONFIG.profile.name.toUpperCase()}</span>
                    <span>//</span>
                    <span>LOC: EARTH</span>
                  </div>
                </div>
              </ModuleCard>

              {/* 2. EXPERIENCE */}
              <ModuleCard 
                title="Experience" 
                subtitle="成长路线" 
                icon={Briefcase}
              >
                 <div className="relative border-l-2 border-[#E5E5E5] ml-3 space-y-12 pl-8 py-2">
                    {CONFIG.experience.map((exp) => (
                      <div key={exp.id} className="relative group/item">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-white bg-[#D4D4D4] group-hover/item:bg-[#FF6B00] shadow-sm transition-colors duration-300"></div>
                        
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                          <h4 className="text-xl font-bold text-[#1A1A1A]">{exp.role}</h4>
                          <span className="text-xs font-bold text-[#666] font-mono bg-[#F5F5F5] px-2 py-1 rounded border border-[#EEE]">{exp.period}</span>
                        </div>
                        <p className="text-lg text-[#FF6B00] font-semibold mb-3">{exp.company}</p>
                        <p className="text-[#555] mb-5 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap">
                          {exp.tags.map(t => <Tag key={t} text={t} />)}
                        </div>
                      </div>
                    ))}
                 </div>
              </ModuleCard>

              {/* 3. PROJECTS */}
              <ModuleCard 
                title="Projects" 
                subtitle="造过的东西" 
                icon={Rocket}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CONFIG.projects.map((project) => (
                    <Card key={project.id} className="group/card hover:border-[#FF6B00] transition-all duration-300 h-full bg-[#FAFAFA] border-neutral-100 shadow-none hover:shadow-md">
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-white border border-[#EEE] p-3 rounded-lg shadow-sm">
                            <BookOpen size={20} className="text-[#1A1A1A]" />
                          </div>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#FF6B00] transition-colors bg-white border border-[#EEE] p-2 rounded-md hover:border-[#FF6B00]/30">
                              <ArrowUpRight size={18} />
                            </a>
                          )}
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-[#1A1A1A] group-hover/card:text-[#FF6B00] transition-colors">{project.title}</h4>
                        <p className="text-[#555] mb-6 flex-grow text-sm leading-relaxed">{project.description}</p>
                        <div className="pt-4 border-t border-[#EEE]">
                           {project.tags.map(t => <Tag key={t} text={t} />)}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ModuleCard>
            </div>
          )}

          {/* VIEW: THOUGHTS LIST */}
          {view.type === 'thoughts' && (
            <>
              {loadingPosts ? (
                <div className="flex justify-center items-center py-20 text-[#888]">
                  <Loader2 className="animate-spin mr-2" /> Initializing Data Uplink...
                </div>
              ) : (
                <BlogList 
                  posts={posts} 
                  onReadPost={(slug) => setView({ type: 'post', slug })} 
                />
              )}
            </>
          )}

          {/* VIEW: POST DETAIL */}
          {view.type === 'post' && activePost && (
             <BlogDetail 
                post={activePost} 
                onBack={() => setView({ type: 'thoughts' })} 
             />
          )}

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-[#D4D4D4] text-center">
          <p className="text-neutral-500 text-sm font-mono">
            SYSTEM STATUS: ONLINE <span className="mx-2 text-[#D4D4D4]">|</span> © {new Date().getFullYear()} {CONFIG.profile.name}
          </p>
        </footer>

      </main>
    </div>
  );
}