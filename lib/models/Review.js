import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Review extends Sequelize.Model { }

Review.init(
  {
    rating: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    reviewer: {
      type: Sequelize.DataTypes.INTEGER,
      // allowNull: false
    },
    review: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    film: {
      type: Sequelize.DataTypes.INTEGER,
      // allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Review',
    underscored: true
  }
);

export default Review;
