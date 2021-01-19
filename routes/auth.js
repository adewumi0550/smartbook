// const { Router } = require('express')
const express = require('express')
const passport = require('passport')
const router = express.Router()
//
router.get('/google', passport.authenticate('google', { scope: ['profile'] }) )


router.get('/google/callback',  passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
})
//Logout User /aith/logout
router.get('/logout', (req, res) =>{
    req.logout()
    res.redirect('/')
})

module.exports = router