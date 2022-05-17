import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
       // Передаём значения управляемых компонентов во внешний обработчик
      props.onAddPlace({
        name,
        link
      });
  }

  return (
    <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonTitle="Создать"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
         >

        <input id="card-name-input" 
               type="text" 
               className="popup__input popup__input_field_card-name" 
               name="cardName"
               placeholder="Название" 
               minLength="2" 
               maxLength="30" 
               required
               value={name}
               onChange={handleChangeName} />
        <span id="card-name-input-error" className="popup__error"></span>
        <input id="card-link-input"
              type="url" 
              className="popup__input popup__input_field_link" 
              name="cardLink"
              placeholder="Ссылка на картинку" 
              required
              value={link}
              onChange={handleChangeLink} />
        <span id="card-link-input-error" className="popup__error"></span>
    </PopupWithForm>
    )
}

export default AddPlacePopup;