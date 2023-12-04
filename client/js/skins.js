const skins = document.querySelector(".skins");
const imgs = Array.from(skins.querySelectorAll("img"));

imgs[sessionStorage.getItem("skin") - 1].classList.add("selected");

imgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    imgs.forEach((img) => {
      img.classList.remove("selected");
    });
    sessionStorage.removeItem("skin");
    sessionStorage.setItem("skin", index + 1);
    fetch("http://localhost:5000/auth/updateskin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `BEARER ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      skin: index+1,
      username: JSON.parse(sessionStorage.getItem("userinfo")).username,
    }),
  });
    img.classList.add("selected");
  });
});