import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { Habit } from "./components/HabitList";
import Header from "./components/Header";

const App = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((current) => [
      ...current,
      { id: crypto.randomUUID(), name: name },
    ]);
  }

  function removeHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id != id));
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} removeHabit={removeHabit} />
    </div>
  );
};

export default App;
