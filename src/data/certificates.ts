// src/data/certificates.ts
// Certificates grouped by organization / issuer.
// Files reside in /public/certificates/.

export type IssuerOrg =
  | 'PT Rexline Engineering Indonesia'
  | 'BNSP'
  | 'Educa Studio & GameLab'
  | 'Karier.mu by Sekolah.mu'
  | 'Politeknik Negeri Jember'
  | 'Kementerian Kominfo RI'
  | 'Universitas STEKOM'

export interface Certificate {
  id: string
  title: string
  issuer: IssuerOrg
  year: string
  file: string
  note?: string
}

export interface IssuerGroup {
  name: IssuerOrg
  shortName: string
  type: 'Company' | 'National Body' | 'Industry Bootcamp' | 'University' | 'Ministry'
  description: string
  certificates: Certificate[]
}

export const certificateGroups: IssuerGroup[] = [
  {
    name: 'PT Rexline Engineering Indonesia',
    shortName: 'Rexline',
    type: 'Company',
    description: 'Internship & IT operations experience at multinational engineering company.',
    certificates: [
      {
        id: 'cert-rexline',
        title: 'Sertifikat Magang IT Operations',
        issuer: 'PT Rexline Engineering Indonesia',
        year: '2024',
        file: 'Sertifikat Rexline.pdf',
        note: '5 bulan: Agt - Des 2024',
      },
    ],
  },
  {
    name: 'BNSP',
    shortName: 'BNSP',
    type: 'National Body',
    description: 'Sertifikasi kompetensi kerja standar nasional Republik Indonesia.',
    certificates: [
      {
        id: 'cert-bnsp',
        title: 'Sertifikasi Kompetensi BNSP',
        issuer: 'BNSP',
        year: '2024',
        file: 'sertifikat-bnsp-Lukman.pdf',
        note: 'Standar Kompetensi Kerja Nasional Indonesia',
      },
    ],
  },
  {
    name: 'Educa Studio & GameLab',
    shortName: 'Educa / GameLab',
    type: 'Industry Bootcamp',
    description: 'MSIB Batch 6 Kampus Merdeka: Kelas Industri Web Front-End Developer & modul kompetensi teknis.',
    certificates: [
      {
        id: 'cert-msib-gamelab',
        title: 'MSIB Batch 6: Web Front-End Developer',
        issuer: 'Educa Studio & GameLab',
        year: '2024',
        file: 'gamelab_msib_certificate.pdf',
        note: 'Kelulusan Program MSIB Utama',
      },
      { id: 'cert-gl-1842', title: 'GameLab Competency Module 01', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL1842374383_certificate.pdf' },
      { id: 'cert-gl-2291', title: 'GameLab Competency Module 02', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL2291557616_certificate.pdf' },
      { id: 'cert-gl-3439', title: 'GameLab Competency Module 03', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL3439551532_certificate.pdf' },
      { id: 'cert-gl-4406', title: 'GameLab Competency Module 04', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL4406493011_certificate.pdf' },
      { id: 'cert-gl-5566', title: 'GameLab Competency Module 05', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL5566323159_certificate.pdf' },
      { id: 'cert-gl-6722', title: 'GameLab Competency Module 06', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL6722966506_certificate.pdf' },
      { id: 'cert-gl-7011', title: 'GameLab Competency Module 07', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL7011304539_certificate.pdf' },
      { id: 'cert-gl-8486', title: 'GameLab Competency Module 08', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL8486031030_certificate.pdf' },
      { id: 'cert-gl-8749', title: 'GameLab Competency Module 09', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL8749812467_certificate.pdf' },
      { id: 'cert-gl-8752', title: 'GameLab Competency Module 10', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL8752391981_certificate.pdf' },
      { id: 'cert-gl-9432', title: 'GameLab Competency Module 11', issuer: 'Educa Studio & GameLab', year: '2024', file: 'GL9432619790_certificate.pdf' },
    ],
  },
  {
    name: 'Karier.mu by Sekolah.mu',
    shortName: 'Karier.mu',
    type: 'Industry Bootcamp',
    description: 'Pelatihan bersertifikat Program Kartu Prakerja: digital marketing, CS, dan karier.',
    certificates: [
      {
        id: 'cert-socmed-meta',
        title: 'Manajemen Media Sosial & Kampanye FB & IG',
        issuer: 'Karier.mu by Sekolah.mu',
        year: '2023',
        file: 'sertifikat-sekolahmu-9328644.pdf',
        note: 'Durasi: 15 Jam',
      },
      {
        id: 'cert-cs-service',
        title: 'Teknik Melayani Pelanggan bagi Customer Service',
        issuer: 'Karier.mu by Sekolah.mu',
        year: '2023',
        file: 'sertifikat-sekolahmu-9293540.pdf',
        note: 'Durasi: 15 Jam',
      },
      {
        id: 'cert-career-dev',
        title: 'Membangun Diri untuk Karier Profesional',
        issuer: 'Karier.mu by Sekolah.mu',
        year: '2023',
        file: 'sertifikat-sekolahmu-9297629.pdf',
        note: 'Durasi: 3 Jam',
      },
    ],
  },
  {
    name: 'Politeknik Negeri Jember',
    shortName: 'Polije',
    type: 'University',
    description: 'Aktivitas pengembangan diri & kepemimpinan selama studi Teknik Informatika.',
    certificates: [
      {
        id: 'cert-lkmm',
        title: 'Latihan Keterampilan Manajemen Mahasiswa (LKMM)',
        issuer: 'Politeknik Negeri Jember',
        year: '2021',
        file: 'Sertifikat 1 LKMM.pdf',
      },
      {
        id: 'cert-pkjmbti',
        title: 'PKJMBTI — Pengenalan Kampus Jurusan TI',
        issuer: 'Politeknik Negeri Jember',
        year: '2020',
        file: 'Sertifikat 4 PKJMBTI.pdf',
      },
    ],
  },
  {
    name: 'Kementerian Kominfo RI',
    shortName: 'Kominfo',
    type: 'Ministry',
    description: 'Program literasi digital nasional.',
    certificates: [
      {
        id: 'cert-kominfo',
        title: 'Muda Kreatif Membangun Startup dengan Literasi Digital',
        issuer: 'Kementerian Kominfo RI',
        year: '2021',
        file: 'Sertifikat 3 KOMINFO.pdf',
      },
    ],
  },
  {
    name: 'Universitas STEKOM',
    shortName: 'STEKOM',
    type: 'University',
    description: 'Seminar & wawasan teknologi informasi.',
    certificates: [
      {
        id: 'cert-stekom',
        title: 'Webinar Nasional Teknologi Informasi',
        issuer: 'Universitas STEKOM',
        year: '2021',
        file: 'Sertifikat 2 STEKOM.pdf',
      },
    ],
  },
]

// Flat list helper for compatibility
export const certificates: Certificate[] = certificateGroups.flatMap(g => g.certificates)
