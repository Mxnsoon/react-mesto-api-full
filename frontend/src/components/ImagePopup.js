import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${props.card.link && 'popup_opened'}`}>
        <form className="popup__image">
         <div className="popup__close popup__close_image" onClick={props.onClose}></div>
         <figure className="element__image-content">
         <img src={props.card.link} className="element__image-screen" alt={props.card.name}/>
         <p className="element__image-name">{props.card.name}</p>
        </figure>
       </form>
     </div>
    );
}

export default ImagePopup