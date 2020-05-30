export default class FormValidator {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector("button");
  }

  checkInputValidity(input) {
    const errorElement = this.form.querySelector(`#error-${input.id}`);

    const words = {
      validationLenght: "Должно быть от 2 до 30 символов",
      validationUrl: "Здесь должна быть ссылка",
      validationMissing: "Это обязательное поле",
    };

    if (input.validity.valueMissing) {
      errorElement.textContent = words.validationMissing;
      input.parentNode.classList.add("input-container__invalid");
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      errorElement.textContent = words.validationLenght;
      input.parentNode.classList.add("input-container__invalid");

      return false;
    }

    if (input.validity.typeMismatch) {
      errorElement.textContent = words.validationUrl;
      input.parentNode.classList.add("input-container__invalid");

      return false;
    }

    input.parentNode.classList.remove("input-container__invalid");
    input.textContent = "";

    return true;
  }

  setSubmitButtonState(state) {
    if (this.form.checkValidity()) {
      this.button.removeAttribute("disabled", state);
      this.button.classList.add("popup__button_abled");
    } else {
      this.button.setAttribute("disabled", state);
      this.button.classList.remove("popup__button_abled");
    }
  }
  setEventListeners() {
    this.form.addEventListener("input", () => {
      const inputs = this.form.querySelectorAll("input");
      let isValid = true;
      inputs.forEach((input) => {
        if (!this.checkInputValidity(input)) {
          isValid = false;
        }
        this.setSubmitButtonState(isValid);
      });
    });
  }
}
