import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BlogList from "./components/blogList";

import "./App.css";

function App() {
  return (
    <Router>
        <BlogList/>
    </Router>
  );
}

export default App;
