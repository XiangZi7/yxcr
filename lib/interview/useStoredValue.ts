"use client";

import { useCallback, useSyncExternalStore } from "react";

const storageEvent = "interview-os:storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(storageEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(storageEvent, callback);
  };
}

export function useStoredValue(key: string, initialValue: string) {
  const read = useCallback(() => {
    try {
      return window.localStorage.getItem(key) ?? initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);
  const value = useSyncExternalStore(subscribe, read, () => initialValue);
  const setValue = useCallback(
    (nextValue: string) => {
      try {
        window.localStorage.setItem(key, nextValue);
      } catch {
        return false;
      }
      window.dispatchEvent(new Event(storageEvent));
      return true;
    },
    [key],
  );
  return [value, setValue] as const;
}
