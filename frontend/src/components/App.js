import '../index';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ImagePopup from '../components/ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isRequestSuccessful, setisRequestSuccessful] = React.useState(false);

  React.useEffect(() => { 
    api.getInitialCards() 
    .then((data) => { 
        setCards(data)
    })
    .catch((err) => {
        console.log(err);
    });
}, []); 

  React.useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function handleUpdateUser(user) {
    api.setUserData(user).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })    
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleCardDelete(card) {
    api.removeCard(card).then(() => {
      const newCards = cards.filter((item) => item._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlace(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard,...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
    setIsInfoTooltipOpen(false)
  }
  
  function handleRegister(email, password) {
    auth.register(email, password)
    .then((res) => {
      if (res) {
        setIsInfoTooltipOpen(true)
        setisRequestSuccessful(true)
        history.push('/sign-in')
      }
    })
    .catch((err) => {
      console.log(err)
      setIsInfoTooltipOpen(true)
      setisRequestSuccessful(false)
    })
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      if (res.token){
          localStorage.setItem('jwt', res.token)
          return res
      } else {
          return
      }
  })
    .then(data => {
      if (data.token) {
        setLoggedIn(true)
        setEmail(email)
        history.push('/')
      }
    })
    .catch(err => {
      console.log(err)
      setIsInfoTooltipOpen(true)
      setisRequestSuccessful(false)
    })
  }

  function handleLogout() {
    setLoggedIn(false)
    setEmail(email)
    localStorage.removeItem('jwt')
    history.push('/sign-in')
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            history.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  React.useEffect(() => {
    handleTokenCheck()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
    <Header email={email} loggedOut={handleLogout} loggedIn={loggedIn} />
    <Switch>
      <ProtectedRoute exact path='/'
      loggedIn={loggedIn}
      component={Main}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    closeAllPopups={closeAllPopups}
    cards = {cards} />
     <Route path='/sign-in'>
       <Login handleLogin={handleLogin} setEmail={setEmail} />
     </Route>
     <Route path='/sign-up'>
       <Register handleRegister={handleRegister} />
     </Route>
     <Route>
       {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
     </Route>
     </Switch>
    <Footer />

    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
    <PopupWithForm
    title="Вы уверены?"
    name="confirmation"
    />
    <InfoTooltip isRequestSuccessful={isRequestSuccessful} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
</div>
</CurrentUserContext.Provider>

  );
}

export default App;
