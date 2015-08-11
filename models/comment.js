// Definición del modelo de Comments
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "ERROR: Falta Comentario"}}
      },
      publicado: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false
      }
    }    
  );
}