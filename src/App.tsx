import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { Habit } from "./components/HabitList";
import Header from "./components/Header";
import { isSameDay } from "date-fns";

const App = () => {
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
    <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        removeHabit={removeHabit}
        toggleHabit={toggleHabit}
      />
    </div>
  );
};

export default App;
