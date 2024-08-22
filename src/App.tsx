import { Router } from "wouter";
import "./App.css";
import Home from "./components/Home";
function App() {
  return (
    <div className="w-full h-full">
      <Router>
        <Home />
      </Router>
    </div>
  );
}

export default App;
