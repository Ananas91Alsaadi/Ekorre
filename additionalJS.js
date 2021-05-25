var scoreBoardGame = [];
var userIDgame, userNamegame;
var playerNameGame,preScore;
document.getElementById("logInButton").addEventListener("mouseover", function () {
  document.getElementById("name").style.display = "none";

});

document.getElementById("logInButton").addEventListener("click", function () {
  var playerEmail = document.getElementById("email").value;
  var playerPassword = document.getElementById("password").value;

  let checkAt = false;
  for (let i = 0; i < playerEmail.length; i++) {
    if (playerEmail[i] == "@") {
      checkAt = true;
      break;
    }
  }


  if (checkAt && playerPassword.length > 5) {

    gameAuth.signInWithEmailAndPassword(playerEmail, playerPassword).then(cons => {

      userIDgame = cons.user.uid;
      gameDb.collection("scoreBoard").doc(cons.user.uid).get().then((doc) => {
        playerNameGame = doc.data().name;
        document.getElementById("playerScore").innerHTML = doc.data().name + " | " + doc.data().score;


      });


      gameDb.collection("scoreBoard").get().then((snapShot) => {
        scoreBoardGame = [];
        console.log(gameDb.collection("scoreBoard").doc(userIDgame));
        snapShot.docs.forEach(doc => {
          scoreBoardGame.push(doc.data());
          console.log(scoreBoardGame);
        });
        writeSB();

      });

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

      document.getElementById("signUp").style.display = "none";
      document.querySelector("canvas").style.display = "block";
      document.getElementById("scoreBorde").style.display = "block";
      gamePage = true;

      alert("You are in a tree, jump up the branches to get to the top! To move, use the arrow keys on your computer or touch left and right on your smartphone. \nTry to collect as much coins as possible to get a higher score than your friends! \nAvoid eating rotten food, every time you eat one, you loose a heart for a maximum of 3 times.");


    });

  } else {
    alert("Wrong Email or Password")
  }


});

document.querySelector("img").addEventListener("mouseover", function () {
  document.getElementById("name").style.display = "block";
});

document.getElementById("signUpButton").addEventListener("click", function () {
  var playerName = document.getElementById("name").value;
  var playerEmail = document.getElementById("email").value;
  var playerPassword = document.getElementById("password").value;
  playerNameInGame = playerName;
  let checkAt = false;
  for (let i = 0; i < playerEmail.length; i++) {
    if (playerEmail[i] == "@") {
      checkAt = true;
      break;
    }
  }


  if (checkAt && playerPassword.length > 5 && playerName != "") {


    gameAuth.createUserWithEmailAndPassword(playerEmail, playerPassword).then(cons => {
      userIDgame = cons.user.uid;
      gameDb.collection("scoreBoard").doc(cons.user.uid).set({
        name: playerName,
        score: "0"
      }).then(() => {

        gameDb.collection("scoreBoard").doc(cons.user.uid).get().then((doc) => {
          playerNameGame = doc.data().name;
preScore=doc.data().score;
          document.getElementById("playerScore").innerHTML = doc.data().name + " | " + doc.data().score;

        });


      });


      userIDgame = cons.user.uid;

      gameDb.collection("scoreBoard").get().then((snapShot) => {
        scoreBoardGame = [];

        snapShot.docs.forEach(doc => {
          scoreBoardGame.push(doc.data());
          console.log(scoreBoardGame);
        });
        writeSB();

      });


      console.log(cons.user);
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
      document.getElementById("password").value = "";

      document.getElementById("signUp").style.display = "none";
      document.querySelector("canvas").style.display = "block";
      document.getElementById("scoreBorde").style.display = "block";
      gamePage = true;

      alert("You are in a tree, jump up the branches to get to the top! To move, use the arrow keys on your computer or touch left and right on your smartphone. \nTry to collect as much coins as possible to get a higher score than your friends! \nAvoid eating rotten food, every time you eat one, you loose a heart for a maximum of 3 times.");

    });

  } else {
    alert("Wrong email, weak password or empty player name");
  }

});

function writeSB() {
  scoreBoardGame = scoreBoardGame.sort(function compareNumbers(a, b) {
    return b.score - a.score;
  });
  let e = 0;
  if (scoreBoardGame.length < 5) {
    e = scoreBoardGame.length
  } else {
    e = 5
  }
  for (let i = 0; i < e; i++) {
    document.querySelectorAll(".topTen")[i].innerHTML = scoreBoardGame[i].name + " | " + scoreBoardGame[i].score;
  }

  console.log(scoreBoardGame)
}
