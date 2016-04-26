$(document).ready(function(){
	var begin = new app.Begin({el: $('#intial')})
	// var playerList = new app.PlayerList();
	// console.log(playerList);
	var chooseChoices = new app.ChooseChoices();
	chooseChoices.fetch();
	console.log(app.ChooseChoices);
	console.log(chooseChoices);
})