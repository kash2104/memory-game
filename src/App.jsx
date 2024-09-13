import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/play"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
