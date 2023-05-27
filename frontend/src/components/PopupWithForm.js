import React from "react";

function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit }) {
  return (
    <>
      <div
        className={`popup popup_type_${name} ${
          isOpen ? "popup_is-opened" : ""
        }`}
      >
        <div className="popup__container">
          <button className="popup__close" onClick={onClose} />
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
            {children}
            <button className="popup__button" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
