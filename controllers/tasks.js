const express = require('express')
const connection = require('../models/db')


exports.fetchSubTasks = (req, res) => {
    if(!req.session.loggedIn) return res.json([{}]) // if not logged in

    connection.query(
        'SELECT * FROM subtasks WHERE parent_id = ?',
        [req.query.id],
        (err, results) => {
            const data = JSON.parse(JSON.stringify(results))
            res.json(data)
        }
    )
}

// INSERT INTO subtasks(id, parent_id, title, created_at) VALUES ([value-1],[value-2],[value-3],[value-4])
// INSERT INTO tasks(id, title, created_at) VALUES ([value-1],[value-2],[value-3])
exports.addTask = (req, res) => {
     // if user is not logged in or is not an admin
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {

            if (req.session.loggedIn) {
                
                if (results[0].admin > 0) {

                    // if periods are not supported (Security reasons)
                    const supportedPeriods = ["day", "week", "fortnight", "month"]
                    if(!supportedPeriods.includes(req.body.period)) return res.redirect('/tasks') 

                    connection.query(
                        'INSERT INTO tasks(title, period) VALUES(?, ?)',
                        [req.body.title, req.body.period],
                        (err, results) => {
                            if (err) throw err
                            res.redirect("/tasks")
                        }
                    )

                }
            } 

        }
    ) 
}

exports.addSubTask = (req, res) => {
    
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {

            if (req.session.loggedIn) {
                
                if (results[0].admin > 0) {

                    connection.query(
                        'SELECT period FROM tasks WHERE id = ?',
                        [req.body.parentid],
                        (err, parentResults) => {
                            connection.query(
                                'INSERT INTO subtasks(parent_id, title, period) VALUES (?, ?, ?)',
                                [req.body.parentid, req.body.title, parentResults[0].period],
                                (err, results) => {
                                    if(err) throw err
                                    
                                    res.redirect('/tasks')
                                }
                            )
                        }
                    )

                }
            } 

        }
    ) 
    
    
}

exports.removeTask = (req, res) => {
    // if user is not logged in or is not an admin
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {

            if (req.session.loggedIn) {
                
                if (results[0].admin > 0) {

                    connection.query(
                        'DELETE FROM tasks WHERE id = ?; DELETE FROM subtasks WHERE parent_id = ?',
                        [req.body.id, req.body.id],
                        (err, results) => {
                            res.redirect('/tasks')
                        }
                    )

                }
            } 

        }
    ) 
}

exports.removeSubTask = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {

            if (req.session.loggedIn) {
                
                if (results[0].admin > 0) {

                    connection.query(
                        'DELETE FROM subtasks WHERE id = ?',
                        [req.body.id],
                        (err, results) => {
                            res.redirect('/tasks')
                        }
                    )

                }
            } 

        }
    )
}

exports.completeSubTask = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {


            connection.query(
                'SELECT * FROM subtasks WHERE id = ?',
                [req.body.id],
                (err, results) => {
                    if (!results[0].completer_id)
                    {
                        if (req.session.loggedIn) {
                    
                            connection.query(
                                'UPDATE subtasks SET completer_id=?, completion_date=NOW(), completion_time=NOW() WHERE id=?',
                                [req.session.userId, req.body.id],
                                (err, results) => {
                                    res.redirect('/tasks')
                                }
                            )
        
                    }
                    }
                }
            )

            

        }
    )
}

exports.editTask = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                    // Code here
                    const id = req.params.id
                    connection.query(
                        'SELECT * FROM tasks WHERE id = ?',
                        [req.params.id],
                        (err, resutls) => 
                        {
                            if (resutls.length > 0)
                            {
                                res.render('tasksystem/edittask.ejs', {title: resutls[0].title, type: 'task', id: req.params.id})
                            }
                        }
                    )
                }
            } 

        }
    )

    
}

exports.editSubTask = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                    // Code here
                    const id = req.params.id
                    connection.query(
                        'SELECT * FROM subtasks WHERE id = ?',
                        [req.params.id],
                        (err, resutls) => 
                        {
                            if (resutls.length > 0)
                            {
                                res.render('tasksystem/edittask.ejs', {title: resutls[0].title, type: 'subtask', id: req.params.id})
                            }
                        }
                    )
                }
            } 

        }
    )
}

exports.updateTask = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                    // Code here
                    const title = req.body.title
                    const id = req.params.id
                    connection.query(
                        'UPDATE tasks SET title=? WHERE id=?',
                        [title, id],
                        (err, resutls) => {
                            if (err) throw err
                            res.redirect('/tasks')
                        }
                    )
                }
            } 

        }
    )
}

exports.updateSubTask = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                    // Code here
                    // Code here
                    const title = req.body.title
                    const id = req.params.id
                    connection.query(
                        'UPDATE subtasks SET title=? WHERE id=?',
                        [title, id],
                        (err, resutls) => {
                            if (err) throw err
                            res.redirect('/tasks')
                        }
                    )
                }
            } 

        }
    )
}
