import { React, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
//import Card from './Card';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import * as auth from '../utils/auth';
import Login from './Login';
import InfoToolTip from './InfoToolTip';


function App() {
  // Стейт состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "", about: "", id: "" });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [infoStatus, setInfoStatus] = useState("");
  const [email, setEmail] = useState("");

  const onLogin = (data) => {
    auth.authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          handleTokenCheck();
          navigate('/');
          setEmail(data.email)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt')
    setIsLoggedIn(false);
    setEmail('');
    navigate('/sign-in')
  }


  useEffect(() => {
    handleTokenCheck();
  }, []);

  //Проверка токена
  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        }
      })
        .catch(err => {
          console.log(err);
          //setIsLoggedIn(false);
        });
    }
  }

  const onRegister = (data) => {
    auth.register(data.email, data.password)
      .then((res) => {

        if (res.data._id) {
          setInfoStatus("success");
          setIsInfoToolTipOpen(true);
          setTimeout(() => {
            closeAllPopups();
            onLogin({ email: data.email, password: data.password });
          }, 3000);
        }
      })
      .catch(err => {
        console.error(err);
        setInfoStatus("fail");
        setIsInfoToolTipOpen(true);
        setTimeout(() => {
          closeAllPopups();
        }, 3000);
      })
      .finally(() => {
        setTimeout(() => {
          setInfoStatus("");
        }, 3000);
      })
  }

  // Подключаем обработчики
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  //Закрываем попапы
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoToolTipOpen(false);
  }

  // Закрытие попапов по Escape
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  //Получаем данные пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //Обновить данные пользователя
  const handleUpdateUser = (data) => {
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }


  //Обновить аватар
  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Получаем карточки с сервера
  useEffect(() => {
    api.getCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  //Ставим лайк/удаляем лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    isLiked
      ? api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch(err => {
          console.error(err);
        })
      : api.getLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch(err => {
          console.error(err);
        });
  }

  //Удаляем карточку
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      });
  }


  //Опубликовать новую карточку
  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={email} handleLogout={handleLogout} />
        <Routes>
          <Route exact path='/' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>

              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          } />

          <Route path="/sign-in" element={
            <Login onLogin={onLogin} />
          } />

          <Route path="/sign-up" element={
            <Register onRegister={onRegister} />
          } />

        </Routes>

        <Footer />

        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} status={infoStatus} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonTitle="Да"
          onClose={closeAllPopups}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
