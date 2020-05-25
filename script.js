"use strict";
// import { initialCards } from "./initialCards.js";
(function () {
  // Переменные
  // const popupImgOpen = document.querySelector(".popup__img-open");
  const list = document.querySelector(".places-list");
  const openForm = document.querySelector(".user-info__button");
  // const closeForm = document.querySelector(".popup__close");
  // const closeFormEdit = document.querySelector(".popup__close_edit ");
  // const img = document.querySelector(".place-card__image");
  const root = document.querySelector(".root");
  const form = document.forms.new;
  const formButton = document.querySelector(".popup__button_type_new");
  const openFormEdit = document.querySelector(".user-info__button_type_edit");
  const editButton = document.querySelector(".popup__button_type_edit");
  const popupImg = document.querySelector(".popup_img");
  const userPhoto = document.querySelector(".user-info__photo");
  // const userInfoName = document.querySelector(".user-info__name");
  // const userInfoJob = document.querySelector(".user-info__job");
  // const closeImage = document.querySelector(".popup__img_close");
  const formEdit = document.forms.edit;
  const formAvatar = document.forms.avatar;
  const formButtonAvatar = document.querySelector(".popup__button_type_avatar");
  // const userAvatar = document.querySelector(".user-info__photo");

  // const openImage = document.querySelector(".popup__content_image");
  const options = {
    baseUrl: "https://praktikum.tk/cohort10",
    token: "623ffd9d-f498-4eee-8946-dfe944c061d5",
  };

  // Api
  const api = new Api(options);
  //
  function openImagePopup(image) {
    const popupImgOpen = document.querySelector(".popup__img-open");
    popupImgOpen.setAttribute("src", image);
    popupImg.classList.add("popup_is-opened");
  }

  const createNewCard = (cardData) => {
    const card = new Card(cardData, openImagePopup, api);
    return card.createCard();
  };

  const cardList = new CardList(list, createNewCard, api);
  cardList.render();
  //
  const popup = new Popup(root.querySelector(".popup"));
  const popupEdit = new Popup(root.querySelector(".popup_edit"));
  const popupImage = new Popup(root.querySelector(".popup_img"));
  const popupAvatar = new Popup(root.querySelector(".popup_avatar"));

  openFormEdit.addEventListener("click", popupEdit.open);
  openForm.addEventListener("click", popup.open);
  userPhoto.addEventListener("click", popupAvatar.open);
  //
  form.addEventListener("submit", () => {
    event.preventDefault();
    formButton.textContent = "Загрузка...";
    const formName = form.elements.name;
    const formLink = form.elements.link;
    const formData = {
      name: formName.value,
      link: formLink.value,
    };
    api
      .addNewCard(formData)
      .then((serverResponse) => {
        cardList.addCard(serverResponse);
        popup.close();
        form.reset();
        formButton.textContent = "+";
        formButton.setAttribute("disabled", true);
        formButton.classList.remove("popup__button_abled");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  });
  //

  // formButton.addEventListener("click", popup.close);
  // editButton.addEventListener("click", popupEdit.close);

  const formNameEdit = formEdit.elements.name_edit;
  const formJob = formEdit.elements.job;

  const userInfo = new UserInfo(
    formNameEdit,
    formJob,
    document.querySelector(".user-info__name"),
    document.querySelector(".user-info__job"),
    userPhoto,
    api
  );
  userInfo.getUserProfile();
  openFormEdit.addEventListener("click", userInfo.setUserInfo());

  formEdit.addEventListener("submit", () => {
    event.preventDefault();
    editButton.textContent = "Загрузка...";

    api
      .sendUserInfo(formNameEdit.value, formJob.value)
      .then((serverResponse) => {
        userInfo.updateUserInfo(serverResponse.name, serverResponse.about);
        popupEdit.close();
        editButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  });
  //
  formAvatar.addEventListener("submit", () => {
    event.preventDefault();
    formButtonAvatar.textContent = "Загрузка...";
    const formAvatarValue = formAvatar.elements.avatarLink;
    api
      .changeAvatar(formAvatarValue.value)
      .then((serverResponse) => {
        userInfo.updateUserAvatar(serverResponse.avatar);
        popupAvatar.close();
        formAvatar.reset();
        formButtonAvatar.textContent = "Сохранить";

        formButtonAvatar.setAttribute("disabled", true);
        formButtonAvatar.classList.remove("popup__button_abled");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  });
  //

  //
  const checkForm = new FormValidator(document.forms.new);
  const checkFormEdit = new FormValidator(document.forms.edit);
  const checkFormAvatar = new FormValidator(document.forms.avatar);
  checkForm.setEventListeners();
  checkFormEdit.setEventListeners();
  checkFormAvatar.setEventListeners();
})();

/*

  Отлично, запросы на сервер выполняются. 
  Но есть несколько замечаний

  Надо исправить:
  - обработка ошибок должна находится в самом конце обработки промиса, поэтому нужно                               (ИСПРАВИЛ)
  убрать её из класса Api и повестить там где вызывается метод 
  - все изменения на странице должны происходить только после ответа сервера, в том числе
  закрытие попапа. Сейчас попап редактирования данных пользователя при сохранении закрывается даже если             (ИСПРАВИЛ, надеюсь)
  запрос на сервер завершился ошибкой.
  Для этого нужно перенести запрос к серверу в обработчик formEdit.addEventListener("submit", () => {
  и в updateUserInfo передавать именно данные полученные от сервера, либо передавать в updateUserInfo
  колбек который будет закрывать попапа после сохранения данных пользователя

  Можно лучше:
  - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод
*/

/*
    Критические замечания исправлены, но ещё надо исправить:
    - при каждой отправке формы происходит навешивание обработчика на кнопку, это лишнее                (ИСПРАВИЛ)
    там нужно просто вызывать метод close для закрытия попапа
*/
