import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Upload from "./Pages/Upload";
import Home from "./Pages/Home";
import Capture from "./Pages/Capture";

function App() {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200 via-indigo-400 to-purple-800 w-screen h-screen flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/capture" element={<Capture />} />
      </Routes>
    </div>
  );
}

export default App;
