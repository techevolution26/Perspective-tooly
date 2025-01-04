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
      <div className="app">
        <InputPage onAddPerspective={handleAddPerspective} />
        <ViewPage
          perspectives={perspectives}
          onLike={handleLike}
          onAddComment={handleAddComment}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    );
  }
  
  export default App;