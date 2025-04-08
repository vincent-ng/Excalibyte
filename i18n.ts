// Language configuration for the typing game

export type LanguageStrings = {
  // Game title and UI
  gameTitle: string
  levelSelect: string
  typingBattle: string
  changeLevel: string
  playAgain: string
  select: string

  // Stats and metrics
  accuracy: string
  progress: string
  hero: string
  boss: string

  // Help tooltip
  howToPlay: string
  tipType: string
  tipCorrect: string
  tipIncorrect: string
  tipComplete: string
  tipClick: string

  // Battle log
  battleNotStarted: string
  heroAttack: string
  bossAttack: string
  heroWins: string
  bossWins: string
  finalAccuracy: string
  completion: string

  // Virtual keyboard
  virtualKeyboard: string
  space: string

  // Level descriptions
  beginnerName: string
  beginnerDesc: string
  intermediateName: string
  intermediateDesc: string
  advancedName: string
  advancedDesc: string

  // Attributes
  heroHP: string
  bossHP: string
  heroDamage: string

  // Battle log
  battleLog: string

  // Level info
  textLength: string
  characters: string
}

export const languages: Record<string, LanguageStrings> = {
  zh: {
    // Game title and UI
    gameTitle: "打字决战",
    levelSelect: "关卡选择",
    typingBattle: "打字决战",
    changeLevel: "更换关卡",
    playAgain: "再玩一次",
    select: "选择",

    // Stats and metrics
    accuracy: "准确率",
    progress: "进度",
    hero: "勇者",
    boss: "魔王",

    // Help tooltip
    howToPlay: "游戏玩法",
    tipType: "输入高亮显示的字符（黄色背景）",
    tipCorrect: "正确输入使勇者攻击魔王",
    tipIncorrect: "错误输入会让魔王攻击勇者",
    tipComplete: "以高准确率完成文本即可获胜！",
    tipClick: "点击任意位置聚焦输入区域",

    // Battle log
    battleNotStarted: "战斗尚未开始...开始输入以开始战斗！",
    heroAttack: "勇者正确输入 {typedChar} ，释放魔法攻击，对魔王造成 {damage} 点伤害！",
    bossAttack: "输入 {typedChar} 错误！魔王趁机攻击，对勇者造成 {damage} 点伤害！",
    heroWins: "魔王倒下了！勇者获胜！",
    bossWins: "勇者倒下了！魔王获胜！",
    finalAccuracy: "最终准确率",
    completion: "完成度",

    // Virtual keyboard
    virtualKeyboard: "虚拟键盘",
    space: "空格",

    // Level descriptions
    beginnerName: "初级",
    beginnerDesc: "熟悉键盘布局和基本按键",
    intermediateName: "中级",
    intermediateDesc: "练习常用单词和简单句子",
    advancedName: "高级",
    advancedDesc: "挑战复杂句子和标点符号",

    // Attributes
    heroHP: "勇者生命值",
    bossHP: "魔王生命值",
    heroDamage: "勇者伤害",

    // Battle log
    battleLog: "战斗记录",

    // Level info
    textLength: "文本长度",
    characters: "字符",
  },

  en: {
    // Game title and UI
    gameTitle: "Typing Battle",
    levelSelect: "Level Select",
    typingBattle: "Typing Battle",
    changeLevel: "Change Level",
    playAgain: "Play Again",
    select: "Select",

    // Stats and metrics
    accuracy: "Accuracy",
    progress: "Progress",
    hero: "Hero",
    boss: "Boss",

    // Help tooltip
    howToPlay: "How to play",
    tipType: "Type the highlighted character (yellow background)",
    tipCorrect: "Correct typing makes your hero attack the boss",
    tipIncorrect: "Incorrect typing allows the boss to attack you",
    tipComplete: "Complete the text with high accuracy to win!",
    tipClick: "Click anywhere to focus the typing area",

    // Battle log
    battleNotStarted: "Battle has not started yet... Start typing to begin!",
    heroAttack: "Hero typed {typedChar} correctly and cast a spell, dealing {damage} damage to the Boss!",
    bossAttack: "Typing {typedChar} error! Boss seized the chance to attack, dealing {damage} damage to the Hero!",
    heroWins: "The boss has been defeated! Hero wins!",
    bossWins: "The hero has fallen! Boss wins!",
    finalAccuracy: "Final Accuracy",
    completion: "Completion",

    // Virtual keyboard
    virtualKeyboard: "Virtual Keyboard",
    space: "Space",

    // Level descriptions
    beginnerName: "Beginner",
    beginnerDesc: "Familiarize with keyboard layout and basic keys",
    intermediateName: "Intermediate",
    intermediateDesc: "Practice common words and simple sentences",
    advancedName: "Advanced",
    advancedDesc: "Challenge complex sentences and punctuation",

    // Attributes
    heroHP: "Hero HP",
    bossHP: "Boss HP",
    heroDamage: "Hero Damage",

    // Battle log
    battleLog: "Battle Log",

    // Level info
    textLength: "Text Length",
    characters: "characters",
  },
}

export const getTranslation = (
  lang: string,
  key: keyof LanguageStrings,
  params?: Record<string, string | number>,
): string => {
  const translation = languages[lang]?.[key] || languages.zh[key]

  if (params) {
    return Object.entries(params).reduce((str, [param, value]) => {
      return str.replace(`{${param}}`, String(value))
    }, translation)
  }

  return translation
}
