export type RichTextSpan =
  | string
  | {
      text: string
      bold?: boolean
      italic?: boolean
      href?: string
    }

export type RichTextNode =
  | {
      type: 'paragraph'
      children: RichTextSpan[]
    }
  | {
      type: 'heading'
      level: 3 | 4
      children: RichTextSpan[]
    }
  | {
      type: 'list'
      style: 'ordered' | 'unordered'
      items: RichTextSpan[][]
    }

export type RichTextDocument = RichTextNode[]

export type ImageMedia = {
  kind: 'image'
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type VideoMedia = {
  kind: 'video'
  src: string
  poster: string
  label: string
  caption?: string
}

export type CaseStudyMedia = ImageMedia | VideoMedia

export type CaseStudyMetric = {
  value: string
  label: string
}

export type CaseStudyBlock =
  | {
      type: 'richText'
      id: string
      eyebrow?: string
      heading?: string
      body: RichTextDocument
    }
  | {
      type: 'media'
      id: string
      media: CaseStudyMedia
      width?: 'contained' | 'wide' | 'full'
    }
  | {
      type: 'contentMedia'
      id: string
      eyebrow?: string
      heading: string
      body: RichTextDocument
      media: CaseStudyMedia
      metrics?: CaseStudyMetric[]
      layout?: 'stacked' | 'split'
    }
  | {
      type: 'metrics'
      id: string
      heading?: string
      metrics: CaseStudyMetric[]
    }
  | {
      type: 'quote'
      id: string
      quote: string
      attribution: string
      relationship?: string
      logo?: ImageMedia
    }

export type CaseStudyDetail = {
  label: string
  value: string
}

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  seo: {
    title: string
    description: string
  }
  published: boolean
  details: CaseStudyDetail[]
  heroMedia: ImageMedia
  blocks: CaseStudyBlock[]
  relatedProjectSlugs: string[]
}

const paragraph = (...children: RichTextSpan[]): RichTextNode => ({
  type: 'paragraph',
  children,
})

const dqAsset = (filename: string) => `/images/work/dairy-queen/${filename}`

const dairyQueen: CaseStudy = {
  slug: 'dairy-queen',
  title: 'Dairy Queen',
  summary: 'Driving outcomes for a classic brand',
  seo: {
    title: 'Dairy Queen Case Study',
    description:
      'How Jake Martin improved Dairy Queen digital conversion, loyalty, ordering, and customer satisfaction across native apps and the web.',
  },
  published: true,
  details: [
    { label: 'My role', value: 'Sole designer' },
    { label: 'The team', value: '1 design, 4 product, 6 engineering' },
    { label: 'Timeframe', value: 'Sept 2022 – Aug 2023' },
    { label: 'Project phase', value: 'Post-launch enhancements' },
    { label: 'Platform', value: 'Native app + web' },
    { label: 'Project type', value: 'Agency' },
  ],
  heroMedia: {
    kind: 'image',
    src: dqAsset('hero.png'),
    alt: 'Dairy Queen website menu and mobile rewards account experience',
    width: 1680,
    height: 1324,
  },
  blocks: [
    {
      type: 'metrics',
      id: 'project-impact',
      heading: 'Project impact',
      metrics: [
        {
          value: '#1 app',
          label: 'Food and Drink category, multiple times',
        },
        { value: '88% ↑', label: 'increased digital revenue YoY' },
        { value: '46% ↑', label: 'increased conversion rate YoY' },
        { value: '63% ↑', label: 'increased order volume' },
      ],
    },
    {
      type: 'contentMedia',
      id: 'audit',
      eyebrow: 'Audit and feature prioritization',
      heading: "Taking DQ's digital footprint to the next level",
      body: [
        paragraph(
          "After the initial launch of DQ's website and native apps, I performed a comprehensive audit of both platforms."
        ),
        paragraph(
          'I scored each item according to the RICE prioritization framework, identifying the enhancements that would drive the most ROI.'
        ),
        paragraph(
          "The audit is still being used in conjunction with DQ's business goals to determine the project roadmap."
        ),
      ],
      media: {
        kind: 'image',
        src: dqAsset('audit.png'),
        alt: 'RICE prioritization audit showing scored Dairy Queen product opportunities',
        width: 2240,
        height: 1530,
      },
    },
    {
      type: 'contentMedia',
      id: 'account-creation',
      eyebrow: 'Feature redesign',
      heading: 'Getting users through account creation',
      body: [
        paragraph(
          'Working closely with our analytics architect to pinpoint user drop-off, I hypothesized what was blocking users from getting through the entire sign up flow.'
        ),
        paragraph(
          'I designed three phases of enhancements, the first of which targeted the specific pain points while minimizing scope and led to a 65% decrease in account creation abandonment.'
        ),
      ],
      metrics: [
        { value: '65% ↑', label: 'increased sign up completion' },
        { value: '175% ↑', label: 'increased loyalty signups YoY' },
        { value: '$150M', label: 'in loyalty sales (118% ↑ YoY)' },
      ],
      media: {
        kind: 'image',
        src: dqAsset('account-creation.png'),
        alt: 'Dairy Queen mobile account creation flow improvements',
        width: 2240,
        height: 1695,
      },
    },
    {
      type: 'contentMedia',
      id: 'wrong-location',
      eyebrow: 'Feature redesign',
      heading: 'Keeping customers from placing orders at the wrong location',
      body: [
        paragraph(
          'The DQ Fan Relations team was reporting a high volume of complaints from users who had accidentally placed their orders at the wrong location.'
        ),
        paragraph(
          'To help ensure users had the right location selected, I implemented a modal asking users to confirm their location at a key point in the order flow, resulting in a 55% reduction in complaints.'
        ),
      ],
      metrics: [{ value: '55% ↑', label: 'increased order location accuracy' }],
      media: {
        kind: 'image',
        src: dqAsset('wrong-location.png'),
        alt: 'Dairy Queen order flow prompting customers to confirm their pickup location',
        width: 2240,
        height: 1691,
      },
    },
    {
      type: 'contentMedia',
      id: 'receipt-scanning',
      eyebrow: 'New feature',
      heading: 'Driving loyalty with receipt scanning',
      body: [
        paragraph(
          "Long on DQ's roadmap, I implemented the ability to scan receipts from previous orders, allowing customers to earn points if they forgot to scan while they were placing the order."
        ),
      ],
      metrics: [
        {
          value: '276,000+',
          label: 'receipts scanned in the first month',
        },
        {
          value: '85% ↓',
          label: 'decreased call volume for receipt point redemption',
        },
        {
          value: '30–38 hrs',
          label: 'saved per week by contact center team',
        },
      ],
      media: {
        kind: 'image',
        src: dqAsset('receipt-scanner.png'),
        alt: 'Dairy Queen receipt scanning flow from rewards account to successful point redemption',
        width: 2240,
        height: 1370,
      },
    },
    {
      type: 'quote',
      id: 'dq-product-owner-quote',
      quote:
        'Jake has done a great job putting himself in the shoes of DQ in the creation of the receipt scanning screens and concepts for us. He was very receptive of our limitations and provided the best possible solution with what he was given.',
      attribution: 'Product Owner, DQ Digital',
      relationship: 'Key stakeholder',
      logo: {
        kind: 'image',
        src: dqAsset('dq-logo.svg'),
        alt: 'Dairy Queen',
        width: 72,
        height: 48,
      },
    },
    {
      type: 'contentMedia',
      id: 'loading-animations',
      eyebrow: 'New feature',
      heading: 'Surprise and delight with branded loading animations',
      body: [
        paragraph(
          'Lorem ipsum dolor sit amet id nunc adipiscing aliquam lacus dictum velit venenatis fringilla. Tincidunt molestie consequat maecenas cras ultrices quam fusce. Enim cursus sollicitudin aliquam hac pellentesque ornare aliqua suspendisse. Aliquam pulvinar porttitor mi viverra sodales porttitor dictumst cursus dapibus facilisi lectus.'
        ),
      ],
      media: {
        kind: 'image',
        src: dqAsset('loaders.png'),
        alt: 'Three Dairy Queen mobile loading animations featuring branded food icons',
        width: 2240,
        height: 1684,
      },
    },
    {
      type: 'contentMedia',
      id: 'web-menu',
      eyebrow: 'Feature redesign',
      heading: 'Encouraging menu exploration on the web',
      body: [
        paragraph(
          'I completely redesigned the web menu experience, pulling DQ Rewards and active promos to the forefront. I also consolidated the menu categories into one scrolling page to create a more engaging and explorative experience to increase average ticket size.'
        ),
      ],
      media: {
        kind: 'video',
        src: dqAsset('rewards.mp4'),
        poster: dqAsset('web-menu.png'),
        label: 'Dairy Queen web menu and rewards experience demonstration',
      },
    },
    {
      type: 'contentMedia',
      id: 'location-details',
      eyebrow: 'Feature redesign',
      heading: 'Helping customers find the right store',
      body: [
        paragraph(
          'I worked closely with our Director of SEO to redesign the location detail page on DQ.com. Reimagining the hierarchy and using timely promos to drive visitors to the menu, this redesign uniquely encouraged increased traffic to DQ online ordering and brick-and-mortar stores.'
        ),
      ],
      metrics: [{ value: '5M ↑', label: 'increased organic search terms' }],
      media: {
        kind: 'image',
        src: dqAsset('location-details.png'),
        alt: 'Redesigned Dairy Queen store location detail page across desktop and mobile',
        width: 2240,
        height: 2265,
      },
    },
    {
      type: 'contentMedia',
      id: 'radar',
      eyebrow: 'New feature',
      heading: 'Radar',
      body: [
        paragraph(
          'Lorem ipsum dolor sit amet id nunc adipiscing aliquam lacus dictum velit venenatis fringilla. Tincidunt molestie consequat maecenas cras ultrices quam fusce. Enim cursus sollicitudin aliquam hac pellentesque ornare aliqua suspendisse. Aliquam pulvinar porttitor mi viverra sodales porttitor dictumst cursus dapibus facilisi lectus.'
        ),
      ],
      media: {
        kind: 'image',
        src: dqAsset('radar.png'),
        alt: 'Dairy Queen Radar feature shown across four mobile screens',
        width: 2240,
        height: 1370,
      },
    },
    {
      type: 'quote',
      id: 'program-director-quote',
      quote:
        "You are a natural presenter — your engagement and excitement for your craft is palpable when you present which makes for a compelling client preso. I much appreciate how you started with the context — here's current state, why we want to make these updates, and here are the updates.",
      attribution: 'Program Director',
      relationship: 'WillowTree teammate',
      logo: {
        kind: 'image',
        src: dqAsset('willowtree-logo.svg'),
        alt: 'WillowTree',
        width: 48,
        height: 48,
      },
    },
    {
      type: 'quote',
      id: 'product-analyst-quote',
      quote:
        'Jake has been an integral part of the DQ team for as long as I have been on this project. He is incredibly thoughtful, hard-working, and a solid communicator with the rest of his team. Not to mention, he is excellent at his craft as a designer!',
      attribution: 'Product Analyst',
      relationship: 'WillowTree teammate',
      logo: {
        kind: 'image',
        src: dqAsset('willowtree-logo.svg'),
        alt: 'WillowTree',
        width: 48,
        height: 48,
      },
    },
  ],
  relatedProjectSlugs: ['biteclub', 'dominos'],
}

// This intentionally different sequence validates that the renderer is not
// coupled to Dairy Queen's narrative. It is not published as a route.
export const caseStudyFixture: CaseStudy = {
  slug: 'renderer-fixture',
  title: 'Renderer fixture',
  summary: 'A minimal alternate block sequence',
  seo: {
    title: 'Renderer fixture',
    description: 'Internal case-study renderer fixture.',
  },
  published: false,
  details: [],
  heroMedia: dairyQueen.heroMedia,
  blocks: [
    {
      type: 'richText',
      id: 'fixture-copy',
      heading: 'A text-first project',
      body: [
        paragraph(
          'This fixture proves a project can begin with prose, omit metrics, and end with standalone media.'
        ),
      ],
    },
    {
      type: 'media',
      id: 'fixture-media',
      media: dairyQueen.heroMedia,
      width: 'contained',
    },
  ],
  relatedProjectSlugs: [],
}

export const caseStudies: CaseStudy[] = [dairyQueen]

export function getCaseStudy(slug: string) {
  return caseStudies.find(
    caseStudy => caseStudy.slug === slug && caseStudy.published
  )
}
