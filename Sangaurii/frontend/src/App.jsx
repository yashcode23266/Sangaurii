import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import TourDetailsPage from "./pages/TourDetailsPage";
import ToursPage from "./pages/ToursPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";

const routes = [
  ["/blogs", "Blogs"],
  ["/blogs/:slug", "Blog Details"],
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms & Conditions"],
];

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/guest-photos" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/domestic" element={<ToursPage mode="domestic" />} />
        <Route path="/tours/international" element={<ToursPage mode="international" />} />
        <Route path="/tours/special" element={<ToursPage mode="special" />} />
        <Route path="/tours/:slug" element={<TourDetailsPage />} />
        <Route path="/vehicle-rental" element={<VehicleRentalPage />} />
        {routes.map(([path, title]) => (
          <Route key={path} path={path} element={<PlaceholderPage title={title} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
