import { useCallback } from "react";

export function useCopyText(notify: (message: string) => void) {
  return useCallback(
    async (text: string, message: string) => {
      try {
        await navigator.clipboard.writeText(text);
        notify(message);
      } catch {
        notify("Copy failed");
      }
    },
    [notify],
  );
}