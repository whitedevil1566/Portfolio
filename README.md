# Abdullah Afsar — Production Portfolio

A static, GitHub Pages-ready portfolio with a professional source structure, case studies, project data, live GitHub proof, build notes, SEO metadata, PWA support, offline fallback, custom 404, contact card and motion.

## Structure

```text
portfolio/
├── index.html
├── 404.html
├── offline.html
├── CV.pdf
├── CNAME
├── contact.vcf
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── service-worker.js
├── projects/
├── writing/
└── assets/
    ├── css/
    ├── js/
    ├── data/
    ├── icons/
    └── images/
```

## Deploy
Upload the contents of `portfolio/` to the root of the GitHub Pages repository.

No Node.js/build step is required.

## Custom domain
The production custom domain is configured as `portfolio.abdullahafsar.site`. The `CNAME`, canonical URLs, Open Graph URL, robots.txt and sitemap.xml are already aligned to that domain.

## GitHub integration
The homepage fetches public profile and repository data from GitHub at runtime. If GitHub's public API is unavailable, the page falls back to a readable static state.

## Analytics
Analytics are disabled by default. `assets/js/analytics.js` is a small hook for adding a privacy-friendly provider when you choose one.

## PWA
The root page registers `service-worker.js` and provides an offline fallback. The service worker is intentionally lightweight and only caches local files.

## Content system
Project metadata lives in `assets/data/projects.json`. The Projects directory reads that file at runtime, so future project additions can be maintained from one place.
