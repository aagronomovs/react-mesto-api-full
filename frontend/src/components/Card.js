import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `button_delete ${isOwn ? 'button_delete' : ''}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `button_like ${isLiked ? 'button_like_active' : ''}`
    );
  

    return (

        <article className="item">
            <img className="item__photo" alt={props.name} src={props.link} onClick={handleCardClick} />
            <button className={cardDeleteButtonClassName} hidden={!isOwn} type="button" onClick={handleDeleteClick}></button>
            <div className="item__wrapper">
                <h2 className="item__title">{props.name}</h2>
                <div className="item__like-box">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="item__like-counter">{props.likes.length}</p>
                </div>
            </div>
        </article>

    )
}

export default Card;