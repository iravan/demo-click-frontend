import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Client from "./pages/Client";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";

import uuid from "react-uuid";
import React from "react";

export const UserContext = React.createContext("USER");

function App() {
  const SID = uuid();
  return (
    <UserContext.Provider value={SID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="client" element={<Client />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
