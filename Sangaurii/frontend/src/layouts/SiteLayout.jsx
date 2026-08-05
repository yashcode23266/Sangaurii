import { Outlet } from "react-router-dom";
import EnquiryModal from "../components/EnquiryModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import TopBar from "../components/TopBar";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";
import PageTransition from "../components/PageTransition";

function SiteLayout() {
  return (
    <div className="min-h-screen bg-off-white text-dark-text antialiased">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main><PageTransition><Outlet /></PageTransition></main>
      <Footer />
      <WhatsAppFloatingButton />
      <EnquiryModal />
    </div>
  );
}

export default SiteLayout;
