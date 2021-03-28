import React from 'react';
import successPath from '../images/successimage.png';
import failPath from '../images/failimage.png';
import closePath from '../images/close.svg';

function InfoTooltip(props) {
    return (
        <>
        <div className={`popup ${props.isOpen ? 'popup_opened' : ' '}`} >
            <div className='popup__tooltip-container'>
                <img className='popup__tooltip-image' src={props.isRequestSuccessful ? successPath : failPath} alt='Иконка' />
                <h2 className='popup__tooltip-title'>{props.isRequestSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                <button className='popup__tooltip-close-button' type='reset' onClick={props.onClose}>
                    <img src={closePath} className='popup__tooltip-close-image' alt='Закрыть' />
                </button>
            </div>
        </div>
        </>
    )
}

export default InfoTooltip;
