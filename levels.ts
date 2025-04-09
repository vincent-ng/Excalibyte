export type LevelConfig = {
  id: string
  categoryId: string
  level: number
  name: string
  description: string
  text: string
  heroHP: number
  bossHP: number
  heroDamage: number
  bossDamageMin: number
  bossDamageMax: number
}

export type LevelCategory = {
  id: string
  name: {
    zh: string
    en: string
  }
  description: {
    zh: string
    en: string
  }
  levels: LevelConfig[]
}

// Create level categories with 5 sub-levels each
export const levelCategories: LevelCategory[] = [
  {
    id: "beginner",
    name: {
      zh: "初级",
      en: "Beginner",
    },
    description: {
      zh: "熟悉键盘布局和基本按键",
      en: "Familiarize with keyboard layout and basic keys",
    },
    levels: [
      {
        id: "beginner-1",
        categoryId: "beginner",
        level: 1,
        name: "1-1",
        description: "Home row keys",
        text: "asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;",
        heroHP: 100,
        heroDamage: 10,
        bossHP: 640, // Will re-calculate as text.length * heroDamage
        bossDamageMin: 2,
        bossDamageMax: 5,
      },
      {
        id: "beginner-2",
        categoryId: "beginner",
        level: 2,
        name: "1-2",
        description: "Top row keys",
        text: "qwert yuiop qwert yuiop qwert yuiop qwert yuiop qwert yuiop qwert yuiop qwert yuiop",
        heroHP: 100,
        heroDamage: 10,
        bossHP: 700,
        bossDamageMin: 2,
        bossDamageMax: 5,
      },
      {
        id: "beginner-3",
        categoryId: "beginner",
        level: 3,
        name: "1-3",
        description: "Bottom row keys",
        text: "zxcvb nm,. zxcvb nm,. zxcvb nm,. zxcvb nm,. zxcvb nm,. zxcvb nm,. zxcvb nm,.",
        heroHP: 100,
        heroDamage: 10,
        bossHP: 640,
        bossDamageMin: 2,
        bossDamageMax: 5,
      },
      {
        id: "beginner-4",
        categoryId: "beginner",
        level: 4,
        name: "1-4",
        description: "Numbers and symbols",
        text: "1234567890 1234567890 !@#$%^&*() !@#$%^&*() 1234567890 !@#$%^&*()",
        heroHP: 100,
        heroDamage: 10,
        bossHP: 600,
        bossDamageMin: 2,
        bossDamageMax: 5,
      },
      {
        id: "beginner-5",
        categoryId: "beginner",
        level: 5,
        name: "1-5",
        description: "Mixed basic keys",
        text: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. 1234567890 !@#$%^&*()",
        heroHP: 100,
        heroDamage: 10,
        bossHP: 1120,
        bossDamageMin: 2,
        bossDamageMax: 5,
      },
    ],
  },
  {
    id: "intermediate",
    name: {
      zh: "中级",
      en: "Intermediate",
    },
    description: {
      zh: "练习常用单词和简单句子",
      en: "Practice common words and simple sentences",
    },
    levels: [
      {
        id: "intermediate-1",
        categoryId: "intermediate",
        level: 1,
        name: "2-1",
        description: "Short words",
        text: "cat dog sun moon star fish bird tree book lamp desk chair door wall floor roof window house plant water fire earth wind time year day week hour",
        heroHP: 120,
        heroDamage: 15,
        bossHP: 1680,
        bossDamageMin: 4,
        bossDamageMax: 8,
      },
      {
        id: "intermediate-2",
        categoryId: "intermediate",
        level: 2,
        name: "2-2",
        description: "Simple sentences",
        text: "I am happy. You are smart. She is tall. He is strong. We are friends. They are busy. The sun is bright. The moon is full. Birds can fly. Fish can swim.",
        heroHP: 120,
        heroDamage: 15,
        bossHP: 1650,
        bossDamageMin: 4,
        bossDamageMax: 8,
      },
      {
        id: "intermediate-3",
        categoryId: "intermediate",
        level: 3,
        name: "2-3",
        description: "Questions and answers",
        text: "What is your name? My name is John. Where do you live? I live in New York. How old are you? I am twenty-five years old. What do you do? I am a student.",
        heroHP: 120,
        heroDamage: 15,
        bossHP: 1950,
        bossDamageMin: 4,
        bossDamageMax: 8,
      },
      {
        id: "intermediate-4",
        categoryId: "intermediate",
        level: 4,
        name: "2-4",
        description: "Compound sentences",
        text: "I went to the store, and I bought some apples. She studied hard, so she passed the exam. He was tired, but he continued working. They wanted to go out, yet it was raining heavily.",
        heroHP: 120,
        heroDamage: 15,
        bossHP: 2100,
        bossDamageMin: 4,
        bossDamageMax: 8,
      },
      {
        id: "intermediate-5",
        categoryId: "intermediate",
        level: 5,
        name: "2-5",
        description: "Paragraphs",
        text: "The sun was setting behind the mountains. The sky was painted with shades of orange and pink. Birds were returning to their nests. People were heading home after a long day of work. The streets were getting quieter. Soon, the stars would appear in the night sky.",
        heroHP: 120,
        heroDamage: 15,
        bossHP: 3000,
        bossDamageMin: 4,
        bossDamageMax: 8,
      },
    ],
  },
  {
    id: "advanced",
    name: {
      zh: "高级",
      en: "Advanced",
    },
    description: {
      zh: "挑战复杂句子和标点符号",
      en: "Challenge complex sentences and punctuation",
    },
    levels: [
      {
        id: "advanced-1",
        categoryId: "advanced",
        level: 1,
        name: "3-1",
        description: "Complex sentences",
        text: "Although it was raining heavily, they decided to go for a walk. The book, which was written by a famous author, became a bestseller. When the alarm went off, everyone rushed to the exit. Since you've been working hard, you deserve a break.",
        heroHP: 150,
        heroDamage: 20,
        bossHP: 4400,
        bossDamageMin: 6,
        bossDamageMax: 12,
      },
      {
        id: "advanced-2",
        categoryId: "advanced",
        level: 2,
        name: "3-2",
        description: "Quotes and dialogue",
        text: '"Do you know the way to the library?" asked the stranger. "Yes," I replied, "it\'s two blocks down and then turn right." "Thank you very much!" he said with a smile. "You\'re welcome," I responded, watching him walk away.',
        heroHP: 150,
        heroDamage: 20,
        bossHP: 4000,
        bossDamageMin: 6,
        bossDamageMax: 12,
      },
      {
        id: "advanced-3",
        categoryId: "advanced",
        level: 3,
        name: "3-3",
        description: "Parentheses and brackets",
        text: "The research paper (published in 2023) contains several important findings. The experiment [as described in section 3.2] yielded unexpected results. Many scientists (including Dr. Smith and Dr. Johnson) were surprised by these outcomes.",
        heroHP: 150,
        heroDamage: 20,
        bossHP: 4000,
        bossDamageMin: 6,
        bossDamageMax: 12,
      },
      {
        id: "advanced-4",
        categoryId: "advanced",
        level: 4,
        name: "3-4",
        description: "Special characters",
        text: "The company's profit increased by 25% last quarter. The temperature was -10 degree that winter morning. The password must contain at least one special character (@, #, $, %, &, *). Please email your resume to jobs@example.com.",
        heroHP: 150,
        heroDamage: 20,
        bossHP: 4000,
        bossDamageMin: 6,
        bossDamageMax: 12,
      },
      {
        id: "advanced-5",
        categoryId: "advanced",
        level: 5,
        name: "3-5",
        description: "Technical writing",
        text: 'The function f(x) = x^2 + 2x + 1 can be factored as (x + 1)^2. In HTML, the <div> element is a container that divides the page into sections. SQL query "SELECT * FROM users WHERE age > 18" returns all users older than 18. The HTTP status code 404 means "Not Found".',
        heroHP: 150,
        heroDamage: 20,
        bossHP: 5000,
        bossDamageMin: 6,
        bossDamageMax: 12,
      },
    ],
  },
]

function correctBossHP(levelCategories: LevelCategory[]) {
  levelCategories.forEach(category => {
    category.levels.forEach(level => {
      level.bossHP = level.text.length * level.heroDamage;
    })
  })
}
correctBossHP(levelCategories)

// Helper function to get all levels flattened
export const getAllLevels = (): LevelConfig[] => {
  return levelCategories.flatMap((category) => category.levels)
}

// Helper function to get a specific level by ID
export const getLevel = (levelId: string): LevelConfig => {
  const allLevels = getAllLevels()
  const level = allLevels.find((l) => l.id === levelId)
  return level || allLevels[0] // Default to first level if not found
}

// Helper function to get levels by category
export const getLevelsByCategory = (categoryId: string): LevelConfig[] => {
  const category = levelCategories.find((c) => c.id === categoryId)
  return category ? category.levels : []
}

// Helper function to get a category by ID
export const getCategory = (categoryId: string): LevelCategory | undefined => {
  return levelCategories.find((c) => c.id === categoryId)
}
