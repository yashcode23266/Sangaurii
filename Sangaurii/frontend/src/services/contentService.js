import { blogs, galleryImages, testimonials } from "../data/homeData";

export async function getPublicContent() {
  return { testimonials, blogs, gallery: galleryImages };
}

export async function subscribeNewsletter(email) {
  const subscribers = JSON.parse(localStorage.getItem("sangaurii_subscribers") || "[]");
  if (!subscribers.includes(email)) {
    localStorage.setItem("sangaurii_subscribers", JSON.stringify([email, ...subscribers]));
  }
  return { success: true, message: "Thank you for subscribing." };
}
