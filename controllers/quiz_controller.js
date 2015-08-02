var models = require('../models/models.js');


// Autoload - factorización de código
exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            }
            else {
                next(new Error('No existe quiz: ' + quizId));
            }
        }
    ).catch(function(error){next(error);});
}

// GET /author
exports.author = function(req, res) {
    res.render('author', {author: 'Alberto Díaz Martínez', errors: []});
}

// GET /quizes
exports.index = function(req, res) {
    // Si existe el parámetro search en la query string
    //se hace la búsqueda en la BD.
    if (req.query.search) {
        console.log("buscando: " + req.query.search); 
        models.Quiz.findAll({where: ["pregunta like ?", "%"+req.query.search.replace(" ", "%")+"%"], order: [["pregunta", "ASC"]]}).then(function(quizes) {
            res.render('quizes/index', {quizes: quizes, errors: []});
        }); 
    }
    else {
        models.Quiz.findAll().then(function(quizes) {
            res.render('quizes/index', {quizes: quizes, errors: []});
        }); 
    }
}


// GET /quizes/:id
exports.show = function(req, res) {
    models.Quiz.find(req.params.quizId).then(function(quiz) {
        res.render('quizes/show', {quiz: req.quiz, errors: []});
    }); 
}

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    models.Quiz.find(req.params.quizId).then(function(quiz) {    
        if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
            res.render('quizes/answer', {quiz: req.quiz, respuesta: '¡Correcto!', errors: []});
        }
        else {
            res.render('quizes/answer', {quiz: req.quiz, respuesta: '¡Incorrecto!', errors: []});
        }
    });
}


//GET /quizes/search
exports.search = function(req, res) {
    res.render('quizes/search', {errors: []});
}

//GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build({pregunta:"Pregunta", respuesta: "Respuesta"});
    res.render('quizes/new', {quiz:quiz, errors: []});    
}

//POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    
    
    // En esta version de sequelize el método validate no 
    // devuelve una promesa sino un objeto con los campos
    // que han provacado un error de validación y su mensaje.
    var err = quiz.validate();
    
    if (err) {
        console.log(err);
        
        var errors = [];
        
        if (err.pregunta) {
            errors.push(err.pregunta);
        }
        
        if (err.respuesta) {
            errors.push(err.respuesta);
        }
        
        console.log("errors: " + errors);
        
        res.render("quizes/new", {quiz: quiz, errors: errors});
    }
    else {
        quiz.save().then(function() {
            res.redirect('/quizes');
        });
    }
}
