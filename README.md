## Overview
Next.js project for CS 194 about steganography. This repository contains the front-end framework & APIs.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

Most relevant front-end code lives in `/pages`. Any file in this folder will become a new page with automatic routing handled by Next.js. Notable files:
- `index.js` is the landing page
- `[imageId].js` provides [dynamic routing](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes), e.g. we support `https://.../<imageId>` if it exists in our DB

## Client-side API
`/api` contains our public API and will be used to interface with our DB. Some template files I've set up, currently they return hard-coded data from `lib/constants`:
- `/api/getAllImages` lists all images in our DB (we only really need to know all of the possible IDs for dynamic routing)
- `/api/getImageById` takes in an "id" in its query and uses it to query the DB to see if the image exists; if so, returns it

The template APIs are both being used in the front-end. [More information about Next.js public APIs here.](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

## Misc Important Files
- `/lib/constants.js` contains constant variables
- `/styles/globals.css` contains our global css; since we're using tailwind, make sure to nest any css under `@layer base`
- `/components/*` can hold any custom React components you want to use across files
