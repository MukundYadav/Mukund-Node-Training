const App = require('express');
const router = App.Router();

const userController = require('../controllers/userController');

router.post('/signUp', userController.signUp);

router.post('/login', userController.login);

module.exports = router;