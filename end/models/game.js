'use strict';
const {
  Model
} = require('sequelize');
const { formattedDate } = require('../helpers/formatter');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasOne(models.Manager, { foreignKey: "GameId" })
      Game.hasMany(models.Event, { foreignKey: "GameId" })
    }

    get formatDate() {
      return formattedDate(this.releaseDate)
    }

  }
  Game.init({
    name: DataTypes.STRING,
    gameImg: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    developer: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};