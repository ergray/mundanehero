var Begin = Backbone.View.extend({

	initialize: function(opts){
		el: opts.el
		this.render();
	},

	render: function(){
		$("#initial").append(
			"<div id='welcome'>"+
			"<span>Welcome!</span><br>"+
			"<span>Please click start when ready.</span></div>"
		);
		$("#initial").append(
			"<div id='start'>"+
			"<button id='buttonBegin'>Start!</button>"+
			"</div>"
			);
		startButton = new StartButton({ el: $('#start')});
	}

})

var StartButton = Backbone.View.extend({
	
	events: {
		"click #buttonBegin": "register"
	},

	initialize: function(opts){
		el: opts.el
	},

	register: function(){
		var heroName = new HeroName;
	}
})

var HeroName = Backbone.View.extend({

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
		$("#initial span:nth-child(3)").hide();
		catchName = new CatchName({el: $('#nameSpace')})
	}	
})

var CatchName = Backbone.View.extend({

	events: {
		"submit": "makeProfile"
	},

	initialize: function(){
	},

	makeProfile: function(e){
		e.preventDefault();
		console.log('making profiles');
		// startProfile();
		var questions = new Questions($("#myName").val())
	}
})

var Questions = Backbone.View.extend({

	
	initialize: function(options){
		this.questionCount = 0;
		this.answers = [];
		var ourName = options;
		$("#nameSpace").remove();
		$("#initial span:nth-child(3)").show();
		$("#initial").append(
			"<div id='a1Container'>"+
			"<button class='answers' id='answer1'>Male</button>"+
			"</div>"
			);
		$("#initial").append(
			"<div id='a2Container'>"+
			"<button class='answers' id='answer2'>Female</button>"+
			"</div>"
			);
		$("#initial span:nth-child(1)").text("Question for you, " +ourName+ ".");
		$("#initial span:nth-child(3)").text("Are you male or female?");
		var questionButtons = new QuestionButtons({el: $('#initial')}, ourName)
	}
})

var QuestionButtons = Backbone.View.extend({



	initialize: function(options){
		this.ourName = arguments[1];
		this.answers = [];
		this.questionCount = 1;
		this.listOfQuestions = [
			[{Question : "Are you male or female?"},{AnswerOne : "Male"},{AnswerTwo : "Female" }],
			[{Question : "A speeding bus is coming at you! Do you:"},{AnswerOne : "Stand still and take it!"},{AnswerTwo : "Dodge out of the way!" }],
			[{Question : "Your office is calling!"},{AnswerOne : "Pick up the phone..."},{AnswerTwo : "I have bigger concerns!" }],
			[{Question : "Are you straight or gay?"},{AnswerOne : "Straight"},{AnswerTwo : "Gay" }],
			[{Question : "Are we alone?"},{AnswerOne : "It\'s a cold, silent universe."},{AnswerTwo : "Something is out there, waiting." }],
			[{Question : "The last issue of Super Amazo is sold out everywhere!"},{AnswerOne : "Eh, I\'ll just sprint over to the next state and get one there."},{AnswerTwo : "Who gives a shit about comics?" }]
		];
	},

	events: {
		"click .answers" : "nextPlease"
	},

	nextPlease: function(e){
		e.preventDefault;
		this.answers.push($(e.target)[0].innerHTML);
		if (this.questionCount >= this.listOfQuestions.length){
			var tallyAnswers = new TallyAnswers({el: $('#initial')}, this.answers, this.listOfQuestions, this.ourName);
			return
		};
		// console.log($(e.target)[0].innerHTML);
		$("#initial span:nth-child(3)").text(this.listOfQuestions[this.questionCount][0].Question);
		$('#answer1').text(this.listOfQuestions[this.questionCount][1].AnswerOne);
		$('#answer2').text(this.listOfQuestions[this.questionCount][2].AnswerTwo);
		this.questionCount+=1;
	}
})

var TallyAnswers = Backbone.View.extend({

	events: {
		'click #confirm' : "nextPhase",
		'click #restart' : "beginAgain"
	},

	initialize: function(){
		this.ourName = arguments[3];
		this.answers = arguments[1];
		this.listOfQuestions = arguments[2];
		console.log(this.listOfQuestions);
		$("#initial span:nth-child(1)").text("Thank you, " +this.ourName+ ".");
		$("#initial span:nth-child(3)").text('Can you please verify that the below are correct?');
		$("#a1Container").remove();
		$("#a2Container").remove();
		console.log('hello?');
		$("#initial").append(
			"<div id='checkAnswers'></div>"
			);
		for (i = 0; i<this.listOfQuestions.length; i++){
			$("#checkAnswers").append(
					"<div>Question: "+this.listOfQuestions[i][0].Question+"<br>Answer: "+this.answers[i]+"</div><br>"
				)
		};
		$("#checkAnswers").append(
			"<br>"+
			"<button id='confirm'>Looks Good!</button><button id='restart'>Nah, let me change that</button>"
		)
	},

	beginAgain: function(){
		$("#checkAnswers").remove();
		var questions = new Questions(this.ourName)
	}
})