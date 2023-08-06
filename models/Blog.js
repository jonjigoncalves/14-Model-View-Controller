const { Model, DataTypes } = require('sequelize');
const db  = require('../config/connection');
const User = require('./User')
// bring in the user model so that we can create the association


class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  
  },
}, {
  sequelize: db,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Blog',
});

module.exports = Blog;
