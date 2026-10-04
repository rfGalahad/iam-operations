export function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) ?? fallback) : fallback;
  } catch { 
    return fallback; 
  }
}

export function saveLS(key: string, val: unknown) {
  try { 
    localStorage.setItem(key, JSON.stringify(val)); 
  } catch { 
    /* storage unavailable */ 
  }
}

export function removeLS(...keys: string[]) {
  try { 
    keys.forEach(k => localStorage.removeItem(k)); 
  } catch { 
    /* noop */ 
  }
}