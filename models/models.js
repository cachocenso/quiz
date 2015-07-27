var path = require('path');


// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD Sequelize
var sequelize = new Sequelize(null, null, null,
                              {dialect: "sqlite", storage: "quiz.sqlite"});

//Importar la definición de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));   

// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// Creación e inicialización de la tabla de preguntas
sequelize.sync().success(function() {
    Quiz.count().success(function(count) {
        if (count == 0) {
            Quiz.create({pregunta: 'Capital de Italia',
                         respuesta: 'Roma'
                        }).success(function(){console.log('BD Creada');});
        }
    });
});
