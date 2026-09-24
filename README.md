# Charvi Boutique

A static, multi-page website for Charvi Boutique in Ballygunge, Kolkata. It uses plain HTML, CSS and JavaScript with no framework or build dependency. Serve this directory with any static web server, for example `python -m http.server 8765`. The optional `scripts/build_site.py` regenerates the static HTML pages, sitemap, and robots file after copy changes.

## Pages

- Home
- Our Story
- Collections, with Sarees, Salwars & Kurtis, and Home Textiles pages
- Gallery
- Customer Words
- FAQs
- Contact

## Business information and media

The three `boutique-*` photographs in `assets/images` show Charvi Boutique displays. They were retrieved from the [Charvi Boutique photo listing on Magicpin](https://magicpin.in/Kolkata/Ballygunge-Phari/Fashion/Charvi-Boutique/store/1cc20a/photos?img=Store-Images) and converted to responsive WebP versions while retaining JPEG fallbacks. They represent past displays; the website does not claim they show current stock.

The three `hero-*` images are user-supplied generated campaign artwork. They appear in the Home, Our Story, Collections, Sarees, and Salwars & Kurtis heroes. Each has 640, 1024, and 1536 pixel WebP variants plus a JPEG fallback. Their complete lettering and subjects remain visible at every viewport size; they are separate from the genuine boutique photographs in the gallery.

The product range, 2009 start year, Ballygunge location, primary phone number and quoted review were checked against the [Wanderlog listing](https://wanderlog.com/place/details/10475224/charvi-boutique). The second phone number and social profiles came from the supplied brief. The distinct Chennai ecommerce site with a similar name was not used.

No email address, prices, online checkout, current stock, or custom domain were provided. The enquiry form composes a WhatsApp message in the visitor's browser; it does not store or transmit form data to this site.

## Hosting and SEO

The canonical URL and sitemap target `https://cloudempiretech.github.io/CharviBoutique/`, the expected GitHub Pages project URL. If the site moves to a different domain, update the canonical and Open Graph URLs in each HTML page, the JSON-LD `url`, `sitemap.xml`, and `robots.txt`. The `.nojekyll` file lets GitHub Pages serve the static source directly.
