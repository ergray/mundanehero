var Begin = Backbone.View.extend({

	initialize: function(opts){
		el: opts.el
		this.render();
	},

	render: function(){
		$("#initial").append(
			"<div id='welcome'>"+
			"<h1 id='header'>Welcome!</h1>"+
			"<p id='subheader'>Please click start when ready.</p></div>"
		);
		$("#initial").append(
			"<div id='start'>"+
			"<button class='button' id='buttonBegin'>Start!</button>"+
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
			"<p>Please state your name: <input type='text' id='myName' required></p>"+
			"<input class='button' type='submit' id='giveName' value='That&#39;s Me'>"+
			"</form>"+
			"</div>"
			);
		$("#initial #header").text("Who are you?");
		$("#initial #subheader").hide();
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
		var questions = new Questions({name: $("#myName").val()})
	}
})

var Questions = Backbone.View.extend({


	initialize: function(options){
		this.options = options;
		this.ourName = options.name;
		this.render(options.name);
	},

	render: function(name){
		this.questionCount = 1;
		this.answers = [];
		$("#nameSpace").remove();
		$("#initial #subheader").show();
		$("#initial").append(
			"<div id='answersContainer'>"+
			"<div id='a1Container'>"+
			"<div class='answers'><p id='answer1'>Male</p></div>"+
			"</div>"+
			"<div id='a2Container'>"+
			"<div class='answers'><p id='answer2'>Female</p></div>"+
			"</div>"+
			"</div>"
			);
		$("#initial #header").text("Question for you, " +name+ ".");
		$("#initial #subheader").text("Are you male or female?");
		var questionButtons = new QuestionButtons({el: $('#initial'), name: name, answers: this.answers, questionCount: this.questionCount})
	}
})

var QuestionButtons = Backbone.View.extend({



	initialize: function(options){
		this.options = options;
		this.ourName = options.name;
		this.answers = options.answers;
		this.questionCount = options.questionCount;
		this.listOfQuestions = [
			[{Question : "Are you male or female?"},{AnswerOne : "Male"},{AnswerTwo : "Female" }],
			[{Question : "A speeding bus is coming at you! Do you:"},{AnswerOne : "Stand still and take it!"},{AnswerTwo : "Dodge out of the way!" }],
			[{Question : "Your office is calling!"},{AnswerOne : "Pick up the phone..."},{AnswerTwo : "I have bigger concerns!" }],
			[{Question : "Are you straight or gay?"},{AnswerOne : "Straight"},{AnswerTwo : "Gay" }],
			[{Question : "Are we alone?"},{AnswerOne : "It\'s a cold, silent universe."},{AnswerTwo : "Something is out there, waiting." }],
			[{Question : "The last issue of Super Amazo is sold out everywhere!"},{AnswerOne : "Eh, I\'ll just sprint over to the next state and get one there."},{AnswerTwo : "Who gives a shit about comics?" }]
		];
	},

	render: function(){

	},

	events: {
		"click .answers" : "nextPlease"
	},

	nextPlease: function(e){
		e.preventDefault;
		this.answers.push($(e.target)[0].innerHTML);
		if (this.questionCount >= this.listOfQuestions.length){
			this.questionCount = 1;
			var tallyAnswers = new TallyAnswers({el: $('#initial'), answers: this.answers, listOfQuestions: this.listOfQuestions, ourName: this.ourName});
			this.undelegateEvents();
			return
		};
		// console.log($(e.target)[0].innerHTML);
		$("#initial #subheader").text(this.listOfQuestions[this.questionCount][0].Question);
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

	initialize: function(options){
		this.ourName = options.ourName;
		this.answers = options.answers;
		this.listOfQuestions = options.listOfQuestions;
		$("#initial #header").text("Thank you, " +this.ourName+ ".");
		$("#initial #subheader").text('Can you please verify that the below are correct?');
		$("#answersContainer").remove();
		this.render();
	},

	render: function(){
		$("#initial").append(
			"<div id='checkAnswers'></div>"
			);
		for (i = 0; i<this.listOfQuestions.length; i++){
			$("#checkAnswers").append(
					"<div class='question'>"+
					"<p><span class='bold'>Question:</span> "+this.listOfQuestions[i][0].Question+"</p>"+
					"<p><span class='bold'>Answer:</span> "+this.answers[i]+"</p>"+
					"</div>"
			)
		};
		$("#checkAnswers").append(
			"<br>"+
			"<button class='button' id='confirm'>Looks Good!</button><button class='button' id='restart'>Nah, let me change that</button>"
		)		
	},

	beginAgain: function(){
		this.answers.splice(0, this.answers.length);
		$("#checkAnswers").remove();
		var questions = new Questions({name: this.ourName});
		this.undelegateEvents();
	}
})
