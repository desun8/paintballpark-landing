// import { throttle } from "lodash";
import Inputmask from "inputmask";

// Функционал:
// - инициализация инпут-маски
// - валидация
// - отправка формы
// - отображение сообщения об успешной отправке
// - очистка полей формы
// *
// В форме используется инпутмаска
// https://github.com/RobinHerbots/Inputmask
// *
// Соответственно вся валидация учитывает наличие данной библиотеки
class Form {
  constructor(elm) {
    this.$elm = {
      form: elm,
      name: elm.querySelector("[name=name]"),
      phone: elm.querySelector("[name=phone]"),
      successMessage: {
        elm: elm.nextElementSibling,
        btn: elm.nextElementSibling.querySelector("button"),
      },
    };

    this.captchaKey = "6LfuGfMUAAAAACRlKv0QH2jEz3Ei79ac-QYVRa9E";
    this.submitUrl = this.$elm.form.action || "ajax.php";
    this.errorClassName = "has-error";
    this.regName = "^[А-Яа-яA-Za-z]+( [А-Яа-яA-Za-z]+)*$";

    this.init();
  }


  onValidateName() {
    // проверка на количество символов
    const input = this.$elm.name;
    const { value } = input;
    const isValid = value.length > 3;

    if (isValid === false) {
      input.classList.add(this.errorClassName);
    }

    return isValid;
  }

  onValidatePhone() {
    // проверка на заполненность
    const input = this.$elm.phone;
    const isValid = input.inputmask.isComplete();

    if (isValid === false) {
      input.classList.add(this.errorClassName);
    }

    return isValid;
  }

  onValidate() {
    return this.onValidateName() && this.onValidatePhone();
  }

  setInputMask() {
    const onKeyDown = (event) => {
      const { target } = event;
      target.classList.remove(this.errorClassName);
    };

    const imName = new Inputmask({
      regex: this.regName,
      placeholder: "",
      showMaskOnHover: false,
      onKeyDown,
    });
    const imPhone = new Inputmask(
      "+7 (999) 999 99 99", {
        placeholder: "x",
        onKeyDown,
      },
    );

    imName.mask(this.$elm.name);
    imPhone.mask(this.$elm.phone);
  }

  toggleSuccessMessage(shouldShow = false) {
    if (shouldShow) {
      this.$elm.form.classList.add("is-hide");
      this.$elm.successMessage.elm.classList.add("is-show");
    } else {
      this.$elm.form.classList.remove("is-hide");
      this.$elm.successMessage.elm.classList.remove("is-show");
    }
  }

  clearForm() {
    const items = [this.$elm.name, this.$elm.phone];
    items.forEach((item) => {
      item.inputmask.setValue("");
    });
  }

  createFormData() {
    const formData = new FormData();
    const items = [this.$elm.name, this.$elm.phone];

    items.forEach((item) => {
      formData.append(item.name, item.value);
    });

    return formData;
  }

  onSubmit() {
    // TODO: удалить. Только для разработки без бека
    this.toggleSuccessMessage(true);

    if (this.onValidate() === false) {
      console.log("%c Поля заполнены с ошибками", "color: #212121; font-weight: bold; padding: 1em; background: #fa9f0c");
      return false;
    }

    const formData = this.createFormData();

    // проверка значений formData
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    const handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
    };


    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(this.captchaKey, { action: "form" }).then((token) => {
        formData.append("recaptcha_response", token);

        const params = {
          method: "POST",
          body: formData,
        };

        fetch(this.submitUrl, params)
          .then(handleErrors)
          .then(() => {
            this.toggleSuccessMessage(true);
            this.clearForm();
            // console.log("форма отправилась");
            // console.log(res.json());
            // console.log(res.json().status);
          })
          .catch((error) => console.error("Форма не отправилась", error));
      });
    });


    return true;
  }

  init() {
    this.setInputMask();

    // удаляем пробелы по краям
    this.$elm.name.addEventListener("change", (e) => {
      const { target } = e;
      const { value } = target;
      const valueTrim = value.trim();

      target.inputmask.setValue(valueTrim);
    });

    // показываем форму
    this.$elm.successMessage.btn.addEventListener("click", () => this.toggleSuccessMessage(false));

    // отправка формы
    this.$elm.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }
}

export default Form;
