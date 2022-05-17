export const dataForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const popupEditButtonElement = document.querySelector(".button_edit");
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const formElementProfile = document.forms.userform;
export const formElementAvatar = document.forms.avatar;
export const formElementDelete = document.forms.delete;
export const formEditProfileElement = document.querySelector(
 ".popup__form_edit-profile"
);
export const nameInput = formEditProfileElement.querySelector(
  ".popup__input_field_name"
);
export const jobInput = formEditProfileElement.querySelector(
  ".popup__input_field_job"
);
export const titleProfile = document.querySelector(".profile__title");
export const infoProfile = document.querySelector(".profile__text");
export const avatarProfile = document.querySelector(".profile__avatar");
export const cardsContainer = document.querySelector(".cards");
export const popupAddButtonElement = document.querySelector(".button_add");
export const formAddCardElement = document.querySelector(".popup__form_add-card");
export const cardNameInput = formAddCardElement.querySelector(
  ".popup__input_field_card-name"
);
export const cardLinkInput = formAddCardElement.querySelector(
  ".popup__input_field_link"
);
export const popupAddNewCard = document.querySelector(".popup_add-card");
export const formElementCard = document.forms.card;
export const popupZoomImage = document.querySelector(".popup_zoom-image");
export const popupUpdateAvatar = document.querySelector(".popup_avatar");
export const buttonSubmit = document.querySelector(".popup__submit");
export const profileAvatarEditElement = document.querySelector(".profile__avatar-container");
export const buttonAvatarSubmit = document.querySelector(".popup__submit_avatar");
export const buttonProfileSubmit = document.querySelector(".popup__submit_profile");
export const popupConfirmation = document.querySelector(".popup_delete-card");
export const buttonAddCardSubmit = document.querySelector(".popup__submit_add-card");