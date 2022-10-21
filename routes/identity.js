const express = require('express')
const router = express.Router()
const connection = require('../models/db')

router.get('/fetchuserbyid', (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.query.id],
        (err, results) => {
            if (results.length > 0) {
                res.json({id: results[0].id, username: results[0].username, admin: results[0].admin})
            } else {
                res.json({id: 0, username: '( nicht vollständig )'})
            }
            
        }
    )
})

router.get('/fetchstbyid', (req, res) => {
    connection.query(
        'SELECT * FROM subtasks WHERE id=?',
        [req.query.id],
        (err, results) => {
            if(err) throw err
            if (results.length > 0) {
                res.json(results[0])
            } else {
                res.json({id: 0, parent_id: 0, title:'DELETED_SUBNOTE', completer_id: 0, completion_date: '0000-00-00', completion_time: '00:00:00'})
            }
        }
    )
})
module.exports = router