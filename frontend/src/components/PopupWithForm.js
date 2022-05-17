import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""} `}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="button popup__submit" >{props.buttonTitle}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;