const express = require('express')
const router = express.Router()
const connection = require('../models/db')

const historyController = require('../controllers/history')

router.get('/fetchhistory', historyController.fetchHistory) // History fetch api

// history page
router.get('/history', (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.session.userId],
        (err, results) => {
            if(results.length > 0) {
                if (req.session.loggedIn) {
                    if (results[0].admin > 0) {
                        res.render('history.ejs')
                    } else {
                        res.send('Forbidden error')
                    }
                } else {
                    res.redirect('/login')
                }
            } else {
                res.redirect('/logout')
            }
        }
    )
})

module.exports = router