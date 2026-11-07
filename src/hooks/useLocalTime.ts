import { useEffect, useState } from "react";

/** Live "HH:MM" clock for an IANA timezone. Returns null when no timezone is set. */
export function useLocalTime(timezone: string): string | null {
  const format = () => {
    if (!timezone) return null;
    try {
      return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timezone,
      }).format(new Date());
    } catch {
      return null;
    }
  };

  const [time, setTime] = useState(format);

  useEffect(() => {
    if (!timezone) return;
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return time;
}
