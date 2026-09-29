import React from "react";
import { Outlet } from "react-router-dom";
import EnquiryModal from "../components/EnquiryModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";
import { openEnquiryModal } from "../utils/enquiry";

function SiteLayout() {
  const handleOpenEnquiry = (title) => {
    openEnquiryModal(title);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#0F172A] relative">
      <ScrollToTop />
      <Navbar onOpenEnquiry={handleOpenEnquiry} />
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
