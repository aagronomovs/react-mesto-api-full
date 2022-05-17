import {React, useState } from 'react';
import { Link } from 'react-router-dom';



function Register({onRegister }) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({email: values.email, password: values.password });
    }

    return (
              
        <div className='register'>
            <p className='register__title'>Регистрация</p>
            <form onSubmit={handleSubmit} noValidate className="register__form">
                <input id="email" name="email" type="email" placeholder='Email' className='register__form-input' value={values.email || ''} onChange={handleChange} />
                <input id="password" name="password" type="password" placeholder='Пароль' className='register__form-input' value={values.password || ''} onChange={handleChange} />
                
                <button type="submit" className="register__button">Зарегистрироваться</button>
                
            </form>
            <div className="register__signin">
                <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
            </div>
        </div>
        
    );
}

export default Register;