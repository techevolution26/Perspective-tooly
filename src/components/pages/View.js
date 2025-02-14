import React, { useState } from 'react';

function ViewPage({ perspectives, onLike, onAddComment, onDelete, onEdit }) {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState('');
  const [commentText, setCommentText] = useState(''); 

  // Handle media URL conversion if the media is a File object
  const handleMediaUrl = (media) => {
    // Check if it's a File object (image or video)
    if (media && media instanceof File) {
      return URL.createObjectURL(media);
    }
    return media; 
  };

  return (
    <div className="view-page">
      <h2>Perspectives</h2>
      <ul className="perspective-list">
        {perspectives.map((perspective) => (
          <li key={perspective.id} className="perspective-item">
            {editingPostId === perspective.id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={() => {
                    onEdit(perspective.id, editText);
                    setEditingPostId(null);
                  }}
                >
                  Save
                </button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <div className="text-content">{perspective.text}</div>
                {perspective.media && (
                  <div className="media-content">
                    {/* Check if the media is a valid URL and render accordingly */}
                    <img src={handleMediaUrl(perspective.media)} alt="uploaded content" />
                  </div>
                )}
                <div className="timestamp">{perspective.timestamp}</div>
                <div className="actions">
                  <button onClick={() => onLike(perspective.id)}>❤️ {perspective.likes || 0}</button>
                  <button onClick={() => setEditingPostId(perspective.id) || setEditText(perspective.text)}>✏️ Edit</button>
                  <button onClick={() => onDelete(perspective.id)}>🗑️ Delete</button>
                </div>
                <div className="comments">
                  <h4>Comments:</h4>
                  {(perspective.comments || []).map((comment, index) => (
                    <div key={index} className="comment">{comment}</div>
                  ))}
                  <div className="comment-input">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        onAddComment(perspective.id, commentText);
                        setCommentText('');
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewPage;
