# Rock N Roll Store

Storefront statis untuk Rock N Roll Store berbasis Next.js App Router.

## Prasyarat

- Node.js 20+
- npm 10+

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Script Penting

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run build
```

## Scope Aplikasi

- Route publik utama: landing storefront (`/`)
- Tidak ada login, portal, dashboard, auth API, atau endpoint POS
- Data landing menggunakan source statis lokal di `src/app/home/data/storefront.ts`
- Komponen layout dan UI reusable dikonsolidasikan ke `src/components`

## Struktur Kunci

- `src/app/home` untuk page dan section landing
- `src/app/home/data/storefront.ts` sebagai single source of truth konten storefront
- `src/components/layout` untuk shared header/footer/shell
- `src/components/ui` untuk komponen reusable (button, badge, card, dan lainnya)
