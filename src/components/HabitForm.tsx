import { SubmitEvent, useState } from "react";
import Button from "./Button";
import { useHabits } from "./context/useHabits";

export default function HabitForm() {
  const [name, setName] = useState("");
  const habitContext = useHabits();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (name.trim() === "") return;
    habitContext.addHabit(name);
    setName("");
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 "
        placeholder="New habit..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        disabled={name.trim() === ""}
        className="rounded-ld px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
}
