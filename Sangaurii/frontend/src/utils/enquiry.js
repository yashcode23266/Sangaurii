export const openEnquiryModal = (title) => {
  window.dispatchEvent(
    new CustomEvent("open-enquiry", {
      detail: title ? { title } : undefined,
    })
  );
};
