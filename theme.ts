// ============================================
// 主题和颜色配置
// ============================================

export const THEMES = {
  // 橙色主题（当前默认）
  orange: {
    name: "Orange",
    primary: "#FF6B00",
    primaryDark: "#CC5500",
    primaryLight: "#FF8533",
    background: "#EEEDEB",
    surface: "#FFFFFF",
    text: "#1F1F1F",
    textSecondary: "#555555",
    border: "#D4D4D4",
  },

  // 蓝色主题（专业）
  blue: {
    name: "Blue",
    primary: "#2563EB",
    primaryDark: "#1E40AF",
    primaryLight: "#3B82F6",
    background: "#F0F4F8",
    surface: "#FFFFFF",
    text: "#1A202C",
    textSecondary: "#4A5568",
    border: "#CBD5E0",
  },

  // 绿色主题（自然）
  green: {
    name: "Green",
    primary: "#10B981",
    primaryDark: "#059669",
    primaryLight: "#34D399",
    background: "#F0FDF4",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#4B5563",
    border: "#D1D5DB",
  },

  // 紫色主题（创意）
  purple: {
    name: "Purple",
    primary: "#8B5CF6",
    primaryDark: "#7C3AED",
    primaryLight: "#A78BFA",
    background: "#F5F3FF",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
  },

  // 深色主题
  dark: {
    name: "Dark",
    primary: "#FF6B00",
    primaryDark: "#FF8533",
    primaryLight: "#FFA366",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    border: "#334155",
  },
};

export type ThemeName = keyof typeof THEMES;

// ============================================
// 主题切换 Hook
// ============================================

import { useState, useEffect } from 'react';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('orange');

  // 从 localStorage 读取主题
  useEffect(() => {
    const saved = localStorage.getItem('theme') as ThemeName;
    if (saved && THEMES[saved]) {
      setCurrentTheme(saved);
    }
  }, []);

  // 保存主题到 localStorage
  const changeTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    
    // 应用 CSS 变量
    const colors = THEMES[theme];
    Object.entries(colors).forEach(([key, value]) => {
      if (key !== 'name') {
        document.documentElement.style.setProperty(
          `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
          value
        );
      }
    });
  };

  return {
    currentTheme,
    changeTheme,
    theme: THEMES[currentTheme],
  };
}

// ============================================
// 使用示例
// ============================================

/*
1. 在 index.html 的 <style> 中添加 CSS 变量：

:root {
  --color-primary: #FF6B00;
  --color-primary-dark: #CC5500;
  --color-primary-light: #FF8533;
  --color-background: #EEEDEB;
  --color-surface: #FFFFFF;
  --color-text: #1F1F1F;
  --color-text-secondary: #555555;
  --color-border: #D4D4D4;
}

2. 在 App.tsx 中使用：

import { useTheme } from './theme';

function App() {
  const { currentTheme, changeTheme, theme } = useTheme();

  return (
    <div style={{ 
      backgroundColor: theme.background,
      color: theme.text 
    }}>
      // 主题切换按钮
      <ThemeSwitcher 
        currentTheme={currentTheme} 
        onChangeTheme={changeTheme} 
      />
    </div>
  );
}

3. 在 Tailwind 类名中使用变量：

<button className="bg-[var(--color-primary)] text-white">
  按钮
</button>

或者直接使用 style 属性：

<div style={{ 
  backgroundColor: theme.primary,
  color: theme.text 
}}>
  内容
</div>
*/

// ============================================
// 主题切换器组件
// ============================================

import React from 'react';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: ThemeName;
  onChangeTheme: (theme: ThemeName) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onChangeTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
        aria-label="Change theme"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 主题选择器 */}
          <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 z-50 min-w-[200px]">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-3 py-2">
              选择主题
            </p>
            {(Object.keys(THEMES) as ThemeName[]).map((themeName) => (
              <button
                key={themeName}
                onClick={() => {
                  onChangeTheme(themeName);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-50 transition-colors ${
                  currentTheme === themeName ? 'bg-neutral-100' : ''
                }`}
              >
                <span className="text-sm font-medium">
                  {THEMES[themeName].name}
                </span>
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: THEMES[themeName].primary }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================
// 颜色快速替换工具
// ============================================

export function replaceColorInProject(oldColor: string, newColor: string) {
  // 这是一个辅助函数，用于在控制台快速测试颜色
  console.log(`
要全局替换颜色，请在项目根目录运行：

Mac/Linux:
find ./personal-website -name "*.tsx" -type f -exec sed -i '' 's/${oldColor}/${newColor}/g' {} \\;

Windows (PowerShell):
Get-ChildItem -Path ./personal-website -Filter *.tsx -Recurse | ForEach-Object { (Get-Content $_.FullName) -replace '${oldColor}', '${newColor}' | Set-Content $_.FullName }

或者使用 VS Code 全局搜索替换（推荐）：
1. 按 Cmd/Ctrl + Shift + H
2. 搜索: ${oldColor}
3. 替换: ${newColor}
4. 点击 "Replace All"
  `);
}

// 在浏览器控制台使用：
// replaceColorInProject('#FF6B00', '#2563EB')

// ============================================
// 预设配色方案
// ============================================

export const COLOR_SCHEMES = {
  // 专业商务
  professional: {
    primary: "#2563EB",    // 蓝色
    secondary: "#64748B",  // 灰蓝
    accent: "#F59E0B",     // 金色
  },

  // 创意设计
  creative: {
    primary: "#8B5CF6",    // 紫色
    secondary: "#EC4899",  // 粉色
    accent: "#10B981",     // 绿色
  },

  // 科技感
  tech: {
    primary: "#06B6D4",    // 青色
    secondary: "#6366F1",  // 靛蓝
    accent: "#F43F5E",     // 红色
  },

  // 温暖人文
  warm: {
    primary: "#F59E0B",    // 橙色
    secondary: "#EF4444",  // 红色
    accent: "#84CC16",     // 黄绿
  },

  // 极简黑白
  minimal: {
    primary: "#18181B",    // 深灰
    secondary: "#71717A",  // 中灰
    accent: "#E4E4E7",     // 浅灰
  },
};

// ============================================
// Tailwind 配置生成器
// ============================================

export function generateTailwindConfig(themeName: ThemeName) {
  const theme = THEMES[themeName];
  
  return `
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${theme.primary}',
          dark: '${theme.primaryDark}',
          light: '${theme.primaryLight}',
        },
        background: '${theme.background}',
        surface: '${theme.surface}',
        text: {
          DEFAULT: '${theme.text}',
          secondary: '${theme.textSecondary}',
        },
        border: '${theme.border}',
      },
    },
  },
}

// 然后在代码中使用：
// bg-primary
// text-primary
// border-border
// 等等
  `;
}

// 在控制台使用：
// console.log(generateTailwindConfig('blue'))
