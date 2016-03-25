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

	events: {
		"click .answers" : "nextPlease"
	},

	nextPlease: function(e){
		e.preventDefault();
		console.log(e.target)
	}
})