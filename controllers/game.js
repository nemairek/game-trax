const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Game = require('../models/game');

const filterUser = 

router.get("/", async (req, res) => {
let gamesArray = await Game.find({})
console.log(gamesArray)
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

router.get("/edit", (req, res) => {
    res.render("games/edit.ejs")
});




module.exports = router;