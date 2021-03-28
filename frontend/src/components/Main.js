import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';



function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__block">
              <div className="profile__avatar-container">
                <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
                <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
              </div>
                <div className="profile__info">
                    <div className="profile__all">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit" type='button' onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__text">{currentUser.about}</p>
                </div>
            </div>
            <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="element">
            <ul className="element__list">
                {props.cards.map((card) => {
                    return (
                        <Card
                        card={card}
                        key={card._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        />
                    )
                })}
                
            </ul>
        </section>
    </main>
    );
    
}


export default Main;