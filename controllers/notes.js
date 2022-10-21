const connection = require('../models/db')
const moment = require('moment')
const { cssNumber } = require('jquery')

exports.viewNotes = (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/login')

    connection.query(
        'SELECT notes.id, notes.date, notes.parent_id, notes.user_id, notes.note, users.username FROM notes JOIN users ON notes.user_id=users.id WHERE notes.parent_id = ? AND notes.archived <= 0',
        [req.params.subtaskid],
        (err, results) => {
            if (err) throw err
            req.data = JSON.parse(JSON.stringify(results))


            
            connection.query(
                'SELECT * FROM users WHERE id = ?',
                [req.session.userId],
                (err, results) => {
                    if (results.length > 0) {
                        res.render('notes.ejs', {subtaskid: req.params.subtaskid, notes: req.data, moment: moment, user: results[0]})
                    } else {
                        res.redirect('/logout')
                    }
                }
            )
            // Complete it later
        }
    )
}

exports.addNote = (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/login')
    
    connection.query(
        'INSERT INTO notes(parent_id, user_id, note) VALUES(?, ?, ?)',
        [req.params.subtaskid, req.session.userId, req.body.noteinput],
        (err, results) => {
            if (err) throw err
            res.redirect(`/notes/${req.params.subtaskid}`)
        }
    )
}

exports.archiveNote = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                   // do the archiving here
                   connection.query(
                    'SELECT * FROM notes WHERE id = ?',
                    [req.params.id],
                    (err, results) => {
                        req.session.previousLink = `/notes/${results[0].parent_id}`
                        connection.query(
                            'UPDATE notes SET archived = 1 WHERE id = ?',
                            [req.params.id],
                            (err, results) => {
                                if (err) throw err
                                res.redirect(req.session.previousLink)
                            }
                    )
                    }
                )
                }
            } else {
                res.redirect('/login')
            }
        }
    )
}

exports.viewArchive = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                   // do the archiving here
                   connection.query(
                       'SELECT DISTINCT notes.parent_id FROM notes WHERE notes.archived > 0',
                       [],
                       (err, results) => {
                            res.render('viewarchive.ejs', {subtasks: results})
                       }
                   )
                }
            } else {
                res.redirect('/login')
            }
        }
    )
}

exports.viewStArchive = (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [req.session.userId],
        (err, results) => {
            if (req.session.loggedIn) {
                if (results[0].admin > 0) {
                   // do the archiving here

                   let {page} = req.query
                   if (page == undefined) page = 1

                   const limit = 10
                   const offset = (page - 1) * limit

                   connection.query(
                       'SELECT notes.*, users.username FROM notes JOIN users ON notes.user_id = users.id WHERE notes.parent_id = ? AND notes.archived > 0 ORDER BY date DESC LIMIT ? OFFSET ?',
                       [req.params.id, limit, offset],
                       (err, results) => {
                           res.render('archivednotes.ejs', {notes: results, moment: moment})
                       }
                   )
                   
                }
            } else {
                res.redirect('/login')
            }
        }
    )
}

// Viewing all the notes without having the check every note
exports.viewAllNotes = (req, res) => {
    connection.query(
        "SELECT DISTINCT subtasks.*, notes.parent_id FROM subtasks INNER JOIN notes ON subtasks.id = notes.parent_id WHERE notes.archived = 0",
        null,
        (err, results) => {
            res.render('notifications.ejs', {notes: results})
        }
    )
}