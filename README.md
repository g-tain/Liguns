# Liguns

Platform komunitas eksklusif Indonesia — dibangun dengan Next.js 14+, TypeScript, Tailwind CSS, dan Framer Motion.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom Gold Design System |
| Animations | Framer Motion |
| i18n | next-intl (ID / EN) |
| Database | Supabase *(Phase 2)* |

## Struktur Folder

```
src/
├── app/
│   ├── [locale]/          # Locale-aware pages (App Router)
│   │   ├── layout.tsx     # Root layout + SEO metadata + i18n
│   │   └── page.tsx       # Home page
│   └── globals.css        # Gold design system tokens & utilities
├── components/
│   ├── atoms/             # Button, GoldDivider, LocaleSwitcher
│   ├── molecules/         # NavLinks
│   └── organisms/         # Navbar, Hero
├── context/               # React Context providers (Phase 2)
├── dictionaries/          # i18n strings (id.json, en.json)
├── hooks/                 # Custom React hooks (Phase 2)
├── i18n.ts                # next-intl getRequestConfig
├── lib/
│   ├── fonts.ts           # Jost + Playfair Display (next/font)
│   └── utils.ts           # cn() class merger
└── middleware.ts           # Locale routing middleware
```

## Menjalankan Lokal

```bash
npm install
npm run dev
# Buka http://localhost:3000 → otomatis redirect ke /id
```

## Environment Variables

Salin `.env.local.example` ke `.env.local` dan isi nilai-nilainya:

```bash
cp .env.local.example .env.local
```

## Desain System

### Palet Warna
| Token | Value |
|-------|-------|
| `gold` | `#bb9a30` |
| `gold-light` | `#e6c35c` |
| `gold-dark` | `#8d7224` |
| `ink` | `#050505` |
| `ink-elevated` | `#121212` |

### Typography
- **Body / UI**: [Jost](https://fonts.google.com/specimen/Jost) — geometric sans-serif
- **Heading / Display**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — elegant serif, `letter-spacing: -0.02em`

### Utility Classes Kunci
| Class | Fungsi |
|-------|--------|
| `.text-gold-gradient` | Teks gradien emas |
| `.bg-gold-gradient` | Background gradien emas |
| `.glass-card` | Glassmorphism card |
| `.glass-navbar` | Glassmorphism navbar |
| `.btn-shimmer` | Efek shimmer sweep pada button |
| `.section-container` | Responsive centered container |
