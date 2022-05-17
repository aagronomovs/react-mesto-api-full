import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }  

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}>

        <input id="userform-name-input" 
               type="text" 
               className="popup__input popup__input_field_name" 
               name="name"
               minLength="2" 
               maxLength="40" 
               required 
               placeholder="Имя" 
               value={name} 
               onChange={handleChangeName}/>
        <span id="userform-name-input-error" className="popup__error"></span>
        <input id="userform-job-input" 
               type="text" 
               className="popup__input popup__input_field_job" 
               name="about"
               placeholder="О себе" 
               minLength="2" 
               maxLength="200" 
               required 
               value={description}
               onChange={handleChangeDescription} />
        <span id="userform-job-input-error" className="popup__error"></span>

    </PopupWithForm>
  )
} 

export default EditProfilePopup;