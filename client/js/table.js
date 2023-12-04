let td_user = [];
for (i = 1; i < 6; i++) {
  td_user.push(document.getElementById("user" + i));
}
let td_score = [];
for (i = 1; i < 6; i++) {
  td_score.push(document.getElementById("score" + i));
}

async function getLeaders() {
  let response = await fetch("http://localhost:5000/auth/leaders");
  if (response.ok) {
    const json = await response.json();
    console.log(json);
    for (i = 0; i < 5; i++) {
      td_user[i].innerHTML = json[i].username;
      td_score[i].innerHTML = json[i].score;
    }
  } else {
    alert("Ошибка HTTP: " + response.status);
    return response.status;
  }
}

getLeaders();
