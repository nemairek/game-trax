const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},

genre: {
    type: String,
    required: true,
},
publishedYear: {
    type: Number,
    required: true,
    min: 0,
},

status: {
    type: String,
    required: true,
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;