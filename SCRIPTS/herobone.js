//models

app.Player = Backbone.Model.extend({
	defaults: {
		"sanity": 0,
		"wealth": 0,
		"responsibility": 0,
		"power": 0,
		"selflessness": 0,
		"beauty": 0, 
		"subterfuge": 0,
		"intellect": 0,
		"spirituality": 0,
		"public_opinion": 0,
		"name": 'blank'
	}
});

//collections

app.PlayerList = Backbone.Collection.extend({
	model: app.Player,
})

app.Choices = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"question": null,
		"choice1": null,
		"choice2": null
	}
})


app.ChooseChoices = Backbone.Collection.extend({
	model: app.Choices,
	url: "./SCRIPTS/hero.json",
	initialize: function(){

	}

})
