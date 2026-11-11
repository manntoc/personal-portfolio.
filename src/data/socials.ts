// src/data/socials.ts

export interface Social {
  id: string
  label: string
  url: string
  username: string
}

export const socials: Social[] = [
  { id: 'github',   label: 'GitHub',   url: 'https://github.com/manntoc',                username: '@manntoc' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/manntoc/',       username: 'Lukman' },
]
