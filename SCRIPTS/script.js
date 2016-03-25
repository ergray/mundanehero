$(document).ready(function(){
	welcome = new Welcome;
	start = new Start;
	// startButton = new StartButton
	startProfile = function(){
		console.log('starting profile');	
		characterName = [{'Name' : $("#myName").val() }];
		// characterName = {'Name' : 'hi' };
	}
})