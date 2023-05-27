import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, onChanging }) {
  const avatar = useRef();

  useEffect(() => {
    if (isOpen) {
      avatar.current.value = '';
    }
  }, [isOpen])

  function handleSubmit (e) {
    e.preventDefault();

    onUpdateAvatar(avatar.current.value);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar-edit"
      title="Сменить аватар"
      buttonText={onChanging ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="link-avatar"
        type="url"
        className="popup__occupation link popup__input popup__input_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={avatar}
      />
      <span id="link-avatar-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
