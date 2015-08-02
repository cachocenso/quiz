// Definición del modelo de quiz
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz', {pregunta: {
                                                type: DataTypes.STRING,
                                                validate:{ 
                                                    notEmpty:{ 
                                                        msg: "ERROR: La pregunta es obligatoria"
                                                    }
                                                }
                                               },
                                     respuesta : {
                                                    type: DataTypes.STRING,
                                                    validate:{ 
                                                        notEmpty: {
                                                            msg: "ERROR: La respuestaes obligatoria"
                                                        }
                                                    }
                                                },
                                     tema: {
                                         type: DataTypes.STRING,
                                         defaultValue: 'otro'
                                     }
                                    });
}
