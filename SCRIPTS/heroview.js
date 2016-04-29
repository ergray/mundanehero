 var app = {};

app.Begin = Backbone.View.extend({

	initialize: function(opts){
		el = opts.el;
		this.collection = new app.PlayerList();
		console.log(this.collection.model);
		// console.log(app.playerList.model);
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
		startButton = new app.StartButton({ el: $('#start'), collection: this.collection});
	}

})

app.StartButton = Backbone.View.extend({

	events: {
		"click #buttonBegin": "register"
	},

	initialize: function(opts){
		this.collection = opts.collection;
		el = opts.el
	},

	register: function(){
		var heroName = new app.HeroName({collection: this.collection});
	}
})

app.HeroName = Backbone.View.extend({

	initialize: function(opts){
		this.collection = opts.collection;
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
		catchName = new app.CatchName({el: $('#nameSpace'), collection: this.collection})
	}
})

app.CatchName = Backbone.View.extend({

	events: {
		"submit": "makeProfile"
	},

	initialize: function(opts){
		this.collection = opts.collection;
	},

	makeProfile: function(e){
		e.preventDefault();
		var questions = new app.Questions({name: $("#myName").val(), collection: this.collection})
	}
})

app.Questions = Backbone.View.extend({


	initialize: function(options){
		this.options = options;
		this.collection = options.collection;
		this.ourName = options.name;
		this.render(options.name);
	},

	render: function(name){
		this.questionCount = 0;
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
		var questionButtons = new app.QuestionButtons({el: $('#initial'), name: name, answers: this.answers, questionCount: this.questionCount, collection: this.collection})
	}
})

app.QuestionButtons = Backbone.View.extend({



	initialize: function(options){
		this.stats = [];
		this.options = options;
		this.collection = options.collection;
		this.ourName = options.name;
		this.answers = options.answers;
		this.questionCount = options.questionCount;
		this.listOfQuestions = [
			[{Question : "Are you male or female?"},{AnswerOne : ["Male", "public_opinion", 1]},{AnswerTwo : ["Female", "public_opinion", 0]}],
			[{Question : "A speeding bus is coming at you! Do you:"},{AnswerOne : ["Stand still and take it!", "power", 1]},{AnswerTwo : ["Dodge out of the way!", "power", 1]}],
			[{Question : "Your office is calling!"},{AnswerOne : ["Pick up the phone...", "sanity", -1]},{AnswerTwo : ["I have bigger concerns!", "responsibility", 1]}],
			[{Question : "Are you straight or gay?"},{AnswerOne : ["Straight", "public_opinion", 1]},{AnswerTwo : ["Gay", "public_opinion", 0]}],
			[{Question : "Are we alone?"},{AnswerOne : ["It\'s a cold, silent universe.", "spirituality", -1]},{AnswerTwo : ["Something is out there, waiting.", "intellect", 1]}],
			[{Question : "The last issue of Super Amazo is sold out everywhere!"},{AnswerOne : ["Eh, I\'ll just sprint over to the next state and get one there.", "responsibility", -1]},{AnswerTwo : ["Who gives a shit about comics?", "wealth", 1]}]
		]

	},

	render: function(){

	},

	events: {
		"click #answer1" : "nextPlease",
		"click #answer2" : "nextPlease"
	},

	nextPlease: function(e){
		if (e.target.id == "answer1"){
			this.answers.push(this.listOfQuestions[this.questionCount][1].AnswerOne);
		} else {
			this.answers.push(this.listOfQuestions[this.questionCount][2].AnswerTwo);
		}
		this.questionCount+=1;
		if (this.questionCount > this.listOfQuestions.length-1){
			this.questionCount = 0;
			var tallyAnswers = new app.TallyAnswers({el: $('#initial'), answers: this.answers, listOfQuestions: this.listOfQuestions, ourName: this.ourName, collection: this.collection});
			this.undelegateEvents();
			return
		};
		$("#initial #subheader").text(this.listOfQuestions[this.questionCount][0].Question);
		$('#answer1').text(this.listOfQuestions[this.questionCount][1].AnswerOne[0]);
		$('#answer2').text(this.listOfQuestions[this.questionCount][2].AnswerTwo[0]);
	}

})

app.TallyAnswers = Backbone.View.extend({

	events: {
		'click #confirm' : "nextPhase",
		'click #restart' : "beginAgain",
		'click #yesName' : "rightNameGo",
		'click #noName' : "wrongNameGo",
		'submit' : "newNameGranted"
	},

	initialize: function(options){
		this.collection = options.collection;
		console.log(this.collection);
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
					"<p><span class='bold'>Answer:</span> "+this.answers[i][0]+"</p>"+
					"</div>"
			)
		};
		$("#checkAnswers").append(
			"<br>"+
			"<button class='button' id='confirm'>Looks Good!</button><button class='button' id='restart'>Nah, let me change that</button>"
		)
	},

	beginAgain: function(){
		$("#checkAnswers").hide();
		$("#initial").append(
			"<div id='nameRightContainer'>"+
				'<p>OK, let\'s change this up then. Is ' +this.ourName+ ' the right name?</p><br>'+
				"<button id='yesName'>Yep!</button><button id='noName'>Nope!</button>"+
			"</div>"
			);
	},

	rightNameGo: function(){
		this.answers.splice(0, this.answers.length);
		$("#checkAnswers").remove();
		$("#nameRightContainer").remove();
		var questions = new app.Questions({name: this.ourName, collection: this.collection});
		this.undelegateEvents();
	},

	wrongNameGo: function(){
		$("#nameRightContainer").remove();
		$("#initial").append(
			"<div id='correctYourNameContainer'>"+
				"<form>"+
					"<p>Please state your name: <input type='text' id='newName' required></p>"+
					"<input class='button' type='submit' id='giveName' value='That&#39;s Me'>"+
				"</form>"+
			"</div>"
			)
	},

	newNameGranted: function(e){
		e.preventDefault();
		this.answers.splice(0, this.answers.length);
		$("#checkAnswers").remove();
		var questions = new app.Questions({name: $("#newName").val(), collection: this.collection});
		$("#correctYourNameContainer").remove();
		this.undelegateEvents();
	},

	nextPhase: function(){
		var newGuy = new app.Player({name: this.ourName});
		this.collection.add(newGuy);
		for (i=0;i<this.answers.length;i++){
			var standIn = newGuy.get(this.answers[i][1])
			newGuy.set(this.answers[i][1], (standIn += (this.answers[i][2])))
		}
		console.log(this.collection);
		console.log(this.collection.where({name: this.ourName}))
		var startGame = new app.StartGame({el: $("#initial"), character: newGuy.get("name"), collection: this.collection})
	}


})

app.StartGame = Backbone.View.extend({

	events: {
		"click #answer1" : "nextPlease",
		"click #answer2" : "nextPlease",
		"click #startOver" : "newGame"
	},


 	initialize: function(options){
 		console.log(options);
 		$("#initial div:nth-child(2)").remove();
 		this.character = options.character;
 		// this.collection = options.collection;
		this.collection = new app.ChooseChoices();
		this.collection.fetch({
			success: this.onSuccess,
			error: this.onError
		});
		this.placeholder = 0;
		console.log(this.collection);
 		console.log(this.character);
 	},

	onSuccess: function(collection, response, options){
		console.log(collection.at(0).get("question"));
		$("#welcome").text(
			collection.at(0).get("question")
			);
		$("#initial").append(
			"<div id='answersContainer'>"+
			"<div id='a1Container'>"+
			"<div class='answers'><p id='answer1'>"+collection.at(0).get("choice1")[0]+"</p></div>"+
			"</div>"+
			"<div id='a2Container'>"+
			"<div class='answers'><p id='answer2'>"+collection.at(0).get("choice2")[0]+"</p></div>"+
			"</div>"+
			"</div>"
			);
		},

	onError: function(collection, response, options){
			console.log("I failed.");
			console.log(response);
		},


	nextPlease: function(e){
		console.log(this.collection.at(this.placeholder).get("ending"));
		if (e.target.id == "answer1"){
			if (this.collection.at(this.collection.at(this.placeholder).get("choice1")[1]).get("ending") != null){
				console.log('success');
			$("#welcome").text(
				this.collection.at(this.collection.at(this.placeholder).get("choice1")[1]).get("ending")
				);
			$("#a1Container").remove();
			$("#a2Container").remove();
			$("#initial").append(
				"<div id='startOver'>"+
				"<p>"+this.collection.at(this.collection.at(this.placeholder).get("choice1")[1]).get("startOver")+"</p>"+
				"</div>"
				); 	
				return;			
 			}
			$("#welcome").text(
				this.collection.at(this.collection.at(this.placeholder).get("choice1")[1]).get("question")
				);
			var newPlace = this.collection.at(this.placeholder).get("choice1")[1];
			$("#answer1").text(
				this.collection.at(newPlace).get("choice1")[0]
				);
			$("#answer2").text(
				this.collection.at(newPlace).get("choice2")[0]
				);
			this.placeholder = newPlace;
			return
		} else if (e.target.id == "answer2"){
			if (this.collection.at(this.collection.at(this.placeholder).get("choice2")[1]).get("ending") != null){
				console.log('success');
			$("#welcome").text(
				this.collection.at(this.collection.at(this.placeholder).get("choice2")[1]).get("ending")
				);
			$("#a1Container").remove();
			$("#a2Container").remove();
			$("#initial").append(
				"<div id='startOver'>"+
				"<p>"+this.collection.at(this.collection.at(this.placeholder).get("choice2")[1]).get("startOver")+"</p>"+
				"</div>"
				); 	  	
				return;			
 			}	
			$("#welcome").text(
				this.collection.at(this.collection.at(this.placeholder).get("choice2")[1]).get("question")
				);
			var newPlace = this.collection.at(this.placeholder).get("choice2")[1];
			$("#answer1").text(
				this.collection.at(newPlace).get("choice1")[0]
				);
			$("#answer2").text(
				this.collection.at(newPlace).get("choice2")[0]
				);
			this.placeholder = newPlace;
			return
		}
	},

	newGame: function(){
		console.log('coming soon');
	}

 })
