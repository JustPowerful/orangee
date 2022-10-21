const express = require('express')
const { urlencoded, static } = require('express')
const session = require('express-session')
const cron = require('cron')

const connection = require('./models/db')

// Environement variables
require('dotenv').config()


// Run code every midnight [History saving every midnight]
// Format : minute hour day(month) month day(week)
// For format help : https://crontab.guru/
// For time zone help : https://cronjob.xyz/

// Every day
new cron.CronJob(
    '55 23 * * *',
    () => {
        // 55 23 * * *

        // Every midnight
        // Push to the history database later
        connection.query(
            'UPDATE subtasks SET completion_date=NOW() WHERE period="day"; INSERT INTO history SELECT * FROM subtasks WHERE period="day"; UPDATE subtasks SET completer_id = NULL, completion_date="0000-00-00", completion_time="00:00:00" WHERE period="day"',
            [],
            (err, results) => {
                if (err) throw err
                console.log("[+] Exporting the history of daily tasks [Successful]")
                console.log("[+] Reseting daily tasks [Successful]")
            }
        )
    },
    null,
    true,
    "Europe/Berlin"
)

// Every week
new cron.CronJob(
    '55 23 * * 0',
    () => {
        connection.query(
            'UPDATE subtasks SET completion_date=NOW() WHERE period="week"; INSERT INTO history SELECT * FROM subtasks WHERE period="week"; UPDATE subtasks SET completer_id = NULL, completion_date="0000-00-00", completion_time="00:00:00" WHERE period="week"',
            [],
            (err, results) => {
                console.log("[+] Exporting the history of weekly tasks [Successful]")
                console.log("[+] Reseting weekly tasks [Successful]") 
            }
        )
    },
    null,
    true,
    "Europe/Berlin"
)

// Every fortnight
// at day 1 and 15 of the month
new cron.CronJob(
    '55 23 1,15 * *',
    () => {
        connection.query(
            'UPDATE subtasks SET completion_date=NOW() WHERE period="fortnight"; INSERT INTO history SELECT * FROM subtasks WHERE period="fortnight"; UPDATE subtasks SET completer_id = NULL, completion_date="0000-00-00", completion_time="00:00:00" WHERE period="fortnight"',
            [],
            (err, results) => {
                console.log("[+] Exporting the history of fortnightly tasks [Successful]")
                console.log("[+] Reseting fortnightly tasks [Successful]") 
            }
        )
    },
    null,
    true,
    "Europe/Berlin"
)

// Every Month
new cron.CronJob(
    '55 23 1 * *',
    () => {
        connection.query(
            'UPDATE subtasks SET completion_date=NOW() WHERE period="month"; INSERT INTO history SELECT * FROM subtasks WHERE period="month"; UPDATE subtasks SET completer_id = NULL, completion_date="0000-00-00", completion_time="00:00:00" WHERE period="month"',
            [],
            (err, results) => {
                console.log("[+] Exporting the history of monthly tasks [Successful]")
                console.log("[+] Reseting monthly tasks [Successful]") 
            }
        )
    },
    null,
    true,
    "Europe/Berlin"
)


app = express()
app.use(urlencoded({extended: false})) // urlencoding
app.use(static('public'))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


// global session values (warning: don't change anything // security risks)
app.use(function(req, res, next) {

    // passing if the user is logged in or not
    if (req.session.loggedIn)
    {
        app.locals.loggedIn = true
        app.locals.currentUsername = req.session.username
        app.locals.userId = req.session.userId

        connection.query(
            'SELECT * FROM users WHERE id = ?',
            [req.session.userId],
            (err, results) => {
                if (results[0].admin > 0)
                {
                    app.locals.isAdmin = true
                } else {
                    app.locals.isAdmin = false
                }
                
            }
        )

        // Counting notifications [NOTES]
        connection.query(
            'SELECT COUNT(*) as notification_number from notes JOIN subtasks ON subtasks.id = notes.parent_id WHERE notes.archived = 0',
            [],
            (err, results) => {
                app.locals.notification_number = results[0].notification_number
            }
        )
        
    } else {
        app.locals.loggedIn = false
        app.locals.currentUsername = ""
        app.locals.userId = 0
        app.locals.isAdmin = false
    }


    next();
});

app.use(require('./routes/tasks')) // Tasks & sub-tasks REST
app.use(require('./routes/auth')) // Authentification pages
app.use(require('./routes/history')) // History REST & /history page
app.use(require('./routes/index')) // index page
app.use(require('./routes/notes'))
app.use('/graph', require('./routes/graph')) // Employees graph
// [Identifying a user]
app.use(require('./routes/identity'))

// User
app.use('/user', require('./routes/user'))

// 404 ERROR PAGE
app.use((req, res) => {
    res.status(404)
    res.send("404 ERROR") // change the page later
})

app.listen(process.env.PORT)