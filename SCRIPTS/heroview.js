 var app = {};

app.Begin = Backbone.View.extend({

	initialize: function(opts){
		el = opts.el;
		this.collection = new app.PlayerList();
		//Render front page. Alter text in HTML elements of render function to change messages.
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
		this.collection = new app.characterQuestions();
		this.ourName = options.name;
		this.render(options.name);
	},

	render: function(name){
		this.collection.fetch({
			data: {
				name: name
			},
			success: this.onSuccess,
			error: this.onError
		});
		this.questionCount = 0;
		this.answers = [];
		var questionButtons = new app.QuestionButtons({el: $('#initial'), name: name, answers: this.answers, questionCount: this.questionCount, collection: this.collection})
	},

	onSuccess: function(collection, response, options){
		$("#nameSpace").remove();
		$("#initial #subheader").show();
		$("#initial").append(
			"<div id='answersContainer'>"+
			"<div id='a1Container'>"+
			"<div class='answers'><p id='answer1'>"+collection.get(0).get("answerOne")[0]+"</p></div>"+
			"</div>"+
			"<div id='a2Container'>"+
			"<div class='answers'><p id='answer2'>"+collection.get(0).get("answerTwo")[0]+"</p></div>"+
			"</div>"+
			"</div>"
			);
		$("#initial #header").text("Question for you, " +options.data.name+ ".");
		$("#initial #subheader").text(collection.get(0).get("question"));
		},

	onError: function(collection, response, options){
			console.log("I failed.");
			console.log(response);
		},
})

app.QuestionButtons = Backbone.View.extend({



	initialize: function(options){
		this.stats = [];
		this.options = options;
		this.collection = options.collection;
		this.ourName = options.name;
		this.answers = options.answers;
		this.questionCount = options.questionCount;
	},

	render: function(){

	},

	events: {
		"click #answer1" : "nextPlease",
		"click #answer2" : "nextPlease"
	},

	nextPlease: function(e){
		if (e.target.id == "answer1"){
			this.answers.push(this.collection.get(this.questionCount).get("answerOne"));
		} else {
			this.answers.push(this.collection.get(this.questionCount).get("answerTwo"));
		}
		this.questionCount+=1;
		if (this.questionCount > this.collection.length-1){
			this.questionCount = 0;
			var tallyAnswers = new app.TallyAnswers({el: $('#initial'), answers: this.answers, listOfQuestions: this.listOfQuestions, ourName: this.ourName, collection: this.collection});
			this.undelegateEvents();
			return
		};
		$("#initial #subheader").text(this.collection.get(this.questionCount).get("question"));
		$('#answer1').text(this.collection.get(this.questionCount).get("answerOne")[0]);
		$('#answer2').text(this.collection.get(this.questionCount).get("answerTwo")[0]);
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
		this.ourName = options.ourName;
		this.answers = options.answers;
		$("#initial #header").text("Thank you, " +this.ourName+ ".");
		$("#initial #subheader").text('Can you please verify that the below are correct?');
		$("#answersContainer").remove();
		this.render();
	},

	render: function(){
		console.log(this.collection);
		$("#initial").append(
			"<div id='checkAnswers'></div>"
			);
		for (i = 0; i<this.collection.length; i++){
			$("#checkAnswers").append(
					"<div class='question'>"+
					"<p><span class='bold'>Question:</span> "+this.collection.get(i).get("question")+"</p>"+
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
		for (i=0;i<this.answers.length;i++){
			var standIn = newGuy.get(this.answers[i][1])
			newGuy.set(this.answers[i][1], (standIn += (this.answers[i][2])))
		}

		//ToDo: Figure out what to do with this collection. Do I need it?
		
		var startGame = new app.StartGame({el: $("#initial"), character: /*newGuy.get("name")*/newGuy, collection: this.collection})
	}


})

app.StartGame = Backbone.View.extend({

	events: {
		"click #answer1" : "nextPlease",
		"click #answer2" : "nextPlease",
		"click #secretToEveryone" : "nextPlease",
		"click #startOver" : "newGame"
	},


 	initialize: function(options){
 		this.character = options.character;
		this.collection = new app.ChooseChoices();
		this.render()
 	},

 	render: function(){
 		$("#initial div:nth-child(2)").remove();
		this.collection.fetch({
			success: this.onSuccess,
			error: this.onError
		});
		this.placeholder = 0;
 	},

	onSuccess: function(collection, response, options){
		console.log(collection);
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

	helpFill: function(val1){
		return (
			$("#welcome").text(
				this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("question")
				),
			$("#secretContainer").remove(),
			$("#a1Container").remove(),
			$("#a2Container").remove(),
			$("#initial").append(
			"<div id='answersContainer'>"+
				"<div class='answers' id='startOver'>"+
				"<p id='theEnd'>"+this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("ending")+"</p>"+
				"</div>"+
				"</div>"
				)
			)
	},

	helpContinue: function(val1){
		//Check question for possible extras due to stats, then check against player stats
		$("#secretContainer").remove();
		var newPlace = this.collection.at(this.placeholder).get(val1)[1];
		if ( (this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat") != "none") && 
			(this.character.get(this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat")[2]) >= this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat")[3])){
			$("#answersContainer").append(
				"<div class='answers' id='secretContainer'>"+
				"<p id='secretToEveryone'>"+this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat")[0]+"</p>"+
				"</div>"
				)
		}
		//Check if secret stat causes a substitution of choices, rather than an addition to
		if (this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat")[4]){
				return (
				$("#welcome").text(
					this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("question")
					),
				$("#answer1").text(
					this.collection.at(newPlace).get("choice1")[0]
					),
				$("#answer2").text(
					this.collection.at(newPlace).get("choice2")[0]
					),
				$(this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat")[4]).text(
					this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("secretStat")[0]
					),
				$("#secretContainer").remove(),
				this.placeholder = newPlace
			)
		} else {
		//No stats or other things? Continue as normal.
		return (
			$("#welcome").text(
				this.collection.at(this.collection.at(this.placeholder).get(val1)[1]).get("question")
				),
			$("#answer1").text(
				this.collection.at(newPlace).get("choice1")[0]
				),
			$("#answer2").text(
				this.collection.at(newPlace).get("choice2")[0]
				),
			this.placeholder = newPlace
			)
		}
	},

	//Check if player is about to reach an ending point, which calls a separate function, and if not, use helper functions to move to the next point
	nextPlease: function(e){
		if (e.target.id == "answer1"){
			if (this.collection.at(this.collection.at(this.placeholder).get("choice1")[1]).get("ending") != null){
				this.helpFill("choice1"); 	
				return;			
 			}
 			this.helpContinue("choice1");
			return
		} else if (e.target.id == "answer2"){
			if (this.collection.at(this.collection.at(this.placeholder).get("choice2")[1]).get("ending") != null){
				this.helpFill("choice2"); 	  	
				return;			
 			}
 			this.helpContinue("choice2");
			return
		}	else if (e.target.id == "secretToEveryone"){
			if (this.collection.at(this.collection.at(this.placeholder).get("secretStat")[1]).get("ending") != null){
				this.helpFill("secretStat"); 	  	
				return;			
 			}
 			this.helpContinue("secretStat");
			return 			
 			}
	},

	newGame: function(){
 		$("#answersContainer").remove();
		this.render()
	}

 })
