import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
            <input type="text" id="popup__input_type_name" className="popup__input popup__input_type_name" name="name"
                placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
            <span id="popup__input_type_name-error" className="popup__error"></span>
            <input type="text" id="popup__input_type_job" className="popup__input popup__input_type_job" name="about"
                placeholder="Призвание" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
            <span id="popup__input_type_job-error" className="popup__error"></span>
        </PopupWithForm>
    )
}


export default EditProfilePopup;