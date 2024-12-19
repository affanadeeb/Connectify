import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaTrash, FaLanguage, FaFileAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function PostList() {
  const [posts, setPosts] = useState([]);
  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log('Current user:', user);
  console.log('Posts:', posts);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setPosts(posts.filter(post => post._id !== postId));
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleTranslate = async (postId, content) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ targetLanguage: 'es' }) // You can make this dynamic
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Translated text: ${data.translatedContent}`);
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert('Failed to translate post');
    }
  };

  const handleSummarize = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/summarize`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Summary: ${data.summary}`);
      } else {
        throw new Error('Summarization failed');
      }
    } catch (error) {
      console.error('Summarization error:', error);
      alert('Failed to summarize post');
    }
  };

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-header">
            <div className="post-user">
              <div className="user-avatar">
                {post.user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <span className="username">{post.user?.username || 'Anonymous'}</span>
                <span className="post-time">{formatDate(post.createdAt)}</span>
                {post.feeling && (
                  <span className="post-feeling">is feeling {post.feeling}</span>
                )}
              </div>
            </div>
            {user && post.user && user._id === post.user._id && (
              <button 
                className="delete-button"
                onClick={() => handleDelete(post._id)}
                title="Delete post"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="post-content">
            {post.content}
          </div>

          {post.mediaUrl && (
            <div className="post-media">
              {post.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img 
                  src={`http://localhost:5000${post.mediaUrl}`} 
                  alt="Post media" 
                />
              ) : (
                <video 
                  src={`http://localhost:5000${post.mediaUrl}`} 
                  controls 
                />
              )}
            </div>
          )}

          <div className="post-actions">
            <button className="action-button">
              <FaThumbsUp /> Like
            </button>
            <button className="action-button">
              <FaComment /> Comment
            </button>
            <button className="action-button">
              <FaShare /> Share
            </button>
            <button className="action-button" onClick={() => handleTranslate(post._id, post.content)}>
              <FaLanguage /> Translate
            </button>
            <button className="action-button" onClick={() => handleSummarize(post._id)}>
              <FaFileAlt /> Summarize
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList; 