import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
        avatarRef.current.value = '';
      } 

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Изменить'>
        <input type="url" id="popup__input_type_avatar-link" className="popup__input popup__input_type_avatar-link" name="avatar"
          placeholder="Ссылка на новый аватар" required ref={avatarRef}/>
        <span id="popup__input_type_avatar-link-error" className="popup__error"></span>
      </PopupWithForm>
    )
}


export default EditAvatarPopup;