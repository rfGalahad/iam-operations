import { useCallback, useEffect, useRef, useState } from "react";
import {
  clearSession, eraseEverything, isSessionUnlocked, markSessionUnlocked,
  readStoredPassword, saveNewPassword, validateNewPassword, verifyPassword,
} from "../passwordStore";

const IDLE_LIMIT_MS = 15 * 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "keydown", "click", "touchstart"];
const STORAGE_ERROR = "This browser blocked secure storage, so the password could not be checked.";

export function useLock(onLock?: () => void) {
  const [hasPassword, setHasPassword] = useState(() => readStoredPassword() !== null);
  const [isLocked, setIsLocked] = useState(() => !(readStoredPassword() && isSessionUnlocked()));

  const onLockRef = useRef(onLock);
  useEffect(() => { onLockRef.current = onLock; });

  const lock = useCallback(() => {
    clearSession();
    setIsLocked(true);
    onLockRef.current?.();
  }, []);

  // Auto-lock after 15 minutes without activity.
  useEffect(() => {
    if (isLocked) return;
    let timer = window.setTimeout(lock, IDLE_LIMIT_MS);
    const resetTimer = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(lock, IDLE_LIMIT_MS);
    };
    ACTIVITY_EVENTS.forEach(name => window.addEventListener(name, resetTimer, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      ACTIVITY_EVENTS.forEach(name => window.removeEventListener(name, resetTimer));
    };
  }, [isLocked, lock]);

  const open = () => {
    markSessionUnlocked();
    setIsLocked(false);
  };

  // Each action returns an error message, or null on success.
  const unlock = async (password: string) => {
    try {
      if (!(await verifyPassword(password))) return "Wrong password. Try again.";
    } catch {
      return STORAGE_ERROR;
    }
    open();
    return null;
  };

  const createPassword = async (password: string, confirmation: string) => {
    const problem = validateNewPassword(password, confirmation);
    if (problem) return problem;
    try {
      await saveNewPassword(password);
    } catch {
      return STORAGE_ERROR;
    }
    setHasPassword(true);
    open();
    return null;
  };

  const changePassword = async (current: string, next: string, confirmation: string) => {
    try {
      if (!(await verifyPassword(current))) return "Current password is wrong.";
      const problem = validateNewPassword(next, confirmation);
      if (problem) return problem.replace("Passwords do", "New passwords do");
      await saveNewPassword(next);
    } catch {
      return "Could not save the password.";
    }
    return null;
  };

  const forgotPassword = () => {
    if (!confirm("Resetting the password erases ALL tickets, applications and spiels stored in this browser. Continue?")) return;
    eraseEverything();
    window.location.reload(); // clears the in-memory copies of the data too
  };

  return { isLocked, hasPassword, lock, unlock, createPassword, changePassword, forgotPassword };
}