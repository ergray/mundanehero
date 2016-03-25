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
		$("#nameSpace").remove();
		$("#initial").append(
			"<div id='a1Container'>"+
			"<button class='answers' id='answer1'>A1</button>"+
			"</div>"
			);
		$("#initial").append(
			"<div id='a2Container'>"+
			"<button class='answers' id='answer2'>A2</button>"+
			"</div>"
			);
		$("#initial span:nth-child(1)").text("Question for you, " +options+ ".");
		$("#initial span:nth-child(3)").remove();
		var questionButtons = new QuestionButtons({el: $('#initial')})			
	}
})