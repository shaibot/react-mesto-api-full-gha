import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (isOpen) {
      setName('')
      setLink('')
    }
  }, [isOpen])

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeLink (e) {
    setLink(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace({ name, link })

  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="card-add"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        className="name popup__input popup__input_name"
        id="name-card"
        name="name"
        type="text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={name}
        onChange={handleChangeName}
      />
      <span id="name-card-error" className="popup__error" />
      <input
        id="link"
        type="url"
        className="popup__occupation link popup__input"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        value={link}
        onChange={handleChangeLink}
      />
      <span id="link-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
