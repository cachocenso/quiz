var models = require('../models/models.js');


//GET /quizes/new
exports.new = function(req, res) {
    res.render('comments/new', {quizid:req.params.quizId, errors: []});    
}


//POST /quizes/create
exports.create = function(req, res) {
    var comment = models.Comment.build(
        {texto: req.body.comment.texto,
         QuizId: req.params.quizId});
    
    console.log(JSON.stringify(comment));
    
    // En esta version de sequelize el método validate no 
    // devuelve una promesa sino un objeto con los campos
    // que han provacado un error de validación y su mensaje.
    var err = comment.validate();
    
    if (err) {
        console.log(err);
        
        var errors = [];
        
        if (err.texto) {
            errors.push(err.texto);
        }
        
        console.log("errors: " + errors);
        
        res.render("comments/new", {comment: comment, quizId: req.params.quizId, errors: errors});
    }
    else {
        comment.save().then(function() {
            console.log(">>>>>>>>>>>> COMENTARIO SALVADO <<<<<<<<<<<<<<<<<");
            res.redirect('/quizes/' + req.params.quizId);
        });
    }
}

// PUT /quizes/:quizId
exports.update = function(req, res) {
    console.log(">>>>>>>>>>>>>>>>>> UPDATE <<<<<<<<<<<<<<<<<<<<<<<");
    console.log(">>>>>>>>>>>>>>>>>> " + JSON.stringify(req.quiz) + " <<<<<<<<<<<<<<<<<<<<<<<");
    console.log(">>>>>>>>>>>>>>>>>> " + JSON.stringify(req.body.quiz) + " <<<<<<<<<<<<<<<<<<<<<<<");
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;
    
    var err = req.quiz.validate();
    
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
        
        res.render("quizes/edit", {quiz: req.quiz, errors: errors});
    }
    else {
        req.quiz.save().then(function() {
            res.redirect('/quizes');
        });
    }

}


// DELETE /quizes/:quizId
exports.delete = function(req, res) {
    req.quiz.destroy().then(function() {
        res.redirect('/quizes');
    }).catch(function(er) {
        next(err);
    });
}