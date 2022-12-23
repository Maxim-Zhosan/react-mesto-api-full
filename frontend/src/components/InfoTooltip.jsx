import React from 'react';
import regSuccessImage from '../images/regSuccess.svg';
import regErrorImage from '../images/regError.svg';


function InfoTooltip(props) {

    return (
        <div className={`popup popup_type_info-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_type_info-tooltip">
                <img src={props.isSuccess ? regSuccessImage : regErrorImage} alt="Статус" className="popup__info-tooltip-image" />
                <h3 className="popup__title">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
                <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;