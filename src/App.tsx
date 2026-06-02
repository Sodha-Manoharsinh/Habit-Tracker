import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";
import HabitProvider from "./components/context/HabitProvider";

const App = () => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
      <HabitProvider>
        <Header />
        <HabitForm />
        <HabitList />
      </HabitProvider>
    </div>
  );
};

export default App;
