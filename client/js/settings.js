const sound_radio = Array.from(document.querySelectorAll(".sound"));

if (!sessionStorage.getItem("volume")) {
  sessionStorage.setItem("volume", "true");
  sound_radio[0].checked = true;
} else {
  if (sessionStorage.getItem("volume") === "true") {
    sound_radio[0].checked = true;
  } else {
    sound_radio[1].checked = true;
  }
}

sound_radio[0].addEventListener("click", () => {
  sessionStorage.setItem("volume", "true");
  fetch("http://localhost:5000/auth/updatesound", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `BEARER ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      sound: true,
      username: JSON.parse(sessionStorage.getItem("userinfo")).username,
    }),
  });
});

sound_radio[1].addEventListener("click", () => {
  sessionStorage.setItem("volume", "false");
  fetch("http://localhost:5000/auth/updatesound", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `BEARER ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        sound: false,
        username: JSON.parse(sessionStorage.getItem("userinfo")).username,
      }),
    });
});

const form = document.querySelector(".change_pass");
const newPass = form.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("http://localhost:5000/auth/updatePass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `BEARER ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      newPass: newPass.value,
    }),
  });
});
