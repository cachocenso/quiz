// Definición del modelo de Comments
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comment', {texto: {
                                                type: DataTypes.STRING,
                                                validate:{ 
                                                    notEmpty:{ 
                                                        msg: "ERROR: El comentario es obligatorio"
                                                    }
                                                }
                                               }
                                    });
}
