import { useEffect, useState } from "react";
import { Habit } from "./useHabits";
import { parseISO } from "date-fns";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<Habit[]>(() => {
    try {
      const items = localStorage.getItem(key);
      if (items === null) return initialValue;

      return JSON.parse(items, dateReviver);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
}

function dateReviver(_key: string, value: unknown) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return parseISO(value);
  }
  return value;
}

export default useLocalStorage;
