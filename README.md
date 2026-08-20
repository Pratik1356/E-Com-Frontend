# SkyMart

A React storefront for people who spend their evenings looking up — telescopes,
mapping drones, kites, weather stations, binoculars, and star charts.

## Dynamic routing

Built with **React Router v6** (`react-router-dom`). Routes:

| Path                  | Page            | Notes                                   |
|-----------------------|------------------|------------------------------------------|
| `/`                   | Home             | Hero + full catalog grid                  |
| `/category/:slug`     | Category         | Dynamic segment, filters products by category |
| `/product/:id`        | Product detail   | Dynamic segment, looks up product by id   |
| `/search?q=term`      | Search           | Reads a query string, not a path param    |
| `*`                   | Not found        | Catch-all fallback route                  |

`:slug` and `:id` are read with `useParams()` in `src/pages/Category.jsx` and
`src/pages/ProductDetail.jsx`. If the id/slug doesn't match anything in
`src/data/products.js`, the page redirects to the 404 route — so the routing
handles bad URLs, not just the happy path.

## Getting started

```bash
npm install
npm run dev       # starts a local dev server, usually http://localhost:5173
npm run build     # production build into /dist
```

## Stack

- React 19 + Vite
- React Router v6 (client-side dynamic routing)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- lucide-react (icons)
- Light/dark theme toggle (persisted to `localStorage`, driven by CSS custom
  properties in `src/index.css`)

## Project structure

```
src/
  components/   Navbar, Footer, ProductCard, RatingStars, CategoryIcon
  pages/        Home, Category, ProductDetail, Search, NotFound
  data/         products.js — the "backend": all product + category data
  App.jsx       Route table
  main.jsx      Entry point, wraps App in <BrowserRouter>
```

To swap in a real API later, only `src/data/products.js` needs to change —
every page already reads through its helper functions (`getProductById`,
`getProductsByCategory`, `getRelatedProducts`) rather than the array directly.

## Deploying

Works out of the box on Vercel or Netlify (`npm run build`, output directory
`dist`). Since routing happens client-side, make sure your host rewrites all
paths to `index.html` (Vercel does this automatically for Vite projects).
