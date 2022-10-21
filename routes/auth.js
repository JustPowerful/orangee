const express = require('express')
const router = express.Router()
const session = require('express-session')

const authController = require('../controllers/auth')
const usermanagementController = require('../controllers/usermanager')


router.get('/login', (req, res) => {
    res.render('usersystem/login.ejs')
})

// user auth management
router.get('/useradd', (req, res) => {
    res.render('usersystem/register.ejs')
})
router.post('/useradd', authController.register)

router.get('/userlist', usermanagementController.getUsers)
router.get('/deleteuser/:userId', usermanagementController.deleteUser)

router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/change', authController.change) // This changes the password in /settings

router.get('/reset', (req, res) => {
    res.render('usersystem/reset.ejs')
})
router.post('/reset', authController.reset)
router.get('/reset/authenticate/:token', authController.resetAuth)
router.post('/reset/complete', authController.resetSave)


module.exports = router