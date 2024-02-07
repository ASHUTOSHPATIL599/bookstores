import "./App.css";
import Books from "./screens/Books";
import AllBook from "./screens/AllBook";
import Update from "./screens/update";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Books />} />
        <Route exact path="/books" element={<AllBook />} />

        <Route exact path="/updatebook/:bid" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
