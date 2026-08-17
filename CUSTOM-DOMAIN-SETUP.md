# Custom Domain Setup

## GitHub Pages

This portfolio is configured for:

`portfolio.abdullahafsar.site`

### DNS record

Create this DNS record at the provider that manages `abdullahafsar.site`:

| Type | Host/Name | Target |
|---|---|---|
| CNAME | `portfolio` | `whitedevil1566.github.io` |

### GitHub

In **Repository → Settings → Pages → Custom domain**, enter:

`portfolio.abdullahafsar.site`

Then enable **HTTPS / Enforce HTTPS** after the certificate becomes available.

### Files already configured

- `CNAME` → `portfolio.abdullahafsar.site`
- `robots.txt` → custom-domain sitemap
- `sitemap.xml` → custom-domain URLs
- canonical URLs → custom domain
- Open Graph URL → custom domain

No DNS change can be made from the ZIP itself; the DNS record must be created in the domain provider's DNS panel.
