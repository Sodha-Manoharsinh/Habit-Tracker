import { useHabits } from "./context/HabitProvider";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits } = useHabits();
  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habits yet. Add one above to get started!
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit}></HabitItem>
      ))}
    </div>
  );
};

export default HabitList;
