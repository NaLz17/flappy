
if (sessionStorage.getItem("admin_lvl") == 2) {
    const admin_manag = Array.from(document.querySelectorAll(".admin_manag"));
    admin_manag.forEach((elem) => {
        elem.style.display = window.getComputedStyle(document.getElementById('deleteUserDiv')).getPropertyValue('display');}) 
}

// Обработчик события для удаления пользователя
document.getElementById("deleteUserBtn").addEventListener("click", (e) => {
  e.preventDefault();

  var email = document.getElementById("deleteUserEmail").value;
  fetch("http://localhost:5000/auth/delete-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `BEARER ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Удаление пользователя прошло успешно
        document.getElementById("deleteUserMessage").innerHTML = "Пользователь успешно удален!";
        document.getElementById("deleteUserMessage").classList.add("alert-success");
        document.getElementById("deleteUserMessage").classList.remove("alert-danger");
        document.getElementById("deleteUserMessage").style.display = "block";
        // Дополнительные действия после успешного удаления пользователя
      } else {
        // Обработка ошибки при удалении пользователя
        return response.json().then((error) => {
          throw new Error(error.error);
        });
      }
    })
    .catch((error) => {
      // Обработка ошибки при отправке запроса или получении ответа
      document.getElementById("deleteUserMessage").innerHTML = "Произошла ошибка при удалении пользователя: " + error.message;
      document.getElementById("deleteUserMessage").classList.add("alert-danger");
      document.getElementById("deleteUserMessage").classList.remove("alert-success");
      document.getElementById("deleteUserMessage").style.display = "block";
    });
});

  
  // Обработчик события для добавления администратора
  document.getElementById("addAdminBtn").addEventListener("click", function() {
    var email = document.getElementById("addAdminEmail").value;
    fetch("http://localhost:5000/auth/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        authorization: `BEARER ${localStorage.getItem("jwt")}` 
        },
        body: JSON.stringify({
        email: email
        }),
    })
      .then((response) => {
        if (response.ok) {
          // Добавление администратора прошло успешно
          document.getElementById("addAdminMessage").innerHTML = "Администратор успешно добавлен!";
          document.getElementById("addAdminMessage").classList.add("alert-success");
          document.getElementById("addAdminMessage").classList.remove("alert-danger");
          document.getElementById("addAdminMessage").style.display = "block";
          // Дополнительные действия после успешного добавления администратора
        } else {
          // Обработка ошибки при добавлении администратора
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .catch((error) => {
        // Обработка ошибки при отправке запроса или получении ответа
        document.getElementById("addAdminMessage").innerHTML = "Произошла ошибка при добавлении администратора: " + error.message;
        document.getElementById("addAdminMessage").classList.add("alert-danger");
        document.getElementById("addAdminMessage").classList.remove("alert-success");
        document.getElementById("addAdminMessage").style.display = "block";
      });
  });
  
  // Обработчик события для удаления администратора
  document.getElementById("deleteAdminBtn").addEventListener("click", function() {
    var email = document.getElementById("deleteAdminEmail").value;
    fetch("http://localhost:5000/auth/delete-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        authorization: `BEARER ${localStorage.getItem("jwt")}` 
        },
        body: JSON.stringify({
        email: email
        }),
    })
      .then((response) => {
        if (response.ok) {
          // Удаление администратора прошло успешно
          document.getElementById("deleteAdminMessage").innerHTML = "Администратор успешно удален!";
          document.getElementById("deleteAdminMessage").classList.add("alert-success");
          document.getElementById("deleteAdminMessage").classList.remove("alert-danger");
          document.getElementById("deleteAdminMessage").style.display = "block";
          // Дополнительные действия после успешного удаления администратора
        } else {
          // Обработка ошибки при удалении администратора
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .catch((error) => {
        // Обработка ошибки при отправке запроса или получении ответа
        document.getElementById("deleteAdminMessage").innerHTML = "Произошла ошибка при удалении администратора: " + error.message;
        document.getElementById("deleteAdminMessage").classList.add("alert-danger");
        document.getElementById("deleteAdminMessage").classList.remove("alert-success");
        document.getElementById("deleteAdminMessage").style.display = "block";
      });
  });
  