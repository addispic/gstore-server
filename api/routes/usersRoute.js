const {Router} = require("express")

// controllers
// users controllers
const {
    getAllUsers,
    userRegistration,
    userLogin,
    userLogout,
    isUserAuthenticated
} = require('../controllers/usersController')

// middlewares
// auth middleware
const authMiddleware = require('../middlewares/authMiddleware')

// router
const router = Router();

// get all users
router.get("/users/all",getAllUsers)

// register
router.post('/users/register', userRegistration)

// login
router.post("/users/login", userLogin)

// logout
router.get("/users/logout", userLogout)

// get login user
router.get("/users/is-user-authenticated",authMiddleware, isUserAuthenticated)

// exports
module.exports = router