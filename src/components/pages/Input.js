import React, {useState} from "react";


function InputPage({ onAddPerspective }) {
    const [text, setText] = useState('');
    const [media, setMedia] = useState(null);
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a new perspective object
      const newPerspective = {
        id: Date.now(), // Unique ID
        text,
        media,
        timestamp: new Date().toLocaleString(), // Add timestamp
      };
  
      onAddPerspective(newPerspective); // Send the new post to App.js
      setText(''); // Clear the text input
      setMedia(null); // Clear the media input
    };
  
    return (
      <div className="input-page">
        <h2>Share Your Perspective</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*, video/*"
            onChange={(e) => setMedia(URL.createObjectURL(e.target.files[0]))} // Convert file to previewable URL
          />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
export default InputPage;
