import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import logoPath from '../images/logo.png';

function Header (props) {
    const loginNavBar = (
        <nav className='header__container'>
            <Route path='/sign-up'>
                <NavLink className='header__link' to='/sign-in'>Войти</NavLink>
            </Route>
            <Route path='/sign-in'>
                <NavLink className='header__link' to='/sign-up'>Регистрация</NavLink>
            </Route>
            <Route exact path='/'>
                <div className='header__container'>
                    <p className='header__email'>{props.email}</p>
                    <button className='header__button-logout' onClick={props.loggedOut}>Выйти</button>
                </div>
            </Route>
        </nav>
    )

    return (
        <header className="header">
        <img src={logoPath} className="header__logo" alt="лого"/>
        {loginNavBar}
        </header>
    );
}

export default Header;