const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Game = require('../models/game');




router.get("/", async (req, res) => {
const ownerId = req.session.user._id;
let gamesArray = await Game.find({ owner: ownerId }).populate('owner')
    res.render("games/index.ejs", {
        games: gamesArray
    })
});

router.get("/new", (req, res) => {
    res.render("games/new.ejs")
});

router.post("/", async (req, res) => {
    req.body.owner = req.session.user._id;
    await Game.create(req.body);
    res.redirect("/")
})

router.get('/:gameId', async (req, res) => {
    try {
        const populatedGames = await Game.findById(
          req.params.gameId
        ).populate('owner');
    
        res.render('games/show.ejs', {
          game: populatedGames,
        });
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
  });

  router.delete('/:gameId', async (req, res) => {
    try {
      const game = await Game.findById(req.params.gameId);
      if (game.owner.equals(req.session.user._id)) {
        await game.deleteOne();
        res.redirect('/game');
      } else {
        res.send("You don't have permission to do that.");
      }
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  });

  router.get('/:gameId/edit', async (req, res) => {
    try {
      const currentGame = await Game.findById(req.params.gameId);
      res.render('games/edit.ejs', {
        game: currentGame,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.put('/:gameId', async (req, res) => {
    try {
      const currentGame = await Game.findById(req.params.gameId);
      if (currentGame.owner.equals(req.session.user._id)) {
        await currentGame.updateOne(req.body);
        res.redirect('/game');
      } else {
        res.send("You don't have permission to do that.");
      }
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;