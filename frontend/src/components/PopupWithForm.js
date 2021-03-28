import React from 'react'

function PopupWithForm(props) {
    return(
        <div className={props.isOpen ? `popup popup__content_${props.name} popup_opened` : `popup popup__content_${props.name}`}>
        <form className={`popup__content popup__content_${props.name}`} onSubmit={props.onSubmit} name="formProfile" noValidate>{props.title}
          <div className="popup__close" onClick={props.onClose}></div>
          <fieldset className="popup__fieldset popup__fieldset_profile">
            <div>{props.children}</div>
            <button type="submit" className="popup__save">{props.button}</button>
          </fieldset>
        </form>
      </div>
    )
}

export default PopupWithForm