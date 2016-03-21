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