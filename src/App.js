import "./App.css";
import { Timer, Quotes, Footer } from "pages";

function App() {
  return (
    <div className="flex-centered-column">
      <Timer />
      <Quotes />
      <Footer />
    </div>
  );
}

export default App;
