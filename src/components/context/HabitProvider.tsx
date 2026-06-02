import { isSameDay } from "date-fns";
import { ReactNode } from "react";
import { Habit, HabitContext } from "./useHabits";
import useLocalStorage from "./useLocalStorage";

type HabitProviderProps = {
  children: ReactNode;
};

const HabitProvider = ({ children }: HabitProviderProps) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

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
