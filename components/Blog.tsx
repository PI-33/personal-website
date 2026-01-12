import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';
import { Card, Tag } from './UI';
import { ArrowLeft, Calendar, Clock, ChevronRight, Hash, AlignRight } from 'lucide-react';

// --- HELPER: Slugify ---
// Converts string to URL-friendly slug (e.g., "Hello World" -> "hello-world")
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
};

// --- BLOG LIST VIEW ---
interface BlogListProps {
  posts: BlogPost[];
  onReadPost: (slug: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ posts, onReadPost }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  const filteredPosts = selectedTag 
    ? posts.filter(p => p.tags.includes(selectedTag)) 
    : posts;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between border-b border-[#D4D4D4] pb-4">
        <h3 className="text-2xl font-bold text-[#1A1A1A] uppercase flex items-center gap-2">
          <span>✍️</span> Essays_Stream
        </h3>
        <div className="flex gap-2">
           {selectedTag && (
             <button onClick={() => setSelectedTag(null)} className="text-xs text-[#FF6B00] hover:underline">
               Clear Filter
             </button>
           )}
           <span className="text-xs font-bold text-[#FF6B00] bg-[#FFF0E6] px-3 py-1 rounded-full border border-[#FF6B00]/20">
            {filteredPosts.length} RECORDS
          </span>
        </div>
      </div>

      {/* Tag Filter Bar */}
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded border transition-all ${
              selectedTag === tag 
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                : 'bg-transparent text-[#666] border-[#D4D4D4] hover:border-[#999]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <div 
            key={post.slug} 
            onClick={() => onReadPost(post.slug)}
            className="group cursor-pointer bg-[#FDFDFD] border border-transparent border-b-[#E0E0E0] hover:border-[#D4D4D4] hover:bg-white p-6 transition-all rounded-lg hover:shadow-sm"
          >
             <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                <span className="font-mono text-xs text-[#888] w-24 flex-shrink-0">{post.date}</span>
                <h2 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#FF6B00] transition-colors">
                  {post.title}
                </h2>
             </div>
             <p className="text-[#555] text-sm leading-relaxed md:ml-28 mb-4 max-w-2xl">
               {post.description}
             </p>
             <div className="md:ml-28 flex gap-2">
               {post.tags.map(t => (
                 <span key={t} className="text-[10px] uppercase tracking-wider text-[#888] border border-[#EEE] px-1.5 rounded bg-[#F9F9F9]">
                   {t}
                 </span>
               ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TABLE OF CONTENTS COMPONENT ---
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
  const [activeId, setActiveId] = useState<string>('');
  
  // 1. Parse Headings from Raw Markdown
  const headings = useMemo(() => {
    const lines = content.split('\n');
    const extracted: TOCItem[] = [];
    
    // Simple regex to match # Heading, ## Heading, etc.
    const headingRegex = /^(#{1,3})\s+(.+)$/;
    
    // Note: We skip code blocks usually, but for simplicity assuming clean md structure
    lines.forEach(line => {
      const match = line.match(headingRegex);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/\*|_/g, ''); // Remove bold/italic chars
        extracted.push({
          id: slugify(text),
          text,
          level
        });
      }
    });
    return extracted;
  }, [content]);

  // 2. Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' } // Trigger when element is near top
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto hidden lg:block w-64 pl-4 border-l border-[#E0E0E0]">
      <div className="flex items-center gap-2 mb-4 text-[#1A1A1A] opacity-50">
        <AlignRight size={14} />
        <span className="text-xs font-bold uppercase tracking-widest">Index</span>
      </div>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`transition-all duration-200 ${
              heading.level === 1 ? 'ml-0' : 
              heading.level === 2 ? 'ml-3' : 'ml-6'
            }`}
          >
            <a 
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(heading.id);
              }}
              className={`block text-sm leading-tight transition-colors duration-200 ${
                activeId === heading.id 
                  ? 'text-[#FF6B00] font-bold border-l-2 border-[#FF6B00] pl-3 -ml-[13px]' 
                  : 'text-[#888] hover:text-[#333]'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// --- BLOG DETAIL VIEW ---
interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ post, onBack }) => {
  // Custom Renderers to inject IDs into Headings for Scroll Spy
  const MarkdownComponents = {
    h1: ({ children }: any) => {
      const id = slugify(typeof children === 'string' ? children : children[0]);
      return <h1 id={id} className="scroll-mt-24">{children}</h1>;
    },
    h2: ({ children }: any) => {
      const id = slugify(typeof children === 'string' ? children : children[0]);
      return <h2 id={id} className="scroll-mt-24">{children}</h2>;
    },
    h3: ({ children }: any) => {
      const id = slugify(typeof children === 'string' ? children : children[0]);
      return <h3 id={id} className="scroll-mt-24">{children}</h3>;
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="group flex items-center text-sm font-bold text-[#666] hover:text-[#FF6B00] mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        BACK TO GARDEN
      </button>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 relative">
        
        {/* Article Column */}
        <div className="min-w-0"> {/* min-w-0 prevents grid blowout */}
          {/* Article Header */}
          <header className="mb-10 pb-10 border-b border-[#E0E0E0]">
            <div className="flex gap-2 mb-4">
               {post.tags.map(t => <Tag key={t} text={t} />)}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm font-mono text-[#666]">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} /> {Math.ceil(post.content.length / 500)} MIN READ
              </span>
            </div>
          </header>

          {/* Markdown Content */}
          <article className="prose prose-neutral prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-[#1A1A1A] prose-headings:tracking-tight
            prose-p:text-[#333] prose-p:leading-relaxed
            prose-a:text-[#FF6B00] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-[#FF6B00] prose-blockquote:bg-[#F9F9F9] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-[#555]
            prose-code:text-[#FF6B00] prose-code:bg-[#FFF0E6] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
            prose-pre:bg-[#1A1A1A] prose-pre:text-white prose-pre:shadow-lg prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:shadow-md
          ">
            <ReactMarkdown components={MarkdownComponents}>
              {post.content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Sidebar / Table of Contents */}
        <aside className="hidden lg:block w-64">
           <TableOfContents content={post.content} />
        </aside>

      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-[#E0E0E0]">
        <button 
          onClick={onBack}
          className="text-[#FF6B00] font-bold hover:underline"
        >
          ← Return to List
        </button>
      </div>
    </div>
  );
};