import { useEffect, useState } from "react";
import { loadLS, saveLS } from "../lib/storage";

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => loadLS(key, fallback));

  useEffect(() => { 
    saveLS(key, value); 
  }, [key, value]);
  
  return [value, setValue] as const;
}