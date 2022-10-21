const express = require('express')
const router = express.Router()
const connection = require('../models/db')

// If you want to add other graphs for different time intervals, just change the query. (WHERE)

router.get('/lastmonth', (req, res) => {
    connection.query(
        "SELECT history.*, users.username FROM history JOIN users ON history.completer_id = users.id where DATE_FORMAT(completion_date, '%Y-%m') = date_format(DATE_SUB(curdate(), INTERVAL 1 month),'%Y-%m')",
        null,
        (err, results) => {
            if (err) throw err
            if(results.length > 0)
            {
                // res.render('graph/lastmonth.ejs', {results: results})

            // Step 1: Getting all the users from all the tasks
            req.garbageList = []
            results.forEach(result => {
                req.garbageList.push(result.completer_id)
            });

            // Step 2: Filtering the users from the tasks
            req.userIds = Array.from(new Set(req.garbageList))

            // Step 3: counting every task every user completed
            req.counts = []
            req.userIds.forEach((user) => {
                let counter = 0;
                results.forEach((task) => {
                    if(user === task.completer_id)
                    {
                        counter++
                    }
                })

                req.counts.push({user:user, count: counter})
            })

            // Step 4: Counting total tasks [Completed and uncompleted]
            req.totalCount = results.length

            req.percentage = []
            // Step 5: Calculating the percentage
            
            req.userIds.forEach(async (user) => {
                req.counts.forEach(async (count) => {
                    if (user === count.user) {
                        let info = results.find(element => {
                            return element.completer_id === user
                        })

                        req.percentage.push({y: ((count.count * 100) / req.totalCount).toFixed(2), label: info.username})
                    }
                })
            })

            // Getting the labels from the percentage list
            req.labels = []
            req.values = []
            req.percentage.forEach(element => {
                req.labels.push(element.label)
                req.values.push(element.y)
            })

            res.render('graph/results.ejs', {labels: req.labels, values: req.values, title: "Results of the last month"})
            }
            
            else 
            {
                res.send("<center><code>No results last month</code></center>")
            }
        }
    )
})

router.get('/lastyear', (req, res) => {

    connection.query(
        "SELECT history.*, users.username FROM history JOIN users ON history.completer_id = users.id WHERE YEAR(completion_date) = YEAR(NOW()) - 1",
        null,
        (err, results) => {
            if(err) throw err
            
            if(results.length > 0)
            {
                // res.render('graph/lastmonth.ejs', {results: results})

            // Step 1: Getting all the users from all the tasks
            req.garbageList = []
            results.forEach(result => {
                req.garbageList.push(result.completer_id)
            });

            // Step 2: Filtering the users from the tasks
            req.userIds = Array.from(new Set(req.garbageList))

            // Step 3: counting every task every user completed
            req.counts = []
            req.userIds.forEach((user) => {
                let counter = 0;
                results.forEach((task) => {
                    if(user === task.completer_id)
                    {
                        counter++
                    }
                })

                req.counts.push({user:user, count: counter})
            })

            // Step 4: Counting total tasks [Completed and uncompleted]
            req.totalCount = results.length

            req.percentage = []
            // Step 5: Calculating the percentage
            
            req.userIds.forEach(async (user) => {
                req.counts.forEach(async (count) => {
                    if (user === count.user) {
                        let info = results.find(element => {
                            return element.completer_id === user
                        })

                        req.percentage.push({y: ((count.count * 100) / req.totalCount).toFixed(2), label: info.username})
                    }
                })
            })
            
            
            // Getting the labels from the percentage list
            req.labels = []
            req.values = []
            req.percentage.forEach(element => {
                req.labels.push(element.label)
                req.values.push(element.y)
            })

            res.render('graph/results.ejs', {labels: req.labels, values: req.values, title: "Results of the last month"})

            }
            else 
            {
                res.send("<center><code>No results last year</code></center>")
            }
        }
    )
})

router.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.session.userId],
        (err, results) => {
            if(results.length > 0) {
                if (req.session.loggedIn) {
                    if (results[0].admin > 0) {
                        // response to admin
                        res.render('graph/gindex.ejs')
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