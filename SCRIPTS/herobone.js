//models

app.Player = Backbone.Model.extend({
	defaults: {
		"fitness": 0,
		"wealth": 0,
		"anger": 0,
		"leadership": 0,
		"uninteresting": 0,
		"elitist": 0, 
		"worshipper": 0,
		"skeptic": 0,
		"name": 'blank'
	}
});


app.Choices = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"question": null,
		"choice1": null,
		"choice2": null,
		"secretStat" : "none",
		"ending" : null
	}
})

app.characterQuestion = Backbone.Model.extend({
	defaults: {
		"question" : null,
		"answerOne" : [null, null, null],
		"answerTwo" : [null, null, null]
	}
})

//collections

app.characterQuestions = Backbone.Collection.extend({
	model: app.characterQuestion,
	url: "./SCRIPTS/charQuestion.json"
})

app.PlayerList = Backbone.Collection.extend({
	model: app.Player,
})



app.ChooseChoices = Backbone.Collection.extend({
	model: app.Choices,
	url: "./SCRIPTS/hero.json",
	initialize: function(){

	}

})
