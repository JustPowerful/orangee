const express = require('express')
const connection = require('../models/db')


exports.deleteUser = (req, res) => {
    if (req.session.loggedIn) {
        
        connection.query(
            "SELECT * FROM users WHERE id = ?",
            [req.session.userId],
            (err, results) => {
                if (results[0].admin > 0) {

                    connection.query(
                        'DELETE FROM users WHERE id = ?',
                        [req.params.userId],
                        (err, results) => {
                            if (err) throw err
                            res.redirect('/userlist')
                        }
                    )

                }
            }
        )

    }
}

exports.getUsers = (req, res) => {
    
    let {username} = req.query
    if (username == undefined) username = ""
    let searchQuery = `SELECT * FROM users WHERE username LIKE "%${username}%"`

    if (req.session.loggedIn) {
        
        connection.query(
            "SELECT * FROM users WHERE id = ?",
            [req.session.userId],
            (err, results) => {
                if (results[0].admin > 0) {

                    connection.query(
                        searchQuery,
                        [],
                        (err, results) => {
                            res.render('management/userlist.ejs', {users: results})
                        }
                    )

                }
            }
        )

    } else {
        res.redirect('/login')
    }
}