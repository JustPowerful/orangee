const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const session = require('express-session')
const connection = require('../models/db')

const tasksController = require('../controllers/tasks')





router.post('/completest', tasksController.completeSubTask)

router.post('/addt', tasksController.addTask) // Adding tasks
router.post('/rmt', tasksController.removeTask) // Removing tasks

router.post('/addst', tasksController.addSubTask) // Adding subtasks
router.post('/rmst', tasksController.removeSubTask)


router.get('/tasks', (req, res) => {
    if (req.session.loggedIn) {
        
        // getting tasks
        connection.query(
            'SELECT * FROM tasks',
            [],
            (err, results) => {
                req.tasks = results
                
                // getting subtasks inside tasks
                // SELECT subtasks.*, users.username as completer FROM subtasks JOIN users ON subtasks.completer_id = users.id
                connection.query(
                    'SELECT * FROM subtasks',
                    [],
                    (err, results) => {
                        req.subtasks = results


                        connection.query(
                            'SELECT * FROM users',
                            [],
                            (err, results) => {
                                req.users = results

                                connection.query(
                                    'SELECT * FROM users WHERE id = ?',
                                    [req.session.userId],
                                    (err, results) => {
                                        req.currentUser = results[0]

                                        

                                        connection.query(
                                            'SELECT * FROM notes',
                                            [],
                                            (err, results) => {
                                                req.notes = results

                                                function countNote(notes, id) {
                                                    let sum = 0
                                                    notes.forEach(note => {
                                                        if(note.parent_id === id){
                                                            if(!note.archived){
                                                                sum++
                                                            }
                                                        }
                                                    })
                                                    return sum
                                                }

                                                res.render('tasksystem/tasks.ejs', {tasks: req.tasks, subtasks: req.subtasks, users: req.users, currentUser: req.currentUser, notes: req.notes, countNote: countNote})
                                            }
                                        )
                                    }
                                )

                                
                            }
                        )
                        // Passing tasks and subtasks
                        
                    }
                )
            }
        )
    } else {
        res.redirect('/login')
    }
})

router.get('/edittask/:id', tasksController.editTask)
router.get('/editsubtask/:id', tasksController.editSubTask)
router.post('/updatetask/:id', tasksController.updateTask)
router.post('/updatesubtask/:id', tasksController.updateSubTask)

module.exports = router
