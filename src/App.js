import React, { useState } from "react";
import './App.css'; 
import ViewPage from "./components/pages/View.js";
import InputPage from "./components/pages/Input.js";

function App() {
    const [perspectives, setPerspectives] = useState([]); // State to store posts
  
    // Function to handle new post submission
    const handleAddPerspective = (newPerspective) => {
      setPerspectives([newPerspective, ...perspectives]); // Add new post to the list
    };
  
    return (
      <div className="app">
        <h2>Perspective App</h2>
        <InputPage onAddPerspective={handleAddPerspective} />
        <ViewPage perspectives={perspectives} />
      </div>
    );
  }
  
  export default App;