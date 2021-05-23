document.getElementById("logInButton").addEventListener("mouseover", function () {
  document.getElementById("name").style.display = "none";

});

document.getElementById("logInButton").addEventListener("click", function () {
	var playerEmail = document.getElementById("email").value;
	var playerPassword = document.getElementById("password").value;

	let checkAt=false;
	for (let i=0;i<playerEmail.length;i++) {
		if (playerEmail[i]=="@") {checkAt=true;break;}
	}
	

	if (checkAt&&playerPassword.length>5) {

	
	gameAuth.signInWithEmailAndPassword(playerEmail, playerPassword).then(cons=>{
		console.log(cons.user);
			document.getElementById("signUp").style.display="none";
			document.querySelector("canvas").style.display="block";
			document.getElementById("scoreBorde").style.display="block";

				  gamePage = true;


	});
	
}else{alert("Wrong Email or Password")}});

document.querySelector("img").addEventListener("mouseover", function () {
  document.getElementById("name").style.display = "block";
});

document.getElementById("signUpButton").addEventListener("click", function () {
	var playerName=document.getElementById("name").value;
	var playerEmail = document.getElementById("email").value;
	var playerPassword = document.getElementById("password").value;

	let checkAt=false;
	for (let i=0;i<playerEmail.length;i++) {
		if (playerEmail[i]=="@") {checkAt=true;break;}
	}
	

	if (checkAt&&playerPassword.length>5&&playerName!="") {

	
	gameAuth.createUserWithEmailAndPassword(playerEmail, playerPassword).then(cons=>{
		console.log(cons.user);
			document.getElementById("signUp").style.display="none";
			document.querySelector("canvas").style.display="block";
			document.getElementById("scoreBorde").style.display="block";

				  gamePage = true;


	});
	
	
} else {
	alert("Wrong email, weak password or empty player name");
}

});



