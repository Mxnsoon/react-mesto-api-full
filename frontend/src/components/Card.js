import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`element__delete ${isOwn ? '' : 'element__delete_hidden'}`);

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);

    function handleCardClick(){
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element__group">
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete} ></button>
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleCardClick}/>
            <div className="element__all">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__container">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;