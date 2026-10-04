import { useRef, useState } from "react";

export function useCopyToast(duration = 1500) {
  const [toast, setToast] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied`);
    } catch {
      setToast(`Couldn't copy ${label.toLowerCase()}`);
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(""), duration);
  };

  return { toast, copy };
}