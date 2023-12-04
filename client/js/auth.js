

const reg_form = document.querySelector("#reg_form");

const reg_email = reg_form.querySelector("#inputEmail");
const reg_username = reg_form.querySelector("#inputUsername");
const reg_password = reg_form.querySelector("#inputPass");

reg_form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:5000/auth/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: reg_email.value,
      username: reg_username.value,
      password: reg_password.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Регистрация прошла успешно
        document.getElementById("regMessage").innerHTML = "Регистрация прошла успешно!";
        document.getElementById("regMessage").classList.add("alert-success");
        document.getElementById("regMessage").classList.remove("alert-danger");
        document.getElementById("regMessage").style.display = "block";
        // Дополнительные действия после успешной регистрации
      } else {
        // Обработка ошибки при регистрации
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
    })
    .catch((error) => {
      // Обработка ошибки при отправке запроса или получении ответа
      document.getElementById("regMessage").innerHTML = "Произошла ошибка при регистрации: " + error.message;
      document.getElementById("regMessage").classList.add("alert-danger");
      document.getElementById("regMessage").classList.remove("alert-success");
      document.getElementById("regMessage").style.display = "block";
    });
});

const log_form = document.querySelector("#log_form");

const log_email = log_form.querySelector("#log_inputEmail");
const log_password = log_form.querySelector("#log_inputPass");

log_form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: log_email.value,
      password: log_password.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Авторизация прошла успешно
        return response.json();
      } else {
        // Обработка ошибки при авторизации
        throw new Error("Произошла ошибка при авторизации.");
      }
    })
    .then((res) => {
      if (typeof res == "string") {
      // Дополнительные действия после успешной авторизации
      localStorage.setItem("jwt", res); // Обновлено: использование свойства 'token'
      location.reload();
      }
    })
    .catch((error) => {
      // Обработка ошибки при авторизации
      document.getElementById("logMessage").textContent = "Неверные почта или пароль";
      document.getElementById("logMessage").classList.remove("alert-success");
      document.getElementById("logMessage").classList.add("alert-danger");
      document.getElementById("logMessage").style.display = "block";
      console.error(error);
    });
});

const log_out = document.getElementById("log_out");

log_out.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  sessionStorage.clear();
  location.reload();
});
