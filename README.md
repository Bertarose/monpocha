# MONPOCHA — Festival POCHA MTL 2026

**11–14 juin 2026 · Bassin Peel · Griffintown · Montréal**

## Structure

```
monpocha-main/
├── index.html              ← Page d'accueil temporaire (countdown)
├── webapp.html             ← App de programmation interactive
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (mode hors-ligne)
├── vercel.json             ← Config Vercel
├── favicon.ico             ← Favicon classique
├── favicon.svg             ← Favicon SVG
├── favicon-96x96.png       ← Favicon PNG
├── apple-touch-icon.png    ← Icône iOS
├── icon-192.png            ← Icône PWA 192×192
├── icon-512.png            ← Icône PWA 512×512
├── img/
│   ├── mascot.jpg          ← Logo principal / mascotte
│   ├── pocha-logo.png      ← Logo POCHA MTL
│   ├── food-corndog.png    ← Floating food (landing)
│   ├── food-skewer.png     ← Floating food (landing)
│   └── food-sushi.png      ← Floating food (landing)
├── audio/
│   └── pocha.mp3           ← Audio
└── images/icons/           ← Icônes SVG carte du site
```

## Pages

- `/` → Page countdown temporaire (index.html)
- `/webapp.html` → Programmation interactive complète

## Déploiement

```bash
vercel deploy
```

---
*Créée par Kim Maurice (Bertarose) · Mai 2026 · Pour ASIASIE*
