import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

import Card from './Card';

function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onDeleteCard, onCardClick, onCardLike, setHeaderLink } = props;
  const userInfo = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  React.useEffect(() => {
    setHeaderLink({
      name: "Выход",
      link: "/sign-in"
    })
  }, [])

  return (

    <main className="content">

      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${userInfo.avatar})` }}></div>
        <div className="profile__profile-block">
          <div className="profile__profile-info">
            <h1 className="profile__name">{userInfo.name}</h1>
            <p className="profile__description">{userInfo.about}</p>
          </div>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить карточку" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            name={card.name}
            link={card.link}
            likes={card.likes}
            key={card._id}
            onCardClick={onCardClick}
            cardOwner={card.owner}
            currentUser={userInfo._id}
            onCardLike={onCardLike}
            card={card}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </section>

    </main >
  )
}

export default Main;