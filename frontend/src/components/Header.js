import React from 'react';
import logo from '../image/logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header({ email, handleLogout }) {


    return (
        <header className="header" >
            <img className="logo" src={logo} alt="Логотип" />
            <div className='header__container'>
                <Routes>
                    <Route exact path='/sign-up' element={
                        <Link to='/sign-in' className='header__link'>Войти</Link>} >
                    </Route>

                    <Route exact path='/sign-in' element={
                        <Link to='/sign-up' className='header__link'>Регистрация</Link>}>
                    </Route>

                    <Route exact path='/' element={<>
                        <p className='header__email header__link'>{email}</p>
                        <button className='header__logout button' onClick={handleLogout} type='button'>Выйти</button>
                    </>
                    } >
                    </Route>

                </Routes>

            </div>
        </header>
    );
}

export default Header;