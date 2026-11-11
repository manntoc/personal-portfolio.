// src/data/projects.ts
// Real professional projects & case studies based on Resume_Lukman.pdf

export type ProjectCategory = 'Web Development' | 'UI/UX Design' | 'Creative Development' | 'Experimental'

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  year: string
  shortDesc: string
  overview: string
  problem: string
  goals: string[]
  process: string
  techStack: string[]
  keyFeatures: string[]
  outcome: string
  coverGradient: string
  galleryGradients: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'assyavet-clinic-platform',
    title: 'Assya Vet Clinic Digital System',
    category: 'Web Development',
    year: '2023 – Present',
    shortDesc: 'Integrated digital platform, Meta Ads optimization, and content ecosystem for an established veterinary clinic in Surabaya.',
    overview: 'Mengembangkan sistem operasional digital dan strategi konten omnichannel untuk Assya Vet Clinic di Surabaya guna meningkatkan kehadiran digital, keterlibatan audiens, dan alur layanan pasien klinik hewan.',
    problem: 'Klinik memerlukan kehadiran digital yang kredibel, konsisten, serta sistem pengelolaan konten dan iklan terarah untuk menjangkau pemilik hewan peliharaan secara tepat sasaran.',
    goals: [
      'Membangun identitas digital yang profesional dan terpercaya untuk klinik hewan.',
      'Mengoptimalkan kampanye Meta Ads untuk konversi dan keterlibatan audiens.',
      'Mendesain aset visual konsisten dan mudah diakses dari perangkat mobile.',
    ],
    process: 'Riset kebutuhan target audiens pemilik hewan di Surabaya, perancangan visual identity sistematis, implementasi konten lintas platform, dan evaluasi berkelanjutan melalui analitik performa iklan.',
    techStack: ['PHP Laravel', 'JavaScript', 'Meta Graph API', 'MySQL', 'Figma', 'UI/UX'],
    keyFeatures: [
      'Integrasi strategi konten visual multi-platform (Instagram, Facebook).',
      'Analisis performa kampanye Meta Ads dan optimasi target audience.',
      'Sistem identitas visual terpadu untuk edukasi dan promosi layanan klinik.',
    ],
    outcome: 'Peningkatan engagement media sosial yang terukur, efisiensi konversi iklan digital, dan kehadiran brand klinik yang solid di Surabaya.',
    coverGradient: 'linear-gradient(135deg, #071329 0%, #0A1733 50%, #0d1f3c 100%)',
    galleryGradients: [
      'linear-gradient(135deg, #071329, #0d1f3c)',
      'linear-gradient(135deg, #0A1733, #071329)',
      'linear-gradient(135deg, #0d1f3c, #071329)',
    ],
    featured: true,
  },
  {
    slug: 'internal-operations-system',
    title: 'Enterprise Internal Web System',
    category: 'Web Development',
    year: '2025 – 2026',
    shortDesc: 'Operations and IT asset management internal web system developed for PT. Bertumbuh Melejit Berkah.',
    overview: 'Pengembangan dan pemeliharaan sistem website internal untuk PT. Bertumbuh Melejit Berkah di Sidoarjo guna mendukung efisiensi operasional dan manajemen aset perusahaan.',
    problem: 'Perusahaan membutuhkan sistem web internal yang handal dengan pemeliharaan terstruktur, manajemen aset IT terpadu, dan sistem cadangan data yang aman.',
    goals: [
      'Mengembangkan fitur sistem web internal sesuai alur kerja operasional bisnis.',
      'Memastikan ketersediaan dan integritas data melalui mekanisme backup berkala.',
      'Menerapkan pemeliharaan preventif dan resolusi cepat terhadap bug/error aplikasi.',
    ],
    process: 'Analisis kebutuhan sistem unit kerja, perancangan skema database MySQL, implementasi modul web internal, pengujian keamanan, dan integrasi prosedur backup terjadwal.',
    techStack: ['PHP Laravel', 'MySQL', 'JavaScript', 'Bootstrap', 'IT Asset Management'],
    keyFeatures: [
      'Modul pendataan, monitoring, dan pemeliharaan aset teknologi informasi perusahaan.',
      'Sistem otomatisasi backup database terjadwal untuk proteksi data operasional.',
      'Pusat pemeliharaan sistem dengan pelaporan dan troubleshooting error real-time.',
    ],
    outcome: 'Sistem berjalan optimal dengan downtime minimal, integritas data terjamin, dan pengelolaan aset IT lebih terdata secara akurat.',
    coverGradient: 'linear-gradient(135deg, #0A1733 0%, #071329 50%, #050505 100%)',
    galleryGradients: [
      'linear-gradient(135deg, #0A1733, #050505)',
      'linear-gradient(135deg, #071329, #0A1733)',
      'linear-gradient(135deg, #050505, #0A1733)',
    ],
    featured: true,
  },
  {
    slug: 'digital360-web-application',
    title: 'Digital360 Web Application & CMS',
    category: 'Web Development',
    year: '2025',
    shortDesc: 'Web application and optimized content publishing engine with end-to-end performance testing.',
    overview: 'Pengembangan aplikasi berbasis web responsif dan mesin penerbitan artikel blog teroptimasi untuk Digital360 di Surabaya.',
    problem: 'Kebutuhan platform web yang cepat, responsif di berbagai perangkat, dengan struktur SEO konten yang rapi dan mudah dikelola tim.',
    goals: [
      'Membangun aplikasi web berperforma tinggi dengan waktu muat cepat.',
      'Menyusun modul blog teroptimasi SEO untuk kebutuhan konten digital.',
      'Melakukan pengujian komprehensif guna memastikan stabilitas aplikasi.',
    ],
    process: 'Penyusunan arsitektur web, implementasi antarmuka responsif, integrasi modul manajemen konten, dan rangkaian pengujian performa sistem.',
    techStack: ['React.js', 'PHP', 'MySQL', 'Tailwind CSS', 'REST API'],
    keyFeatures: [
      'Antarmuka web modern dengan navigasi intuitif dan responsivitas mobile-first.',
      'Modul manajemen artikel dan blog terstruktur untuk kemudahan publikasi konten.',
      'Optimalisasi performa loading dan kestabilan sistem aplikasi.',
    ],
    outcome: 'Aplikasi web yang stabil, cepat diakses pengguna, dan memudahkan distribusi konten digital perusahaan.',
    coverGradient: 'linear-gradient(135deg, #071329 0%, #050505 60%, #0A1733 100%)',
    galleryGradients: [
      'linear-gradient(135deg, #071329, #050505)',
      'linear-gradient(135deg, #050505, #071329)',
      'linear-gradient(135deg, #0A1733, #071329)',
    ],
    featured: true,
  },
  {
    slug: 'educa-studio-frontend',
    title: 'Educa Studio Interactive UI',
    category: 'UI/UX Design',
    year: '2024',
    shortDesc: 'Interactive front-end web interface with REST API integration built during Studi Independen at PT Educa Sisfomedia.',
    overview: 'Pengembangan antarmuka website yang responsif dan interaktif melalui program Studi Independen Bersertifikat di PT Educa Sisfomedia Indonesia (Educa Studio), Salatiga.',
    problem: 'Perancangan antarmuka pengguna interaktif yang membutuhkan integrasi data real-time dari backend API dengan standar desain tinggi.',
    goals: [
      'Membangun komponen UI yang reusable, responsif, dan interaktif.',
      'Mengintegrasikan endpoint REST API untuk menampilkan dan mengolah data dinamis.',
      'Memenuhi standar kepatuhan desain antarmuka dan aksesibilitas web modern.',
    ],
    process: 'Analisis mock-up desain UI/UX, penerjemahan komponen menggunakan framework frontend modern, pengujian integrasi data API, dan optimasi interaksi visual.',
    techStack: ['React.js', 'JavaScript', 'REST API', 'Figma', 'CSS3'],
    keyFeatures: [
      'Komponen antarmuka modular yang fleksibel untuk berbagai resolusi layar.',
      'Integrasi data dinamis backend REST API dengan error handling yang aman.',
      'Desain interaktif yang berfokus pada kemudahan eksplorasi pengguna.',
    ],
    outcome: 'Penyelesaian sertifikasi Web Frontend Developer dengan implementasi antarmuka yang clean, responsif, dan terintegrasi penuh.',
    coverGradient: 'linear-gradient(135deg, #050505 0%, #071329 100%)',
    galleryGradients: [
      'linear-gradient(135deg, #050505, #071329)',
      'linear-gradient(135deg, #071329, #0A1733)',
    ],
    featured: true,
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug)
export const ALL_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All', 'Web Development', 'UI/UX Design', 'Creative Development', 'Experimental'
]
