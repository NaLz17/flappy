var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var scoreImg = new Image();  

function checkUserInfo() {
  const select_skin = sessionStorage.getItem("skin") || 1;
  bird.src = `img/bird${select_skin}.png`;
  bird.onload = function () {
    start();
  };
}

if (sessionStorage.getItem("userinfo")) {
  // Если информация о пользователе уже есть в sessionStorage
  checkUserInfo();
} else {
  // Если информация о пользователе ещё не получена
  getInfo().then(() => {
    checkUserInfo();
  });
}

bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
scoreImg.src = "img/score.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 130;

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: -80,
};

var score = 0;

var xPos = 200;
var yPos = 260;
var grav = 2.75;

var jumpHeight = 100; // Высота прыжка
var jumpSpeed = 4; // Скорость прыжка

function moveUp() {
  var jumpCount = 0;
  var jumpInterval = setInterval(function() {
    jumpCount++;
    yPos -= jumpSpeed;
    if (jumpCount >= jumpHeight / jumpSpeed) {
      clearInterval(jumpInterval);
    }
  }, 10);
  if (sessionStorage.getItem("volume") != "false") fly.play();
}

function gameOver(score) {
  ctx.drawImage(scoreImg, 154, 206);
  ctx.shadowOffSetX = 4;
  ctx.shadowOffSetY = 4;
  ctx.shadowBlur = 4;
  ctx.shadowColor = "#fff";
  ctx.font = "35px Verdana";
  ctx.fillText(score, score > 9 ? 220 : 230, 300);
  ctx.font = "24px Verdana";
  ctx.fillText("Нажмите в любое место,", 100, 160);
  ctx.fillText("чтобы начать заново..", 115, 180);
  document.removeEventListener("keydown", moveUp);
  cvs.addEventListener("click", () => {
    window.location.reload();
  });
  let record = JSON.parse(sessionStorage.getItem("userinfo")).score;
  ctx.font = "35px Verdana";
  if (score > record) {
    record = score;
    fetch("http://localhost:5000/auth/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `BEARER ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        score: record,
        username: JSON.parse(sessionStorage.getItem("userinfo")).username,
      }),
    });
  }
  ctx.fillText(record, record > 9 ? 220 : 230, 390);
}

function draw() {
  cvs.removeEventListener("click", draw);
  document.addEventListener("keydown", moveUp);

  ctx.drawImage(bg, 0, 0, 480, 640);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x -= 2;

    if (pipe[i].x == 274) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      ctx.drawImage(fg, 0, cvs.height - fg.height, 480, 200);
      ctx.drawImage(bird, xPos, yPos, 50, 35);
      gameOver(score);
      return;
    }

    if (pipe[i].x == 158) {
      score++;
      if (sessionStorage.getItem("volume") != "false") score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height, 480, 200);
  ctx.drawImage(bird, xPos, yPos, 50, 35);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

function start() {
  ctx.drawImage(bg, 0, 0, 480, 640);
  ctx.drawImage(fg, 0, cvs.height - fg.height, 480, 200);
  ctx.drawImage(bird, xPos, yPos, 50, 35);
  ctx.shadowOffSetX = 4;
  ctx.shadowOffSetY = 4;
  ctx.shadowBlur = 4;
  ctx.shadowColor = "#fff";
  ctx.font = "24px Verdana";
  ctx.fillText("Нажмите в любое место,", 80, 160);
  ctx.fillText("чтобы начать игру..", 115, 180);
  cvs.addEventListener("click", draw);
}

 pipeBottom.onload = start;
