// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
// const Edit = require('../models/edit.js');

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('games/index.ejs', {
        library: currentUser.library,
      });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });
  
  
// router logic will go here - will be built later on in the lab

module.exports = router;
