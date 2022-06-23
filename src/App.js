import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "../src/Routes/Routes";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Nav.map((route, index) => (
          <Route
            key={route + index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
