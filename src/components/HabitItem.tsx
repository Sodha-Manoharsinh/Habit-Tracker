import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
} from "date-fns";
import Button from "./Button";
import { Habit } from "./HabitList";

type HabitItemProps = {
  habit: Habit;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

export default function HabitItem({
  habit,
  removeHabit,
  toggleHabit,
}: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streak = habit.completion.length;

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          {streak !== 0 && <span className="text-amber-400">🔥 {streak}</span>}
        </div>
        <Button
          className="text-sm"
          variant="ghost-destructive"
          onClick={() => removeHabit(habit.id)}
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg"
            disabled={isFuture(date)}
            key={date.toISOString()}
            onClick={() => toggleHabit(habit.id, date)}
            variant={
              habit.completion.some((d) => isSameDay(date, d))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
