import { createSalt, fromBase64, hashPassword } from "./crypto";

const PASSWORD_KEY = "iam_desk_pw";
const SESSION_KEY = "iam_desk_unlocked";
export const DATA_KEY_PREFIX = "iam_desk_"; // all app data keys must start with this

interface StoredPassword { salt: string; hash: string }

export function readStoredPassword(): StoredPassword | null {
  try {
    return JSON.parse(localStorage.getItem(PASSWORD_KEY) ?? "null");
  } catch {
    return null;
  }
}

export async function verifyPassword(password: string) {
  const stored = readStoredPassword();
  if (!stored) return false;
  return (await hashPassword(password, fromBase64(stored.salt))) === stored.hash;
}

export async function saveNewPassword(password: string) {
  const salt = createSalt();
  const hash = await hashPassword(password, fromBase64(salt));
  localStorage.setItem(PASSWORD_KEY, JSON.stringify({ salt, hash }));
}

export function validateNewPassword(password: string, confirmation: string): string | null {
  if (password.length < 4) return "Use at least 4 characters.";
  if (password !== confirmation) return "Passwords do not match.";
  return null;
}

export const isSessionUnlocked = () => {
  try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; }
};
export const markSessionUnlocked = () => {
  try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* storage blocked */ }
};
export const clearSession = () => {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* storage blocked */ }
};

export function eraseEverything() {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(DATA_KEY_PREFIX))
      .forEach(key => localStorage.removeItem(key));
    clearSession();
  } catch { /* storage blocked */ }
}