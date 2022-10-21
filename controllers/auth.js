let connection = require('../models/db')
const { json } = require('express')
const bcrypt = require('bcrypt')
const session = require('express-session')

const transporter = require('../models/email') // email transporter

// defined functions 
Array.prototype.contains = function ( needle, type ) {
    if (type === "username") {
        for (i in this) {
            if (this[i].username == needle) return true;
         }
         return false;
    }

    if (type === "phone") {
        for (i in this) {
            if (this[i].phone == needle) return true;
         }
         return false;
    }

    if (type === "email") {
        for (i in this) {
            if (this[i].email == needle) return true;
         }
         return false;
    }
}

// checks if the values are used in the database {set to false by default}
let usedUsername = false
let verifiedPass = true // password checking verification boolean

exports.register = async (req, res) => {

    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {

                    // Getting current users
                    connection.query(
                        "SELECT * FROM users",
                        [],
                        (err, results) => {
                            req.users = results
                        }
                    )

                    // Adding a user to the sql query
                    const {username, password, passwordcheck} = req.body // importing variable from POST body requests
    
                    // Checks if values exists, if its null or undefined it will return false
                    if (username && password && passwordcheck){
                        

                        // Checking the username & email & phone if exists
                        connection.query(
                            "SELECT * FROM users WHERE username = ?",
                            [username],
                            async (err, results) => {
    
                                let data = JSON.parse(JSON.stringify(results))
    
                                // if data found
                                if(data.length) {
    
                                    // checks values
                                    if (data.contains(username, "username")) usedUsername = true
                                    else usedUsername = false
    
                                    if (password === passwordcheck) verifiedPass = true
                                    res.render('management/userlist.ejs', {"usedUsername": usedUsername, "verifiedPass": verifiedPass, "users": req.users})
                                }
                                // if nothing found on the data {means that the username/email/phone aren't used}
                                else {
    
                                    // checks if password is verified before its submits the value
                                    if (password === passwordcheck) {
    
                                        // Hashing the password 8 rounds (for security reasons)
                                        let hashedPassword = await bcrypt.hash(password, 8)
    
                                        connection.query(
                                            // pushing the account into the database with the default profile picture path
                                            'INSERT INTO users(username, password) VALUES(?, ?)',
                                            [username, hashedPassword],
                                            () => {
                                                // redirects users when the register {change this to redirect to profile}

                                                // Gettig new users list
                                                connection.query(
                                                    "SELECT * FROM users",
                                                    [],
                                                    (err, newUsers) => {
                                                        res.render('management/userlist.ejs', {"isCreated": true, "usedUsername": false, "verifiedPass": true, "users": newUsers }) 
                                                    }
                                                )

                                                
                                            }
                                        )
    
                                    } else {
                                        // passwords dot not match
                                        verifiedPass = false
                                        res.render('management/userlist.ejs', {"usedUsername": usedUsername, "verifiedPass": verifiedPass, "users": req.users})
                                    }
    
                                }
                                
                            }
                        )
    
                    }
                }
            } else {
                res.redirect('/login')
            }
        }
    )

    
}

exports.login = async (req, res) => {
    const {username, password} = req.body

    // if there's no input from the user (it will stop this function and render the login-error page)
    if (!username || !password) {
        res.render('usersystem/login.ejs', {errorMessage: "Please provide input for the username and the password field."})
    } else {
        connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            async (err, results) => {
                
                // account found
                if (results.length > 0) {
                    // if there's not results in the database or the password is not correct
                    if (!results || !(await bcrypt.compare(password, results[0].password))) {
                        res.render('usersystem/login.ejs', {errorMessage: "The password is not correct, please check your typing before logging in!"}) // this is not an error {error message is for debugging!}
                    } else {
                        // if the username and password is correct
                        // setting the session to the current user
                        req.session.loggedIn = true
                        req.session.username = req.body.username
                        req.session.userId = results[0].id

                        res.redirect('/')
                    }
                // if we didn't find anything in th database
                } else {
                    res.render('usersystem/login.ejs', {errorMessage: "Sorry but we can't find this username in the database, please check your typing!"})
                }
            }
        )
    }
}


exports.change = async (req, res) => {

    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                    // Adding a user to the sql query
                    const {password, passwordcheck, email} = req.body // importing variable from POST body requests
    
                    // Checks if values exists, if its null or undefined it will return false
                    if (password && passwordcheck){
    
                        // Checking the username & email & phone if exists
                        connection.query(
                            "SELECT * FROM users WHERE id = ?",
                            [req.session.userId],
                            async (err, results) => {
                                
                                    if (password === passwordcheck)
                                    {
                                        // new hashed password [8 rounds]
                                        let hashedPassword = await bcrypt.hash(password, 8)
    
                                        connection.query(
                                            // pushing the account into the database with the default profile picture path
                                            'UPDATE users SET password = ? WHERE id = ?',
                                            [hashedPassword, req.session.userId],
                                            () => {
                                                // redirects users when the register {change this to redirect to profile}
                                                res.redirect('/logout')
                                            }
                                        )
                                    } else {
                                        res.render('usersystem/settings.ejs', {"verifiedPass": false})
                                    }
                            }
                        )
    
                    } else {
                        res.redirect('/user/profile')
                    }

                    if (email) {
                        connection.query('UPDATE users SET email = ? where id = ?',
                        [email, req.session.userId], () => {
                            
                        })
                    }

                }
            } else {
                res.redirect('/login')
            }
        }
    )

    
}

// RESET PASSWORD USING EMAIL
const crypto = require('crypto')
exports.reset = async (req, res) => {
    const {username, email} = req.body

    connection.query('SELECT * FROM users WHERE username = ? AND email = ?',
    [username, email], 
    async (err, results) => {
        if (results.length > 0) {
            // create a request token [LATER]
            const token = crypto.randomBytes(25).toString('hex')
            connection.query('INSERT INTO recovery(token, username) VALUES(?, ?)',
            [token, results[0].username], (err, results) => {
                if (err) throw err
            })
            // nodemailer work
            await transporter.sendMail({
                from: '"noreply 089-facilityservice 🧹" <noreply@089qs.de>', // sender address
                to: `${email}`, // list of receivers
                subject: `${username}'s Account Recovery`, // Subject line
                text: "Hello world?", // plain text body
                html: `<img width='300' src='https://089-facilityservice.de/wp-content/uploads/2017/12/cropped-logo-089facilityservice-2.png'/> <br> Hello! we're 089-facilityservice's moderators and we want to verify if this is you. if you actually wanted to reset your email then your recovery link is: <br> <a href="http://${process.env.CURRENT_URL}/reset/authenticate/${token}">https://089qs.de/authenticate/${token}</a>`, // html body
              });

            res.render('usersystem/resetsuccessfull.ejs')
        } else {
            res.redirect('/reset')
        }
    })
}

exports.resetAuth = async(req, res) => {
    const {token} = req.params
    connection.query('SELECT * FROM recovery WHERE token=?', [token], (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            res.render('usersystem/resetform.ejs', {token: token})
        }
    })
}

exports.resetSave = async (req, res) => {
    const {password, checkpassword, token} = req.body
    if (password && checkpassword) {
        if (password == checkpassword) {
            connection.query('SELECT * FROM recovery WHERE token = ?', [token], async (err, results) => {
                if (err) throw err
                const username = results[0].username
                
                let hashedPassword = await bcrypt.hash(password, 8)
                connection.query('UPDATE users SET password = ? WHERE username = ?', 
                [hashedPassword, username], (err, results) => {
                    if (err) throw err
                    connection.query('DELETE FROM recovery WHERE token = ?', [token], (err, results) => {
                        if (err) throw err
                        res.redirect('/login')
                    })
                })
            })
        }
    }
}

exports.logout = (req, res) => {

    // setting the session variables to null or false
    // that means we've kicked the user from the session
    req.session.loggedIn = false
    req.session.username = null
    req.session.userId = null

    res.redirect('/')
}