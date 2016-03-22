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
		startButton.render()
	}
})

var Questions = Backbone.Model.extend({

	initialize: function(){
		$("#start").remove();
		$("#initial").append(
			"<div id='a1Container'>"+
			"<button id='answer1'>A1</button>"+
			"</div>"
			);
		$("#initial").append(
			"<div id='a2Container'>"+
			"<button id='answer2'>A2</button>"+
			"</div>"
			);
		$("#initial span:nth-child(1)").text("Question");
		$("#initial span:nth-child(3)").remove()				
	}
})