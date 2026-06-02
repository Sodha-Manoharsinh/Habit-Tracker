import { format, isToday } from "date-fns";
import Button from "./Button";
import { useHabits } from "./context/useHabits";

type HeaderProps = {
  visibleDates: Date[];
  handleWeekOffset: (direction: "Next" | "Prev") => void;
};

export default function Header({
  visibleDates,
  handleWeekOffset,
}: HeaderProps) {
  const { habits } = useHabits();

  const doneToday = habits.filter((h) =>
    h.completion.some((c) => isToday(c)),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates[visibleDates.length - 1], "MMM d")}`;

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday} / {habits.length} done today
        </span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={() => handleWeekOffset("Prev")}>Prev</Button>
          <Button
            onClick={() => handleWeekOffset("Next")}
            disabled={visibleDates.some((c) => isToday(c))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
