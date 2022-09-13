import React from "react";

// components
import TopMenu from "./components/TopMenu";
import Wrap from "./elements/Wrap";

// routes
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchRepo from "./pages/SearchRepo";
import IssueList from "./pages/IssueList";


function App() {
  return (
    <Wrap>
      <TopMenu/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchRepo />} />
        <Route path="/issue" element={<IssueList />} />
      </Routes>
    </Wrap>
  );
}

export default App;
