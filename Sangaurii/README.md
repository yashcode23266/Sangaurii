# Sangaurii Tours and Travels

Frontend-only tour and travel website for **Sangaurii Tours and Travels**.

The site includes public pages for tour discovery, featured destinations, custom trip requests, vehicle rental, gallery highlights, blogs, testimonials, newsletter signup, WhatsApp contact, and enquiry forms. All package and content data is stored locally in the frontend source, so no backend server or database is required.

## Tech Stack

- React 19 with Vite
- JavaScript and JSX
- Tailwind CSS 4 through `@tailwindcss/vite`
- React Router
- Framer Motion
- Lucide React

## Clean Structure

```text
Sangaurii/
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Setup

Install dependencies:

```sh
cd frontend
npm install
```

Place the official logo here:

```text
frontend/public/assets/sangaurii-logo.jpeg
```

Optional environment values:

```env
VITE_WHATSAPP_NUMBER=919876543210
VITE_CONTACT_PHONE=+91 98765 43210
VITE_CONTACT_EMAIL=hello@example.com
VITE_INSTAGRAM_URL=https://instagram.com/your_profile
VITE_FACEBOOK_URL=https://facebook.com/your_page
VITE_YOUTUBE_URL=https://youtube.com/@your_channel
```

## Development

Start the frontend:

```sh
cd frontend
npm run dev
```

Build for production:

```sh
cd frontend
npm run build
```

Preview the production build:

```sh
cd frontend
npm run preview
```

## Content

- Tour packages and vehicles are managed in `frontend/src/data/toursData.js`.
- Homepage destinations, blogs, gallery items, and testimonials are managed in `frontend/src/data/homeData.js`.
- Form submissions are frontend-only confirmations and are stored in browser `localStorage` for demo purposes.

## Deployment

Deploy the `frontend` directory to any static hosting platform. Build with `npm run build` and publish the generated `frontend/dist` folder.

Configure the host as a single-page app so browser routes like `/tours/kashmir-paradise-trail` return `index.html`.
