import { SiteConfig } from './types';

export const CONFIG: SiteConfig = {
  profile: {
    name: "Pi",
    title: "Explorer & Builder",
    tagline: "Bridging the gap between AI automation and human creativity.",
    // Updated: Using the new avatar image provided by user
    avatarUrl: "/head.jpg", 
    email: "pi33ymym@gmail.com",
    about: [
      "我是派派，大学在读，做过 5 段不同方向的实习。曾经也为求职和方向焦虑过，后来想明白了——All in AI，用好 AI 的人在任何岗位都能创造价值。现在的我看好一人公司和个人品牌，正在这条路上边走边建。",
      "不喜欢被设定好的路线(学校)，更想自己去创造体验。",
      "入坑了户外、健身和网球，运动和山野让我确认自己还活着。",
      "梦想是养一只猫，走遍各国的数字游民社区，一边远程工作，一边看世界。"
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
    { platform: "小红书", url: "https://www.xiaohongshu.com/user/profile/61f209d0000000001000fe95", iconName: "Xiaohongshu" },
  ],
  experience: [
    {
      id: "1",
      role: "AI 模型评测",
      company: "前沿 AI 公司",
      period: "2026.03 - 至今",
      description: "通过对大模型的系统性评测，深入理解了 Agent 的工作原理与各模型的能力边界。从 Claude Code 到各类推理模型，建立起对 AI 产品能力的第一手认知。",
      tags: ["LLM", "Agent", "模型评测"]
    },
    {
      id: "2",
      role: "效率工程 · 飞书多维表格 & RPA",
      company: "得到",
      period: "2025.10 - 2026.01",
      description: "把飞书多维表格玩到极致——独立搭建了跨年演讲管理系统、电商管理系统等业务工具。同期考取影刀认证工程师，用 RPA 自动化重复流程，开始相信「一个人也能撑起一套系统」。",
      tags: ["飞书多维表格", "RPA", "影刀"]
    },
    {
      id: "3",
      role: "算法应用实习",
      company: "国产芯片厂",
      period: "2024.10 - 2025.03",
      description: "首次接触算法侧工作，复现模型、调参、训练，日复一日。虽然训到厌倦，但也因此上手实践了大模型，深度学习调参，入门了。",
      tags: ["算法", "模型训练", "芯片"]
    },
    {
      id: "4",
      role: "产品运营实习",
      company: "百度",
      period: "2024.03 - 2024.06",
      description: "第一份互联网实习，在大厂建立了产品思维的基本功：需求拆解、跨团队协作、数据驱动决策。更重要的是，看清了大公司的运作方式——然后决定走一条自己的路。",
      tags: ["产品运营", "互联网", "大厂"]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Data Insight Agent",
      description: "基于 ReAct Agent 架构的智能数据分析系统。用自然语言对话即可完成 SQL 查询、数据可视化、统计分析和报告生成，让非技术人员也能玩转数据。",
      tags: ["LangChain", "Agent", "数据分析"],
      link: "https://github.com/PI-33/Data-Insight-Agent"
    },
    {
      id: "p2",
      title: "赛博算命师",
      description: "一个用 AI 算命的趣味应用——输入你的问题，AI 帮你解卦。用好玩的方式让普通人感受 AI 的能力，部署在 ModelScope 上。",
      tags: ["AI 应用", "创意项目", "ModelScope"],
      link: "https://modelscope.cn/studios/Pi33ymym/CyberFortune_Telling"
    },
    {
      id: "p3",
      title: "MACD 量化笔记",
      description: "技术分析自学项目，从 MACD 指标的基本概念到 Python 可视化实现，适合量化入门。边学边记录，把学习过程变成可复用的内容。",
      tags: ["量化金融", "Python", "数据可视化"],
      link: "https://github.com/PI-33/macd-learning-notebook"
    },
    {
      id: "p4",
      title: "Pi's Skills",
      description: "我的个人技能库——把常用的工作流、Prompt、自动化模板整理成可复用的 Skill，持续更新中。做一个自己的弹药库。",
      tags: ["效率工具", "Skill", "知识管理"],
      link: "https://github.com/PI-33/Skills"
    }
  ]
};