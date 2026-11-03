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
    ['(your email)', null],
    ['GitHub', 'https://github.com/potatates'],
    ['Résumé', null]
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
      ['zx-walk', 'The floor map prototype: a dot for every font, and the character 永 drawn in the font you stand on'],
      ['zx-compare', 'The Zixiang compare page, with fonts side by side'],
      ['zx-glyphs', 'The character 永 in every font in the collection'],
      ['zx-site', 'The Zixiang home page, browsing all fonts'],
      ['zx-map', 'The similarity map, with fonts colored by family']
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
      ['st-structure', 'A glowing structure of caught lights in a dark forest over water'],
      ['st-reveal', 'The ending, where the structure you built is replayed'],
      ['st-crack', 'A cracked light being pulled out of the structure'],
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
      ['en-home', 'The home page with the enneagram symbol'],
      ['en-dark', 'Beings of Light: reading the preface by a circle of light'],
      ['en-card', 'A saved result card for Type 4'],
      ['en-type', 'A type page with growth and stress lines on the symbol'],
      ['en-result', 'The result page after the check']
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
    idea: 'A cat café where the care you give is what you earn with. (draft line)',
    beats: [
      ['The question', '(what the hackathon asked, in your words)'],
      ['The move', 'Adopt cats, care for them, and merge pastries and coffee to serve the café’s customers.'],
      ['What I’d tighten', '(the choice you want to make more intentional)']
    ],
    credits: [['Made at', '(hackathon name)'], ['Team', '(names?)'], ['Tools', 'Figma']],
    link: null,
    images: [
      ['cc-shop', 'The cat shop, with cats to adopt for coins'],
      ['cc-care', 'Caring for a cat with yarn, toys, water and food'],
      ['cc-merge', 'The merge board, combining pastries for a customer']
    ]
  }
];
