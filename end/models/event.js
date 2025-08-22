'use strict';
const {
  Model
} = require('sequelize');
const { formattedDate, formatIDR } = require('../helpers/formatter');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Game, { foreignKey: "GameId" })
    }

    get formatDate() {
      return formattedDate(this.eventDate)
    }

    get formatPrize() {
      return formatIDR(this.totalPrize)
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name required"
        },
        notNull: {
          msg: "Name required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description required"
        },
        notNull: {
          msg: "Description required"
        }
      }
    },
    totalPrize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Total prize required"
        },
        notNull: {
          msg: "Total prize required"
        },
        min: {
          args: 1_000_000,
          msg: "Min total prize is 1.000.000"
        }
      }
    },
    eventPoster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event poster required"
        },
        notNull: {
          msg: "Event poster required"
        }
      }
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event date required"
        },
        notNull: {
          msg: "Event date required"
        },
        // custom validation
        minDate(date) {
          if (new Date(date) < new Date()) {
            throw new Error('Min date is today');
          }
        }
      }
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event type required"
        },
        notNull: {
          msg: "Event type required"
        }
      }
    },
    eventStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event status required"
        },
        notNull: {
          msg: "Event status required"
        }
      }
    },
    GameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Game required"
        },
        notNull: {
          msg: "Game required"
        }
      }
    }
  }, {
    sequelize,
    // model wide custom validation, for 2 or more column custom validation
    validate: {
      checkStatus() {
        if (this.eventType === 'OFFLINE' && this.eventStatus === 'INACTIVE') {
          throw new Error("Offline event must be active")
        }
      }
    },
    modelName: 'Event',
  });

  // hooks direct method
  Event.beforeCreate((event) => {
    event.name = event.name.toUpperCase()
  })

  return Event;
};