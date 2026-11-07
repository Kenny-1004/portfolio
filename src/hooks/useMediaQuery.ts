import { useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. SSR-safe (returns false on the server). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Desktop-class pointer: a mouse or trackpad that can hover. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
