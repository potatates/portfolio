/*
  All the words and pictures on the site live here.
  Edit this file to change text; the layout follows on its own.
  Each image is [file name in img/ without .jpg, short description for screen readers].
  The first image of a project is the one that leads when the project opens.
*/
window.SITE = {
  name: 'Mia Ma',
  line: 'I design and build <em>websites, apps and small games.</em>',
  sub: 'Right now I make ads and websites at COL Group. Here are five things I made: a Chinese font finder, a game about letting go of a belief, an Enneagram guide, a clock for friends and a cat café game.',
  thanks: 'Thanks for looking.',
  contact: [
    ['25miama@gmail.com', 'mailto:25miama@gmail.com'],
    ['Résumé', 'resume.html'],
    ['LinkedIn', 'https://www.linkedin.com/in/miayma/'],
    ['GitHub', 'https://github.com/potatates']
  ]
};

window.PROJECTS = [
  {
    id: 'zx', side: 'Side A · 1', title: '字相 Zixiang', kind: 'Web · data · 2026',
    idea: 'Typefaces have a feel you can sense but not name. I measured it.',
    beats: [
      ['The question', 'Why do two Chinese fonts feel close when nobody can say how?'],
      ['The move', 'I scored 282 free Chinese fonts on 12 stylistic axes, then laid them out so distance means difference.'],
      ['What it opened', 'Next, the map goes on a floor. You walk from one style to another, and the character 永 changes under your feet.']
    ],
    credits: [['Role', 'Research, design, code'], ['Tools', 'Python, WebGL']],
    link: 'https://zixiangfont.com',
    images: [
      ['zx-tour', 'A walk through Zixiang: the guide, the 楷体 list, a font and its similar fonts with a filter, compare, then the style pages', 'video']
    ]
  },
  {
    id: 'st', side: 'Side A · 2', title: 'The Structural Trap', kind: 'Game · 2026',
    idea: 'A belief that holds others up is the hardest one to pull out.',
    beats: [
      ['The question', 'From my essay: why do false beliefs resist revision?'],
      ['The move', 'The lights you catch stack into a structure that lights the dark. When one cracks, pulling it drops everything resting on it.'],
      ['What I cut', 'The first version was a web with color and pulse rules. Players got lost, so I cut it to one idea: collapse.']
    ],
    credits: [['Role', 'Concept, design, code, sound'], ['Tools', 'Three.js, Tone.js']],
    link: 'https://potatates.github.io/structural-trap/',
    images: [
      ['st-tour', 'The Structural Trap, with sound: catching and stacking lights as the forest wakes, a cracked light pulled out so everything on it falls, then the ending replay', 'sound']
    ]
  },
  {
    id: 'en', side: 'Side A · 3', title: 'The Wisdom of the Enneagram', kind: 'Web · 2026',
    idea: 'A book already had the method. I made it a path you walk one step at a time.',
    beats: [
      ['The question', 'The book’s quick test is right about 70% of the time. How does a site stay honest about that?'],
      ['The move', 'A quick test, then fifteen statements to check it. The result says plainly whether the two agree.'],
      ['What changed', 'From my own Figma: one choice per screen, and the page asks before it explains.']
    ],
    credits: [['Role', 'Design, code'], ['Source', 'Riso & Hudson']],
    link: 'https://potatates.github.io/enneagram/',
    images: [
      ['en-tour', 'The Wisdom of the Enneagram: the quick test, a few of the check statements, the result, then the type pages', 'video']
    ]
  },
  {
    id: 'fc', side: 'Side B · 1', title: 'Friend Clock', kind: 'iOS StandBy concept · class',
    idea: 'A clock that tells you where your people are, and how close.',
    beats: [
      ['The question', 'Find My knows where your friends are. What would it take to feel how close they are?'],
      ['The move', 'Rings show time-zone distance. Each circle’s size shows how often you talked this week.']
    ],
    credits: [['Idea', 'Mia Ma'], ['Team', 'Mia Ma, Palos Liu, Echo Dong'], ['Tools', 'Figma']],
    link: null,
    images: [
      ['fc-tour', 'Clicking through Friend Clock: the clock in dark, pink, yellow and green themes, light mode as the day passes, then choosing friends', 'video'],
      ['fc-dark', 'The StandBy clock: friends as glowing circles on rings beside the time'],
      ['fc-pink', 'The clock in a pink color theme'],
      ['fc-light', 'The clock in light mode'],
      ['fc-pick', 'Choosing which friends appear on the clock']
    ]
  },
  {
    id: 'cc', side: 'Side B · 2', title: 'The Coffee Cats', kind: 'Game · hackathon',
    idea: 'An idle game for decompressing: no timers, no way to lose, just cats to care for.',
    beats: [
      ['The question', 'What if a game helped you decompress instead of winding you up?'],
      ['The move', 'Adopt cats, care for them, and merge pastries and coffee to serve the café’s customers.'],
      ['Why it works', 'Repetition calms. Built with neurodivergent players in mind: needs drop slowly, so you set the pace.']
    ],
    credits: [['Made at', 'WashU Hackathon 2025 · winner'], ['Team', 'The Coffee Cats'], ['Role', 'Pitch, UI/UX design, all game art'], ['Tools', 'Figma']],
    link: null,
    images: [
      ['cc-tour', 'Playing The Coffee Cats prototype: picking a cat, giving it yarn, then making and merging pastries to fill a customer order', 'video'],
      ['cc-shop', 'The cat shop, with cats to adopt for coins'],
      ['cc-care', 'Caring for a cat with yarn, toys, water and food'],
      ['cc-merge', 'The merge board, combining pastries for a customer']
    ]
  }
];
