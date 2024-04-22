import React, { useState, useEffect } from 'react';
import './ErrorCard.scss'

const ErrorCard = ({ error, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Close the error card after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Close the error card
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="error-card">
          <button className="close-btn" onClick={handleClose}>x</button>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default ErrorCard;
