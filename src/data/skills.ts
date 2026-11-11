// src/data/skills.ts
// Direct mapping from verified CV (Resume_Lukman.pdf)

export interface Skill {
  name: string
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar'
  description?: string
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Development',
    skills: [
      { name: 'PHP & Laravel',      level: 'Advanced',     description: 'Full-stack web application development, MVC architecture, Eloquent ORM.' },
      { name: 'React.js',           level: 'Advanced',     description: 'Component lifecycle, hooks, state management, SPA architecture.' },
      { name: 'JavaScript (ES6+)',  level: 'Advanced',     description: 'Asynchronous programming, DOM manipulation, client-side logic.' },
      { name: 'Python',             level: 'Intermediate', description: 'Scripting, backend logic, data processing and automation.' },
      { name: 'REST API',           level: 'Advanced',     description: 'API design, backend endpoint integration, payload serialization.' },
      { name: 'Tailwind CSS',       level: 'Advanced',     description: 'Responsive layout engineering, design token systems, utility styling.' },
    ],
  },
  {
    category: 'Database & Systems',
    skills: [
      { name: 'MySQL',              level: 'Advanced',     description: 'Relational schema design, query optimization, automated backup routines.' },
      { name: 'System Analysis',    level: 'Advanced',     description: 'User requirement gathering, system architecture planning, QA testing.' },
      { name: 'IT Infrastructure',  level: 'Advanced',     description: 'Local network maintenance, troubleshooting, IT hardware & software support.' },
      { name: 'SAP Account Mgmt',   level: 'Intermediate', description: 'User account authorization, role management, and operational monitoring.' },
      { name: 'IT Asset Mgmt',      level: 'Advanced',     description: 'Inventory tracking, hardware lifecycle maintenance, distribution.' },
    ],
  },
  {
    category: 'Design & Creative',
    skills: [
      { name: 'UI/UX Design',       level: 'Advanced',     description: 'Wireframing, user-centered prototyping, interface usability.' },
      { name: 'Figma',              level: 'Advanced',     description: 'Design system components, responsive screen mockups, interactive prototypes.' },
      { name: 'Graphic Design',     level: 'Advanced',     description: 'Brand identity assets, promotional media, typography & vector tracing.' },
      { name: '3D Stage Design',    level: 'Intermediate', description: '3D stage & spatial visualization for events and exhibitions.' },
    ],
  },
  {
    category: 'Marketing & Tools',
    skills: [
      { name: 'Meta Ads & Campaign',level: 'Advanced',     description: 'Audience targeting, ad performance analytics, ROI optimization.' },
      { name: 'Social Media Strategy', level: 'Advanced',  description: 'Multi-platform content planning, engagement growth, brand awareness.' },
      { name: 'Git & GitHub',       level: 'Advanced',     description: 'Version control workflows, branching strategies, collaborative commits.' },
      { name: 'VS Code & Tools',    level: 'Advanced',     description: 'Primary IDE setup, debugging, CLI automation.' },
    ],
  },
]
