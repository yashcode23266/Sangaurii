export const openEnquiryModal = () => {
  window.dispatchEvent(new CustomEvent("open-enquiry"));
};
