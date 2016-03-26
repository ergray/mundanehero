var StartButton = Backbone.View.extend({
	
	events: {
		"click #buttonBegin": "register"
	},

	// render: function(){
	// 	console.log(this)
	// },

	register: function(){
		// var questions = new Questions;
		var heroName = new HeroName;
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
		startProfile();
		var questions = new Questions($("#myName").val())
	}
})

var QuestionButtons = Backbone.View.extend({


	initialize: function(options){
		model: options.model
	},

	events: {
		"click .answers" : "nextPlease"
	},

	nextPlease: function(e){
		e.preventDefault();
		this.model.questionCount+1;
		console.log(this.model);
		console.log(questionCount);
		console.log(e.target)
	}
})