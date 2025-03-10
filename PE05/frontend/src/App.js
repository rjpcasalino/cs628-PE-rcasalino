import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

// The next line is required for the css prop to work!
/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

const App = () => {
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;