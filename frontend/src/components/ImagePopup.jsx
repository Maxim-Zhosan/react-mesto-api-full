import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_zoom ${Object.keys(card).length !== 0 && 'popup_opened'}`}>
        <div className="popup__zoom">
          <figure className="popup__picture">
            <img src={card.link} alt={card.name} className="popup__image" />
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
          <button className="popup__close-icon" type="button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>
    );
}

export default ImagePopup;