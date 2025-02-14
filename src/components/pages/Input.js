import React, { useState } from "react";

function InputPage({ onAddPerspective }) {
    const [text, setText] = useState('');
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMedia(file);
            setPreview(URL.createObjectURL(file)); 
        }
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newPerspective = {
        id: Date.now(),
        text,
        media,
        timestamp: new Date().toLocaleString(), 
      };
  
      onAddPerspective(newPerspective); 

      // Clear the input fields after submitting
      setText('');
      setMedia(null);
      setPreview(null); 
    };
  
    return (
      <div className="input-page flex-start">
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
            onChange={handleMediaChange} 
          />
          
          {/* Display preview of the media */}
          {preview && (
            <div className="preview-container">
            {media && media.type.startsWith('image') ? (
              <img src={preview} alt="Preview" className="preview-media" />
            ) : media && media.type.startsWith('video') ? (
              <video 
                src={preview} 
                controls 
                width="200" 
                className="preview-media" 
                onError={(e) => {
                  e.target.parentElement.innerHTML = "Failed to load video"; 
                }}
              />
            ) : null}
          </div>
         )}
          
          <button type="submit">Post</button>
        </form>
      </div>
    );
}

export default InputPage;
