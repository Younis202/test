import React from 'react';
import './post-card.css';

const PostCard = ({
  thumbnail,
  caption,
  source,
  url,
  onSend,
  hideClose,
}) => {
  const handleSend = (e) => {
    e.preventDefault();
    if (onSend && url) {
      onSend(url);
    }
  };

  return (
    <div className="post-card">
      <div className="post-card-thumbnail">
        <img src={thumbnail} alt="Post thumbnail" />
        <div className="post-card-play-overlay">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="post-card-body">
        <div className="post-card-caption">
          {caption}
        </div>
        <div className="post-card-source">
          {source}
        </div>
      </div>

      {!hideClose && (
        <button
          type="button"
          className="post-card-close"
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <path d="M18.3 5.71L16.59 3.9L12 8.59 7.41 4.01 5.6 5.71 10.2 10.3 11.9 12 10.2 13.7 7.41 16.09 8.59 17.9 13.19 12.5 14.9 10.8 10.2 7.1 18.3 5.71z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PostCard;
