import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_big-image ${card.link ? "popup_is-opened" : ""}`}>
      <figure className="popup__image-container">
        <button className="popup__close" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;