import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import CustomizedToursPage from "./pages/CustomizedToursPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import TourDetailsPage from "./pages/TourDetailsPage";
import ToursPage from "./pages/ToursPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";

const routes = [
  ["/gallery", "Gallery"],
  ["/blogs", "Blogs"],
  ["/blogs/:slug", "Blog Details"],
  ["/contact", "Contact"],
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms & Conditions"],
];

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/domestic" element={<ToursPage mode="domestic" />} />
        <Route path="/tours/international" element={<ToursPage mode="international" />} />
        <Route path="/tours/special" element={<ToursPage mode="special" />} />
        <Route path="/tours/customized" element={<CustomizedToursPage />} />
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
