import { Outlet } from "react-router-dom";
import EnquiryModal from "../components/EnquiryModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import TopBar from "../components/TopBar";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";

function SiteLayout() {
  return (
    <div className="min-h-screen bg-off-white text-dark-text">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <EnquiryModal />
    </div>
  );
}

export default SiteLayout;
