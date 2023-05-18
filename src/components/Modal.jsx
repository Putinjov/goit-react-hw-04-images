import React from 'react';

const Modal = ({ image, onClose }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;