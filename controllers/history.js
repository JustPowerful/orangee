const connection = require('../models/db')
const session = require('express-session')

exports.fetchHistory = (req, res) => {

        
        connection.query(
            'SELECT * FROM users WHERE id = ?',
            [req.session.userId],
            (err, results) => {
                if (req.session.loggedIn) {
                    if (results[0].admin > 0) {
                        // Code here
                        // fetch data by [day, month, year, username]s
                        let {day, month, year, username} = req.query
                        if (day == undefined || day == 0) day = ""
                        if (month == undefined || month == 0) month = ""
                        if (year == undefined || year == 0) year = ""
                        if (username == undefined) username = ""
                    
                        let userQuery = `SELECT * FROM users WHERE username LIKE "%${username}%"`
                    
                        connection.query(
                            userQuery,
                            [],
                            (err, results) => {
                                if (results.length == 1) {
                                    let userId = results[0].id
                    
                                    // add the username search to the query later
                                    let searchQuery = `SELECT * FROM history WHERE EXTRACT(DAY FROM completion_date) LIKE "%${day}%" AND EXTRACT(MONTH FROM completion_date) LIKE "%${month}%" AND EXTRACT(YEAR FROM completion_date) LIKE "%${year}%" AND completer_id LIKE "%${userId}%"`
                    
                                    connection.query(
                                        searchQuery,
                                        [],
                                        (err, results) => {
                                            if (err) throw err
                                            res.json(results)
                    
                                        }
                                    )
                                    
                    
                                } else if (results.length > 1) {
                                    let searchQuery = `SELECT * FROM history WHERE EXTRACT(DAY FROM completion_date) LIKE "%${day}%" AND EXTRACT(MONTH FROM completion_date) LIKE "%${month}%" AND EXTRACT(YEAR FROM completion_date) LIKE "%${year}%"`
                    
                                    connection.query(
                                        searchQuery,
                                        [],
                                        (err, results) => {
                                            if (err) throw err
                                            res.json(results)
                    
                                        }
                                    )
                                }
                    
                                
                            }
                        )
                    }
                }          
            }
        )

}