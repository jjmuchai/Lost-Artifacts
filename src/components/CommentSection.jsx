import React, { useState } from 'react';

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Logic to submit the comment
  };

  return (
    <div className='comment-section'>
      <div className='comments-list'>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder='Add a comment...'
      />
      <button onClick={handleCommentSubmit}>Submit</button>
    </div>
  );
};

export default CommentSection;