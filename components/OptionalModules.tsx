// ============================================
// 可选功能模块：直接复制到你的项目中使用
// ============================================

import React, { useState } from 'react';
import { Calendar, MapPin, Bookmark, ExternalLink, Code, Coffee, Book, Lightbulb } from 'lucide-react';

// ============================================
// 模块 1: "现在" 页面 (Now Page)
// ============================================
// 灵感来源: https://nownownow.com/
// 让访客知道你当前在做什么

interface NowData {
  location: string;
  working: string;
  learning: string;
  reading: string;
  updated: string;
}

export const NowSection: React.FC<{ data: NowData }> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FF6B00] text-white p-2 rounded-lg">
          <Calendar size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#1A1A1A] tracking-wide uppercase">
            现在
          </h3>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            What I'm Doing Now
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <NowItem 
          icon={<MapPin size={18} />}
          label="位置"
          value={data.location}
        />
        <NowItem 
          icon={<Code size={18} />}
          label="正在做"
          value={data.working}
        />
        <NowItem 
          icon={<Lightbulb size={18} />}
          label="正在学"
          value={data.learning}
        />
        <NowItem 
          icon={<Book size={18} />}
          label="正在读"
          value={data.reading}
        />
      </div>

      <div className="mt-6 pt-6 border-t border-neutral-100">
        <p className="text-xs text-neutral-400 font-mono">
          最后更新: {data.updated}
        </p>
      </div>
    </div>
  );
};

const NowItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="text-[#FF6B00] mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-bold text-neutral-500 mb-1">{label}</p>
      <p className="text-base text-[#1A1A1A]">{value}</p>
    </div>
  </div>
);

// ============================================
// 模块 2: 技能雷达图数据
// ============================================

interface SkillCategory {
  category: string;
  skills: Array<{
    name: string;
    level: number; // 1-10
    yearsOfExperience?: number;
  }>;
}

export const SkillsSection: React.FC<{ categories: SkillCategory[] }> = ({ categories }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FF6B00] text-white p-2 rounded-lg">
          <Code size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#1A1A1A] tracking-wide uppercase">
            技能
          </h3>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            Skills & Expertise
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.category}>
            <h4 className="text-sm font-bold text-neutral-600 mb-4 uppercase tracking-wider">
              {category.category}
            </h4>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <SkillBar 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  years={skill.yearsOfExperience}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillBar: React.FC<{ name: string; level: number; years?: number }> = ({ name, level, years }) => {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-[#1A1A1A]">{name}</span>
        <span className="text-xs text-neutral-400 font-mono">
          {years ? `${years}年` : `${level}/10`}
        </span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-full transition-all duration-1000"
          style={{ width: `${level * 10}%` }}
        />
      </div>
    </div>
  );
};

// ============================================
// 模块 3: 推荐资源/工具箱
// ============================================

interface Resource {
  name: string;
  category: string;
  description: string;
  link: string;
  isFavorite?: boolean;
}

export const UsesSection: React.FC<{ resources: Resource[] }> = ({ resources }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(resources.map(r => r.category)));
  
  const filteredResources = selectedCategory
    ? resources.filter(r => r.category === selectedCategory)
    : resources;

  return (
    <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FF6B00] text-white p-2 rounded-lg">
          <Coffee size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#1A1A1A] tracking-wide uppercase">
            工具箱
          </h3>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            Tools I Use
          </span>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-xs font-bold uppercase rounded transition-all ${
            selectedCategory === null
              ? 'bg-[#FF6B00] text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          全部
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-bold uppercase rounded transition-all ${
              selectedCategory === cat
                ? 'bg-[#FF6B00] text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 资源列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.name} resource={resource} />
        ))}
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-[#FF6B00] hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-[#1A1A1A] group-hover:text-[#FF6B00] transition-colors">
            {resource.name}
          </h4>
          {resource.isFavorite && (
            <Bookmark size={14} className="text-[#FF6B00] fill-current" />
          )}
        </div>
        <ExternalLink size={14} className="text-neutral-400 group-hover:text-[#FF6B00] transition-colors" />
      </div>
      <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-2">
        {resource.category}
      </p>
      <p className="text-sm text-neutral-600 leading-relaxed">
        {resource.description}
      </p>
    </a>
  );
};

// ============================================
// 模块 4: 时间线/里程碑
// ============================================

interface Milestone {
  year: string;
  title: string;
  description: string;
  type: 'work' | 'education' | 'achievement' | 'life';
}

export const TimelineSection: React.FC<{ milestones: Milestone[] }> = ({ milestones }) => {
  const typeColors = {
    work: 'bg-blue-500',
    education: 'bg-green-500',
    achievement: 'bg-orange-500',
    life: 'bg-purple-500'
  };

  const typeLabels = {
    work: '工作',
    education: '学习',
    achievement: '成就',
    life: '生活'
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FF6B00] text-white p-2 rounded-lg">
          <Calendar size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#1A1A1A] tracking-wide uppercase">
            时间线
          </h3>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            My Journey
          </span>
        </div>
      </div>

      <div className="relative border-l-2 border-neutral-200 ml-3 space-y-8 pl-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative">
            {/* 时间点 */}
            <div className={`absolute -left-[37px] top-1 w-6 h-6 rounded-full border-4 border-white ${typeColors[milestone.type]}`} />
            
            {/* 内容 */}
            <div className="group">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-bold text-neutral-400 font-mono bg-neutral-100 px-2 py-1 rounded">
                  {milestone.year}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  {typeLabels[milestone.type]}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">
                {milestone.title}
              </h4>
              <p className="text-neutral-600 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 模块 5: 统计数字看板
// ============================================

interface Stat {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatsSection: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
        >
          {stat.icon && (
            <div className="text-[#FF6B00] mb-3">
              {stat.icon}
            </div>
          )}
          <div className="text-3xl font-black text-[#1A1A1A] mb-1">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-xs text-neutral-500 uppercase tracking-wider font-bold">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// 使用示例
// ============================================

/*
在 App.tsx 中使用：

import { NowSection, SkillsSection, UsesSection, TimelineSection, StatsSection } from './components/OptionalModules';

// 在 constants.ts 添加数据：

export const NOW_DATA = {
  location: "上海, 中国",
  working: "开发一个 AI 驱动的内容生成工具",
  learning: "深入学习 LangChain 和 Agent 架构",
  reading: "《黑客与画家》- Paul Graham",
  updated: "2026-02-17"
};

export const SKILLS_DATA = [
  {
    category: "前端开发",
    skills: [
      { name: "React", level: 9, yearsOfExperience: 4 },
      { name: "TypeScript", level: 8, yearsOfExperience: 3 },
      { name: "Tailwind CSS", level: 9, yearsOfExperience: 2 }
    ]
  },
  {
    category: "AI & 自动化",
    skills: [
      { name: "LangChain", level: 8, yearsOfExperience: 1 },
      { name: "OpenAI API", level: 9, yearsOfExperience: 2 },
      { name: "RPA (UiPath)", level: 7, yearsOfExperience: 3 }
    ]
  }
];

export const TOOLS_DATA = [
  {
    name: "Cursor",
    category: "开发工具",
    description: "AI 驱动的代码编辑器，大幅提升编码效率",
    link: "https://cursor.sh",
    isFavorite: true
  },
  {
    name: "Notion",
    category: "生产力",
    description: "我的第二大脑，用于知识管理和项目规划",
    link: "https://notion.so",
    isFavorite: true
  }
];

export const MILESTONES_DATA = [
  {
    year: "2026",
    title: "创立个人工作室",
    description: "开始全职做独立开发和咨询",
    type: "work" as const
  },
  {
    year: "2023",
    title: "加入 Future Tech Labs",
    description: "担任 AI Solutions Architect",
    type: "work" as const
  }
];

export const STATS_DATA = [
  {
    label: "代码行数",
    value: "50K+",
    icon: <Code size={24} />
  },
  {
    label: "自动化项目",
    value: "30",
    suffix: "+"
  }
];

// 然后在 App.tsx 的 About 视图中添加：

<NowSection data={NOW_DATA} />
<SkillsSection categories={SKILLS_DATA} />
<UsesSection resources={TOOLS_DATA} />
<TimelineSection milestones={MILESTONES_DATA} />
<StatsSection stats={STATS_DATA} />

*/
