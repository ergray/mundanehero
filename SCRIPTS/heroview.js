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
		var questions = new Questions($("#myName").val())
	}
})