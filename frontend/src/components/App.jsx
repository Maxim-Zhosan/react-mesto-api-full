import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [regSuccess, setIsRegSuccess] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedCard, setCardPopupOpen] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [headerLink, setHeaderLink] = React.useState({ name: "", link: "/" });
  const [headerUserEmail, setHeaderUserEmail] = React.useState("");
  const [cards, loadCards] = React.useState([]);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };

  function handleCardClick(card) {
    setCardPopupOpen(card);
  };

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleHeaderLink(data) {
    setHeaderLink(data)
  };

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then(newCard => {
        loadCards([newCard, ...cards]);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        loadCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id)
      .then(loadCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  };

  function handleRegister(data) {
    auth.registerNewUser(data)
      .then(res => {
        if (res.data) {
          setIsInfoTooltipPopupOpen(true);
          setIsRegSuccess(true)
          console.log(res.data);
        } else { return }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
        setIsRegSuccess(false);
      })
  };

  function handleAuth(data) {
    auth.authUser(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          console.log(isLoggedIn);
          console.log(res.token);
        }
      })
      .then(() => { history.push('/') })
      .catch((err) => console.log(err));
  };

  function handleLogout() {
    localStorage.removeItem('token');
    setHeaderUserEmail("");
    history.push('/sign-in');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setCardPopupOpen({})
    setDeletedCard({})
    setIsRegSuccess(false)
  }

  React.useEffect(() => {
    api.getUserInformation()
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => console.log(err));
    api.getInitialCards()
      .then(res => {
        loadCards(res.map(item => ({
          _id: item._id,
          name: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner
        })))
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      auth.checkToken(localStorage.getItem('token'))
        .then((res) => {
          if (res.data.email) {
            setIsLoggedIn(true);
            setHeaderUserEmail(res.data.email);
          }
        })
        .then(() => { history.push('/') })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <LoggedInContext.Provider value={isLoggedIn}>
          <div className="page">
            <Header headerLink={headerLink} headerUserEmail={headerUserEmail} onLogout={handleLogout} />
            <Switch>

              <ProtectedRoute exact path="/">
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onDeleteCard={handleDeleteCardClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  setHeaderLink={handleHeaderLink}
                />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} card={deletedCard} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </ProtectedRoute>

              <Route exact path="/sign-in">
                <Login setHeaderLink={handleHeaderLink} onLogin={handleAuth} />
                <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={regSuccess} />
              </Route>

              <Route exact path="/sign-up">
                <Register setHeaderLink={handleHeaderLink} onRegister={handleRegister} />
                <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={regSuccess} />
              </Route>

              <Route path="*">
                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>

            </Switch>
          </div>
        </LoggedInContext.Provider>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
