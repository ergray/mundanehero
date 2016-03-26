var Welcome = Backbone.Model.extend({

	initialize: function(){
		$("#initial").append(
			"<div id='welcome'>"+
				"<span>Welcome!</span><br>"+
				"<span>Please click start when ready.</span></div>"
			)
	}
})

var Start = Backbone.Model.extend({

	initialize: function(){
		$("#initial").append(
			"<div id='start'>"+
			"<button id='buttonBegin'>Start!</button>"+
			"</div>"
			);
		startButton = new StartButton({ el: $('#start')});
	}
})

var HeroName = Backbone.Model.extend({

	initialize: function(){
		$("#start").remove();
		$("#initial").append(
			"<div id='nameSpace'>"+
			"<form>"+
			"Please state your name: <input type='text' id='myName'><br>"+
			"<input type='submit' id='giveName' value='Thats Me'>"+
			"</form>"+
			"</div>"
			);
		$("#initial span:nth-child(1)").text("Who are you?");
		$("#initial span:nth-child(3)").remove();
		catchName = new CatchName({el: $('#nameSpace')})
	}	
})

var Questions = Backbone.Model.extend({

	
	initialize: function(options){
		questionCount=0;
		listOfQuestions = [
			[{Question : "Are you male or female?"},{AnswerOne : "Male"},{AnswerTwo : "Female" }],
			[{Question : "A speeding b us is coming at you! Do you:"},{AnswerOne : "Stand still and take it!"},{AnswerTwo : "Dodge out of the way!" }],
			[{Question : "Your office is calling!"},{AnswerOne : "Pick up the phone..."},{AnswerTwo : "I have bigger concerns!" }],
			[{Question : "Are you straight or gay?"},{AnswerOne : "Straight"},{AnswerTwo : "Gay" }],
			[{Question : "Are we alone?"},{AnswerOne : "Its a cold, silent universe."},{AnswerTwo : "Something is out there, waiting." }],
			[{Question : "The last issue of Super Amazo is sold out everywhere!"},{AnswerOne : "Eh, Ill just sprint over to the next state and get one there."},{AnswerTwo : "Who gives a shit about comics?" }]
		];
		$("#nameSpace").remove();
		$("#initial").append(
			"<div id='a1Container'>"+
			"<button class='answers' id='answer1'>"+listOfQuestions[questionCount][1].AnswerOne+"</button>"+
			"</div>"
			);
		$("#initial").append(
			"<div id='a2Container'>"+
			"<button class='answers' id='answer2'>"+listOfQuestions[questionCount][2].AnswerTwo+"</button>"+
			"</div>"
			);
		$("#initial span:nth-child(1)").text("Question for you, " +options+ ".");
		$("#initial span:nth-child(3)").remove();
		var questionButtons = new QuestionButtons({el: $('#initial'), model: this})//, listOfQuestions, questionCount)			
	}
})