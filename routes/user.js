const express = require('express')
const router = express.Router()
const connection = require('../models/db')

router.get('/settings', (req, res) => {
    if(req.session.loggedIn) 
    {
        connection.query(
            'SELECT * FROM users WHERE id=?',
            [req.session.userId],
            (err, results) => {
                if(err) throw err
                // if user exists
                if(results.length > 0) {
                    res.render('usersystem/settings.ejs', {user: results[0]})
                } else {
                    res.redirect('/login')
                }
            }
        )
    } else {
        res.redirect('/login')
    }
})
// User profile
router.get('/profile', (req, res) => {
    if (req.session.loggedIn) {
        connection.query(
            'SELECT * FROM users WHERE id=?',
            [req.session.userId],
            (err, results) => {
                if(err) throw err
                // if user exists
                if(results.length > 0) {
                    res.render('usersystem/profile.ejs', {user: results[0]})
                } else {
                    res.redirect('/login')
                }
            }
        )
    } else {
        res.redirect('/login')
    }
})

module.exports = router