import React from 'react';

function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <h3 className="popup__title">{props.title}</h3>
                <form className={`popup__form popup__form_type_${props.name}`} action="/" name={`popup-${props.name}`} noValidate onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__button">{props.buttonText} </button>
                </form>
                <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;