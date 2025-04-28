import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CommentSection = ({ artifactId, comments, refreshArtifact }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Swal.fire('Oops!', 'Comment cannot be empty.', 'warning');
      return;
    }

    try {
      const updatedComments = [...comments, newComment];
      await axios.patch(`http://localhost:5000/posts/${artifactId}`, {
        comments: updatedComments
      });
      Swal.fire('Success!', 'Comment added successfully.', 'success');
      setNewComment('');
      refreshArtifact(); 
    } catch (error) {
      console.error('Error adding comment:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="mt-8 p-4 border-t border-gray-200">
      <h3 className="text-xl font-bold mb-4">Comments</h3>

      <div className="space-y-3 mb-6">
        {comments.map((comment, idx) => (
          <div key={idx} className="bg-gray-100 p-3 rounded-md">{comment}</div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border p-2 rounded-md focus:outline-none"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
