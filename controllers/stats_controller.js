var models = require('../models/models.js');


// GET quizes/statistics
exports.index = function(req, res) {
    
    res.locals.stats = {};
    // Número de preguntas
    models.Quiz.count().then(function(preguntas) {
        console.log('##### HAY: ' + preguntas + ' preguntas');
        var stats = {preguntas: preguntas};
        
        // Número de comentarios
        models.Comment.count({where: {publicado: true}}).then(function(comentarios) {
            console.log('##### HAY: ' + comentarios + ' comentarios');
            stats.comentarios = comentarios;
        
            res.render('stats/index',{stats: stats, errors: []});
        });

    });

};