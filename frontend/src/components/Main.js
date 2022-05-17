import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
   
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__info-wrap">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="button button_edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__text">{currentUser.about}</p>
                </div>

                <button className="button button_add" type="button" onClick={props.onAddPlace} aria-label="Add"></button>
            </section>

            <section className="cards">
                {props.cards.map(item => (
                    <Card
                        key={item._id}
                        name={item.name}
                        link={item.link}
                        likes={item.likes}
                        owner={item.owner}
                        card={{ name: item.name, link: item.link, likes: item.likes, _id: item._id }}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))
                }
            </section>
        </main>
    );
}

export default Main;