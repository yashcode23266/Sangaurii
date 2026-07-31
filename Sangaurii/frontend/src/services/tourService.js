import { tours, vehicles } from "../data/toursData";

const pause = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

function saveLead(type, payload) {
  const lead = {
    id: crypto.randomUUID(),
    type,
    payload,
    createdAt: new Date().toISOString(),
  };
  const current = JSON.parse(localStorage.getItem("sangaurii_leads") || "[]");
  localStorage.setItem("sangaurii_leads", JSON.stringify([lead, ...current].slice(0, 50)));
  return { success: true, message: "Thank you. Our travel team will connect with you shortly." };
}

export async function getTours() {
  await pause();
  return tours;
}

export async function getFeaturedTours() {
  await pause(150);
  return tours.filter((item) => item.featured).slice(0, 6);
}

export async function getTourBySlug(slug) {
  await pause();
  return tours.find((item) => item.slug === slug) || null;
}

export async function submitTourEnquiry(payload) {
  await pause();
  return saveLead("tour", payload);
}

export async function submitGeneralEnquiry(payload) {
  await pause();
  return saveLead("general", payload);
}

export async function submitCustomTour(payload) {
  await pause();
  return saveLead("customized", payload);
}

export async function getVehicles() {
  await pause();
  return vehicles;
}

export async function submitRentalEnquiry(payload) {
  await pause();
  return saveLead("vehicle-rental", payload);
}
