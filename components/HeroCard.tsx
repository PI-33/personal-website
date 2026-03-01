import React, { useState, useEffect } from 'react';
import { CONFIG } from '../constants';
import { Github, Mail, ExternalLink, MapPin, ChevronDown } from 'lucide-react';

const XiaohongshuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.08 13.6h-2.16v-1.44h-1.44v1.44H10.8v-1.44H9.36v1.44H7.2V8.4h2.16v1.44h1.44V8.4h1.68v1.44h1.44V8.4h2.16v7.2zm-2.16-4.32h-1.44v1.44h1.44v-1.44zm-3.12 0H9.36v1.44h1.44v-1.44z" />
  </svg>
);

const IconMap: Record<string, React.ReactNode> = {
  Github: <Github size={16} />,
  Xiaohongshu: <XiaohongshuIcon />,
};

export default function HeroCard() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    setVh(window.innerHeight);
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const fadeStart = vh * 0.05;
  const fadeEnd = vh * 0.55;
  const t = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

  return (
    <section
      className="relative flex flex-col items-center justify-center px-4"
      style={{ height: '100lvh' }}
    >
      <div
        className="w-full max-w-[420px] will-change-transform"
        style={{
          opacity: 1 - t,
          transform: `scale(${1 - t * 0.06}) translateY(${-t * 50}px)`,
          filter: `blur(${t * 6}px)`,
          pointerEvents: t > 0.7 ? 'none' : 'auto',
        }}
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6B00]/8 via-transparent to-[#FF6B00]/4 rounded-[2rem] blur-2xl" />

          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-neutral-200/70 shadow-[0_4px_32px_rgba(0,0,0,0.07)] overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#FFa855]" />

            <div className="px-6 pt-6 pb-5">
              {/* Avatar + identity */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-[2.5px] border-white shadow-md">
                    <img src={CONFIG.profile.avatarUrl} alt={CONFIG.profile.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                    {CONFIG.profile.name}
                  </h1>
                  <p className="text-[12px] font-semibold text-[#FF6B00] leading-snug mt-0.5">
                    Vibe Coding / 独立开发者 / AI产品探索家
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-neutral-400">
                    <MapPin size={11} />
                    <span>China · Building in public</span>
                  </div>
                </div>
              </div>

              {/* Greeting — replaces tags */}
              <div className="mb-4 bg-neutral-50/80 rounded-xl px-4 py-3 border border-neutral-100">
                <p className="text-[14px] leading-relaxed text-[#333]">
                  <span className="mr-1">👋</span>
                  你好，我是派派，欢迎认识我。
                </p>
                <p className="text-[13px] leading-relaxed text-[#555] mt-1">
                  一个不想局限于敲代码的理科生，用 AI 创造好玩的事情。
                </p>
              </div>

              {/* Tagline */}
              <div className="mb-4 pl-3 border-l-2 border-[#FF6B00]/30">
                <p className="text-[13px] leading-relaxed text-[#444]">
                  关注 AI 落地实践与自动化，探索一人公司的可能性。
                </p>
                <p className="text-[13px] leading-relaxed text-[#444] mt-0.5">
                  在这里分享我学到的一切。
                </p>
              </div>

              <div className="border-t border-dashed border-neutral-200 mb-4" />

              {/* Socials + CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {CONFIG.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="h-8 flex items-center gap-1.5 px-2.5 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-[#FF6B00] hover:text-white transition-all duration-200 border border-neutral-200/50 text-[11px] font-medium"
                      aria-label={social.platform}
                    >
                      {IconMap[social.iconName] || <ExternalLink size={16} />}
                      <span>{social.platform}</span>
                    </a>
                  ))}
                </div>

                <a
                  href={`mailto:${CONFIG.profile.email}`}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1A1A1A] text-white text-[11px] font-bold rounded-lg hover:bg-[#FF6B00] transition-colors duration-200"
                >
                  <Mail size={13} />
                  Say Hi
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-neutral-50/80 border-t border-neutral-100 px-6 py-2 flex items-center justify-between">
              <span className="text-[10px] text-neutral-300 font-mono">© {new Date().getFullYear()}</span>
              <span className="text-[10px] text-neutral-300 font-mono tracking-wide">pi.dev</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="mt-10 flex flex-col items-center gap-1"
        style={{ opacity: Math.max(0, 1 - t * 4) }}
      >
        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.15em]">
          Scroll
        </span>
        <ChevronDown size={14} className="text-neutral-400 animate-bounce" />
      </div>
    </section>
  );
}
