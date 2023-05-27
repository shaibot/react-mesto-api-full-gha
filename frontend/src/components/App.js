import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import Footer from "./Footer";
import imgSucces from "../images/successful-registration.svg";
import imgFault from "../images/fault.svg";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileChanging, setIsEditProfileChanging] = useState(false);
  const [isAddPlaceChanging, setIsAddPlaceChanging] = useState(false);
  const [isEditAvatarChanging, setIsEditAvatarChanging] = useState(false);
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [textToolTip, setTextToolTip] = useState('');
  const [openToolTip, setOpenToolTip] = useState(false);
  const [status, setStatus] = useState(false);

  // const [infoToolTipData, setInfoToolTipData] = useState({ isOpen:false, status:false })

  useEffect(() => {
    isLogged &&
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogged]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setOpenToolTip(false)
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (data) => {
    setIsEditProfileChanging(true);
    console.log(data);
    api
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsEditProfileChanging(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsEditAvatarChanging(true);
    api
      .editUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsEditAvatarChanging(false);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    setIsAddPlaceChanging(true);
    api
      .addNewCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsAddPlaceChanging(false);
      });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setStatus(true)
        setTextToolTip('Вы успешно зарегистрировались!')
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setStatus(false)
        setTextToolTip('Что-то пошло не так! Попробуйте еще раз.')
        console.log(`${err}`);
      })
      .finally(() => {
        setOpenToolTip(true);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .authorize(email, password)
      .then((confirm) => {
        if (confirm.token) {
          localStorage.setItem("token", confirm.token); //сохранить токен
          setIsLogged(true);
          navigate("/", { replace: true });
          setUserEmail(email);
          // setStatus(true);
        }
      })
      .catch((err) => {
        console.log(`${err}`);
        setOpenToolTip(true)
        setStatus(false);
        setTextToolTip('Что-то пошло не так! Попробуйте еще раз.')
      });
  }

  function exit() {
    setIsLogged(false);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            navigate("/", { replace: true });
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={isLogged}
                  email={userEmail}
                  exit={exit}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegisterSubmit={handleRegisterSubmit} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLoginSubmit={handleLoginSubmit} />}
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isOpen={openToolTip}
            onClose={closeAllPopups}
            status={status}
            text={textToolTip}
            image={status ? imgSucces : imgFault}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onChanging={isEditProfileChanging}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onChanging={isAddPlaceChanging}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onChanging={isEditAvatarChanging}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
