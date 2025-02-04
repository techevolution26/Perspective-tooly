import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";
import ViewPage from "./components/pages/View";
import InputPage from "./components/pages/Input";

function App() {
  const [perspectives, setPerspectives] = useState([]); // State to store posts

  // Function to handle new post submission
  const handleAddPerspective = (newPerspective) => {
    setPerspectives([newPerspective, ...perspectives]); // Add new post to the list
  };

  // Function to handle likes
  const handleLike = (id) => {
    setPerspectives(
      perspectives.map((post) =>
        post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  // Function to handle comments
  const handleAddComment = (id, comment) => {
    setPerspectives(
      perspectives.map((post) =>
        post.id === id
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  // Function to delete a post
  const handleDelete = (id) => {
    setPerspectives(perspectives.filter((post) => post.id !== id));
  };

  // Function to edit a post
  const handleEdit = (id, updatedText) => {
    setPerspectives(
      perspectives.map((post) =>
        post.id === id ? { ...post, text: updatedText } : post
      )
    );
  };

  return (
    <Router>
      <Navigation />
      <div className="app">

        <Routes>
          
          <Route path="Home" element={<Home />} />
          <Route 
            path="/Input" 
            element={<InputPage onAddPerspective={handleAddPerspective} />} 
          />

          <Route 
            path="/View" 
            element={
              <ViewPage
                perspectives={perspectives}
                onLike={handleLike}
                onAddComment={handleAddComment}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            } 
          />

          <Route path="/profile" element={<Profile />} /> clear
          
          <Route path="/settings" element={<Settings />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;