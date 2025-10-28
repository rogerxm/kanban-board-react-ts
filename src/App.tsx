import { Board } from "./components/Board";

function App() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Kanban Board
          </h1>
        </header>

        <main>
          <Board />
        </main>
      </div>
    </div>
  );
}

export default App;
