export function isIndianPhone(value) {
  const normalized = String(value || "").replace(/[\s()-]/g, "");
  return /^(?:(?:\+91|91|0)?[6-9]\d{9})$/.test(normalized);
}
