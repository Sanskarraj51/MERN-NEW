import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import Success from "./pages/Success";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
