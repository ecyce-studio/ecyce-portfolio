// ?ref=upwork 로 들어오면 이메일 등 외부 연락처를 숨김 (Upwork 약관: 계약 전 외부 연락처 공유 금지)
// SPA 내부 이동 시 쿼리가 사라지므로 세션 동안 유지
const STORAGE_KEY = "ecyce-hide-contact";

function detectHideContact(): boolean {
  if (typeof window === "undefined") return false;

  const ref = new URLSearchParams(window.location.search).get("ref");
  try {
    if (ref === "upwork") window.sessionStorage.setItem(STORAGE_KEY, "1");
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return ref === "upwork";
  }
}

export const hideContact = detectHideContact();

export const CONTACT_EMAIL = "ecyce.studio@gmail.com";
