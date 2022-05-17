import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
      
      props.onUpdateAvatar(
        avatarRef.current.value,
      );
  }
  
  return (
    <PopupWithForm
    name="avatar"
    title="Обновить аватар"
    buttonTitle="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}>

    <input id="avatar-link-input" 
    ref={avatarRef}
    type="url" 
    className="popup__input popup__input_field_link" 
    name="link"
    placeholder="Ссылка" 
    required />
    <span id="avatar-link-input-error" className="popup__error"></span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;