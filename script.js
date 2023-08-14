const BURGER__MENU = document
  .querySelector(".burger__menu")
  .addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".nav__list").classList.toggle("open");
  });

const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const slides = Array.from(slider.querySelectorAll(".reviews__img"));
const slideCount = slides.length;
let slideIndex = 0;
// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}
// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}
// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}
// Инициализация слайдера
updateSlider();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".validate-form");
  form.addEventListener("submit", formSend);

  async function formSend(event) {
    event.preventDefault();
    let errors = formValidate();
    let formData = new FormData(form);
    if (errors === 0) {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const formFields = document.querySelectorAll("._req");
          formFields.forEach((field) => {
            field.value = "";
          });
          console.log("Отправка данных прошла успешно");
        }
      } catch (error) {
        console.log(error);
        alert("У вас ошибка");
      }
    }
  }

  function formValidate() {
    let errors = 0;
    const formFields = document.querySelectorAll("._req");
    for (let i = 0; i < formFields.length; i++) {
      formFields[i].classList.remove("invalid");
      formFields[i].classList.remove("valid");
      if (formFields[i].classList.contains("tel")) {
        if (!telTest(formFields[i])) {
          formFields[i].classList.add("invalid");
          errors++;
        } else {
          formFields[i].classList.add("valid");
        }
      }
      if (formFields[i].classList.contains("name")) {
        if (formFields[i].value !== "") {
          formFields[i].classList.add("valid");
        } else {
          formFields[i].classList.add("invalid");
          errors++;
        }
      }
    }
    return errors;
  }
});

function telTest(input) {
  const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return re.test(input.value);
}
window.addEventListener("scroll", function () {
  let scroll = this.document.querySelector(".upward");
  scroll.classList.toggle("active", this.window.scrollTo > 100);
});
function scrollTopTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
