async function getInfo() {
  let response = await fetch("http://localhost:5000/auth/check", {
    headers: { authorization: `BEARER ${localStorage.getItem("jwt")}` },
  });
  if (response.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа
    const json = await response.json();
    const obj = { username: json.username, score: json.score };
    sessionStorage.setItem("userinfo", JSON.stringify(obj));
    sessionStorage.setItem("volume", JSON.stringify(json.sound));
    sessionStorage.setItem("skin", JSON.stringify(json.skin));
    sessionStorage.setItem("admin_lvl", JSON.stringify(json.adminlvl));
    const adminLink = document.getElementById('admin_link');
    if (sessionStorage.getItem("admin_lvl") == 1 || sessionStorage.getItem("admin_lvl") == 2 ) {
      adminLink.style.display = 'inline-block';
    } else {
      adminLink.style.display = 'none';
    }
    const usernameElem = document.getElementById('username');
    const userInfo = JSON.parse(sessionStorage.getItem("userinfo"));
    usernameElem.textContent = userInfo.username;

  } else {
    const usernameSpan = document.getElementById('username-span');
    usernameSpan.style.display = 'none';
  }
}
getInfo();
