const handleClick = (event) => {
  event.preventDefault();
  alert(
    "Чтобы открыть эту функцию, пожалуйста, войдите в аккаунт или зарегестрируйтесь"
  );
};

const nav_links = Array.from(document.querySelectorAll(".link_off"));


nav_links.forEach((link) => {
  if (link.classList.contains("link_inActive")) {
    link.addEventListener("click", handleClick);
  } else {
    link.removeEventListener("click", handleClick);
  }
});

const logoutButton = document.getElementById('log_out');
const loginButton = document.getElementById('log_in');
const regButton = document.getElementById('reg');


if (localStorage.getItem("jwt")) {
  nav_links.forEach((link) => {
    link.classList.remove("link_inActive");
    link.removeEventListener("click", handleClick);
  });
  logoutButton.style.display = 'inline-block';
  loginButton.style.display = 'none';
  regButton.style.display = 'none';
} else {
  logoutButton.style.display = 'none';

}
