import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";
import ViewPage from "./components/pages/View";
import InputPage from "./components/pages/Input";
import SignUpForm from "./components/pages/signUp";
import SignInForm from "./components/pages/login";


function App() {
  const [perspectives, setPerspectives] = useState([]); // State to store posts

  // Function to handle new post submission
  const handleAddPerspective = (newPerspective) => {
    setPerspectives([newPerspective, ...perspectives]); // Add new post to the list
  };

  const handleLike = (id) => {
    setPerspectives(
      perspectives.map((post) =>
        post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  const handleDelete = (id) => {
    setPerspectives(perspectives.filter((post) => post.id !== id));
  };

  const handleEdit = (id, updatedText) => {
    setPerspectives(
      perspectives.map((post) =>
        post.id === id ? { ...post, text: updatedText } : post
      )
    );
  };

  const handleAddComment = (id, comment) => {
    setPerspectives(
      perspectives.map((post) =>
        post.id === id
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  return (
    <Router>
      <Navigation />
      <div className="app">
        <Routes>
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Input" element={<InputPage onAddPerspective={handleAddPerspective} />} />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
