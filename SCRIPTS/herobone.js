//models

app.Player = Backbone.Model.extend({
	strength: 0,
	charm: 0,
	name: 'blank'
});

//collections

app.PlayerList = Backbone.Collection.extend({
	model: app.Player
})
