var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


// Autoload de comandos con quizId
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
// Ruta para las búsquedas
router.get('/quizes/search', quizController.search);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.author);

module.exports = router;
