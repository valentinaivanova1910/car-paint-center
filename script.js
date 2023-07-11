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
