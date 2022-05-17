import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_zoom-image ${props.card.link ? "popup_opened" : ""}`}>
          {props.card && (
           <div className="popup__big">
               <button className="popup__close popup__close_image" type="button" onClick={props.onClose}></button>
                 <figure className="popup__figure">
                   <img className="popup__image-preview" alt={props.card.name} src={props.card.link}/>
                   <figcaption className="popup__image-title">{props.card.name}</figcaption>
                 </figure>
            </div>
          )}
        </div>
    )
}

export default ImagePopup;