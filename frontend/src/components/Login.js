import {React, useState } from 'react';


function Login({onLogin}) {
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
        if (!values.email || !values.password) {
            return;
        }
       onLogin({email: values.email, password: values.password });
    }

   
    return (
            
        <div className='register'>
            <p className='register__title'>Вход</p>
            <form onSubmit={handleSubmit} noValidate className="register__form">
               <input id="email" required name="email" type="email" className='register__form-input' placeholder='Email' value={values.email || ''} onChange={handleChange} />
          
               <input id="password" required name="password" type="password" className='register__form-input' placeholder='Пароль' value={values.password || ''} onChange={handleChange} />
            
               <button type="submit" className="register__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;