export type ProjectAccess = 'private' | 'in-progress'

export type Project = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  access: ProjectAccess
  href?: string
}

export const projects: Project[] = [
  {
    slug: 'datadog',
    title: 'Datadog',
    description: 'AI-powered database observability.',
    image: '/images/proj-covers/datadog.png',
    tags: ['Web', 'Developer Tools', 'B2B', 'Coming soon...'],
    access: 'private',
  },
  {
    slug: 'fleetio',
    title: 'Fleetio',
    description: 'Cutting-edge technology for fleet management.',
    image: '/images/proj-covers/fleetio.png',
    tags: ['Web', 'Mobile', 'AI', 'B2B', 'Coming soon...'],
    access: 'private',
  },
  {
    slug: 'dairy-queen',
    title: 'Dairy Queen',
    description:
      'Major updates to the Dairy Queen app and website that drive conversion, loyalty, and user satisfaction.',
    image: '/images/proj-covers/dq.png',
    tags: ['Mobile', 'Web', 'B2C'],
    access: 'in-progress',
  },
  {
    slug: 'dominos',
    title: "Domino's",
    description:
      'The next-gen store management system for the largest pizza chain in the US.',
    image: '/images/proj-covers/dominos.png',
    tags: ['Web', 'Enterprise'],
    access: 'private',
  },
  {
    slug: 'biteclub',
    title: 'BiteClub',
    description:
      'An iOS app that helps couples find a place to eat. Built from scratch by yours truly :)',
    image: '/images/proj-covers/biteclub.png',
    tags: ['Mobile', 'Development', 'B2C'],
    access: 'in-progress',
  },
  {
    slug: 'ascensus',
    title: 'Ascensus',
    description:
      'Redesigning a powerful tool that helps small business owners provide retirement savings for their employees.',
    image: '/images/proj-covers/ascensus.png',
    tags: ['Web', 'B2B'],
    access: 'in-progress',
  },
  {
    slug: 'dexcom',
    title: 'Dexcom',
    description:
      'Design explorations for a revolutionary OTC diabetes management platform.',
    image: '/images/proj-covers/dexcom.png',
    tags: ['Mobile', 'B2C'],
    access: 'private',
  },
]
