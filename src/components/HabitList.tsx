import HabitItem from "./HabitItem";

export type Habit = { id: string; name: string; completion: Date[] };

type HabitListProps = {
  habits: Habit[];
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

const HabitList = ({ habits, removeHabit, toggleHabit }: HabitListProps) => {
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
        <HabitItem
          key={habit.id}
          habit={habit}
          removeHabit={removeHabit}
          toggleHabit={toggleHabit}
        ></HabitItem>
      ))}
    </div>
  );
};

export default HabitList;
