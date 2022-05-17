import { React } from 'react';
import wrongIcon from '../image/wrongIcon.svg';
import successIcon from '../image/successIcon.svg';


function InfoToolTip(props) {
    return (
        <div className={`popup popup_info ${props.isOpen ? "popup_opened" : ""}`} >
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                {props.status === "success" ? <div className='popup__info-box'>
                    <img className="popup__info-image" src={successIcon} alt='Иконка подтверждения операции' />
                    <p className="popup__info-text">Вы успешно зарегистрировались</p>
                </div> : null}
                {props.status === "fail" ? <div className='popup__info-box'>
                    <img className="popup__info-image" src={wrongIcon} alt='Что-то пошло не так' />
                    <p className="popup__info-text">Что-то пошло не так! Попробуйте ещё раз</p>
                </div> : null}
            </div>


        </div>
    )
}

export default InfoToolTip;