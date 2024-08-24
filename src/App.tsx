import { Router } from "wouter";
import "./App.css";
import Home from "./components/Home";
function App() {
  return (
    <div className="h-dvh min-w-96 max-w-[400px] flex justify-center items-center">
      <Router>
        <Home />
      </Router>
    </div>
  );
}

export default App;
