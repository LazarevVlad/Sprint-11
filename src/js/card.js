"use strict";
export default class Card {
  constructor(cardData, openImageCallback, api) {
    this.cardData = cardData;
    this.openImageCallback = openImageCallback;
    this.card = document.createElement("div");
    this.myId = "21d1e66a4236b1f6d5ebc823";
    this.api = api;
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.openImage = this.openImage.bind(this);
  }

  createCard() {
    this.card.classList.add("place-card");
    this.card.insertAdjacentHTML(
      "beforeend",
      `<div class="place-card__image">
             <button class="place-card__delete-icon" style="display: none"></button>
           </div>
           <div class="place-card__description">
             <h3 class="place-card__name"></h3>
             <div class="place-card__like-container">
              <button class="place-card__like-icon"></button>
              <p class="place-card__like-counter">${this.cardData.likes.length}</p>
             </div>
           </div>`
    );
    this.card.querySelector(
      ".place-card__name"
    ).textContent = this.cardData.name;
    this.card.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.cardData.link})`;
    this.setListener();
    return this.card;
  }
  delete() {
    if (this.cardData.owner._id === this.myId) {
      this.card
        .querySelector(".place-card__delete-icon")
        .removeAttribute("style");
    }
  }
  setListener() {
    let likesArray = this.cardData.likes;
    for (let el of likesArray) {
      if (el._id === this.myId) {
        this.card
          .querySelector(".place-card__like-icon")
          .classList.add("place-card__like-icon_liked");
      }
    }
    this.card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
    this.card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.card
      .querySelector(".place-card__image")
      .addEventListener("click", this.openImage);
    this.delete();
  }
  removeListener() {
    this.card
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);

    this.card
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);

    this.card
      .querySelector(".place-card__image")
      .removeEventListener("click", this.openImage);
  }
  like(event) {
    if (
      event.target.classList.value ==
      "place-card__like-icon place-card__like-icon_liked"
    ) {
      this.api
        .deleteLike(this.cardData._id)
        .then((data) => {
          if (data) {
            this.card.querySelector(".place-card__like-counter").textContent =
              data.likes.length;
            event.target.classList.remove("place-card__like-icon_liked");
          }
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    } else {
      this.api
        .setLike(this.cardData._id)
        .then((data) => {
          if (data) {
            this.card.querySelector(".place-card__like-counter").textContent =
              data.likes.length;
            event.target.classList.add("place-card__like-icon_liked");
          }
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }
  remove(event) {
    let answer = confirm("Вы действительно хотите удалить эту карточку?");
    if (answer) {
      this.api
        .deleteCard(this.cardData._id)
        .then((data) => {
          if (data.ok) {
            this.removeListener();
            event.target.closest(".place-card").remove();
          }
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }
  openImage() {
    this.openImageCallback(this.cardData.link);
  }
}
