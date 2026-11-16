/*
  All the words and pictures on the site live here.
  Edit this file to change text; the layout follows on its own.
  Each image is [file name in img/ without .jpg, short description for screen readers].
  The first image of a project is the one that leads when the project opens.
*/
window.SITE = {
  name: 'Mia Ma',
  line: 'I turn invisible structures into spaces people can <em>move through.</em>',
  sub: 'Fonts, beliefs, a personality system, friendships and a cat café, each made into something you can walk through, touch or play.',
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
      ['zx-tour', 'A walk through Zixiang: home, a font and its similar fonts, the style and guide pages, then compare', 'video']
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
      ['st-structure', 'Catching lights and stacking them into a glowing structure as the forest wakes', 'video'],
      ['st-crack', 'Pulling out a cracked light: everything resting on it shakes and falls', 'video'],
      ['st-reveal', 'The ending, where the structure you built is replayed', 'video'],
      ['st-web', 'The first version: a web of lights with color rules'],
      ['st-mush', 'Mushrooms waking up as the structure grows']
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
      ['en-flow', 'From the home page into the test: one choice per screen', 'video'],
      ['en-result', 'Rating the last statements, then the result page', 'video'],
      ['en-type', 'A type page, following its growth line to another type and back', 'video'],
      ['en-dark', 'Beings of Light: turning the lights off and reading by a circle of light', 'video'],
      ['en-card', 'A saved result card for Type 4']
    ]
  },
  {
    id: 'fc', side: 'Side B · 1', title: 'Friend Clock', kind: 'iOS StandBy concept · class',
    idea: 'A clock that tells you where your people are, and how close.',
    beats: [
      ['The question', 'Find My knows where your friends are. What would it take to feel how close they are?'],
      ['The move', 'Rings show time-zone distance. Each circle’s size shows how often you talked this week.'],
      ['What I’d change', '(one honest line from you)']
    ],
    credits: [['Idea', 'Mia Ma'], ['Team', 'Mia Ma, Palos Liu, Echo Dong'], ['Tools', 'Figma']],
    link: null,
    images: [
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
      ['cc-shop', 'The cat shop, with cats to adopt for coins'],
      ['cc-care', 'Caring for a cat with yarn, toys, water and food'],
      ['cc-merge', 'The merge board, combining pastries for a customer']
    ]
  }
];
