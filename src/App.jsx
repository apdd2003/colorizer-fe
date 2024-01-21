import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login";
import UserRoute from "./auth/UserRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<UserRoute />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
