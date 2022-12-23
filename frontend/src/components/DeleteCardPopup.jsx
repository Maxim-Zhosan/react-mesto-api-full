import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card }) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
        onClose();
    }

    return (
        <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={isOpen} onClose={onClose} buttonText="Да" onSubmit={handleSubmit}>
        <span id="popup__input_type_link-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default DeleteCardPopup;
