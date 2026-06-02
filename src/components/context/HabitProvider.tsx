import { isSameDay } from "date-fns";
import { createContext, ReactNode, useContext, useState } from "react";

export type Habit = { id: string; name: string; completion: Date[] };

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

type HabitProviderProps = {
  children: ReactNode;
};

const HabitContext = createContext<null | Context>(null);

const HabitProvider = ({ children }: HabitProviderProps) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((current) => [
      ...current,
      { id: crypto.randomUUID(), name: name, completion: [] },
    ]);
  }

  function removeHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id != id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((curr) =>
      curr.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completion.some((d) => isSameDay(date, d));
        const completion = alreadyDone
          ? habit.completion.filter((d) => !isSameDay(d, date))
          : [...habit.completion, date];
        return { ...habit, completion };
      }),
    );
  }
  return (
    <HabitContext value={{ habits, addHabit, removeHabit, toggleHabit }}>
      {children}
    </HabitContext>
  );
};

export default HabitProvider;

export function useHabits() {
  const habitContext = useContext(HabitContext);

  if (habitContext === null) throw new Error("Null Context");

  return habitContext;
}
