# Sangaurii Tours & Travels

Official web application for **Sangaurii Tours & Travels** (Pune, Maharashtra).  
*Your Trusted Travel Partner for Over a Decade | Travel with Trust. Travel with Joy.*

---

## 📁 Clean Project Architecture

```text
Sangaurii/
├── .gitignore                     # Root Git exclusions
├── README.md                      # Project documentation
└── Sangaurii/
    └── frontend/                  # React Single-Page Application (Vite + Tailwind CSS)
        ├── public/                # Static assets (brand logo, gallery photos, favicon)
        │   └── assets/
        │       ├── brand/         # Brand emblems and logos
        │       └── gallery/       # Real customer tour photographs
        ├── src/
        │   ├── components/        # Reusable UI & layout components
        │   │   ├── ui/            # Micro-interaction primitives (Marquee, Daybreak Logo)
        │   │   ├── BrandLogo.jsx  # Responsive brand wordmark & emblem
        │   │   ├── Navbar.jsx     # Header navigation with interactive dropdowns
        │   │   ├── Footer.jsx     # Global footer with quick links & contact
        │   │   ├── TourCard.jsx   # Package display cards
        │   │   ├── TrustStrip.jsx # 10-year stats strip
        │   │   └── ...
        │   ├── data/              # Centralized data stores
        │   │   ├── toursData.js   # Master tours & itineraries catalog
        │   │   └── homeData.js    # Bestseller packages, destinations & reviews
        │   ├── layouts/           # Site wrappers & sticky headers
        │   ├── pages/             # Page views & routes
        │   │   ├── HomePage.jsx          # Main landing page
        │   │   ├── ToursPage.jsx         # India, International & Special tours
        │   │   ├── TourDetailsPage.jsx   # Detailed itinerary & booking view
        │   │   ├── VehicleRentalPage.jsx # Private fleet booking (Sedan, SUV, Bus)
        │   │   ├── AboutPage.jsx         # 10-Year journey, pillars & FAQ accordion
        │   │   ├── GalleryPage.jsx       # Dedicated guest photos & memories
        │   │   └── ContactPage.jsx       # Interactive inquiry form, phone & map
        │   ├── services/          # Client data services & storage helpers
        │   ├── styles/            # Core CSS variables, typography & animations
        │   ├── utils/             # Validation & modal state triggers
        │   ├── App.jsx            # React Router master routing table
        │   └── main.jsx           # Vite application entry point
        ├── package.json           # Dependencies and scripts
        └── vite.config.js         # Vite configuration with Tailwind CSS & aliases
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd Sangaurii/frontend
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, production-ready bundle in `Sangaurii/frontend/dist`.

---

## 🎨 Brand Design System
- **Sangaurii Blue**: `#1C4E8A`
- **Traveler Green**: `#184829`
- **Sunburst Orange (CTAs)**: `#F4A228`
- **Soft White Background**: `#F8FAFC`
- **Dark Charcoal**: `#111827`
- **Typography**: Cinzel (Brand/Headings) & Outfit (Sans body text)
