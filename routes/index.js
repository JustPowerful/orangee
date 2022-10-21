const express = require('express')
const router = express.Router()
const connection = require('../models/db')

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        connection.query(
            'SELECT * FROM users WHERE id = ?',
            [req.session.userId],
            (err, results) => {
                if(results.length > 0) {
                    res.render("index.ejs", {isAdmin: results[0].admin})
                } else {
                    res.redirect('/logout')
                }
            }
        )
    } else {
        res.redirect("login")
    }
})

module.exports = router