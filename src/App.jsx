import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateListing from "./pages/CreateListing/CreateListing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" />
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;