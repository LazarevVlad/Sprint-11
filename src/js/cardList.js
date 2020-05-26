export class CardList {
  constructor(container, createNewCard, api) {
    this.container = container;
    this.createNewCard = createNewCard;
    this.api = api;
  }

  addCard(cardData) {
    const templ = this.createNewCard(cardData);
    this.container.appendChild(templ);
  }

  render() {
    this.api
      .getInitialCards()
      .then((cards) => {
        for (const card of cards) {
          this.addCard(card);
          // console.log(cards);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    // for (const cardData of initialCards) {
    //   this.addCard(cardData);
  }
}
