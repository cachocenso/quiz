var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});


// Autoload de comandos con quizId
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
// Ruta para las búsquedas
router.get('/quizes/search', quizController.search);
// Ruta para la creación de preguntas
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
// Editar pregunta
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);

// Borrar pregunta
router.delete('/quizes/:quizId(\\d+)', quizController.delete);

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.author);



module.exports = router;
