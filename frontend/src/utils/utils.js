export const popupEditAvatar = document.querySelector(popupEditAvatarSelector)
export const popupFormEditAvatar = popupEditAvatar.querySelector(
  '#form-for-edit-avatar',
)

export const popupOpenButtonElement = document.querySelector(
  '.profile__edit-button',
)
export const popupCardAddOpenButtonElement =
  document.querySelector('.profile__button')
export const popupInputLinkAvatar =
  popupEditAvatar.querySelector('.popup__input_link')
export const editAvatarBtn = document.querySelector('.profile__edit-avatar-btn')
export const popupDeleteCard = document.querySelector('#popup-card-delete')
export const BtnOpenPopupDeleteCard = document.querySelector('element__card-delete')

export const cardListContainer = '.elements__list'
export const cardAddForm = popupCardAdd.querySelector('.popup__form')
export const profileEditForm = popupEditProfile.querySelector('.popup__form')

export const nameInput = profileEditForm.querySelector('.popup__input_name')
export const occupationInput = profileEditForm.querySelector(
  '.popup__input_occupation',
)
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

export const profileSelector = {
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation',
  avatarInfoSelector: '.profile__avatar'
}

export const profileName = document.querySelector(profileSelector.userNameSelector)
export const profileOccupation = document.querySelector(
  profileSelector.userInfoSelector
)
export const profileAvatar = document.querySelector(profileSelector.avatarInfoSelector)