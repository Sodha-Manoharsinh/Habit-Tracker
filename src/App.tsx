import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";
import HabitProvider from "./components/context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

const App = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  function handleWeekOffset(direction: "Next" | "Prev") {
    setWeekOffset((curr) => {
      if (direction === "Prev") return curr - 1;
      if (direction === "Next") return curr + 1;
      return curr;
    });
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          handleWeekOffset={handleWeekOffset}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
};

export default App;
