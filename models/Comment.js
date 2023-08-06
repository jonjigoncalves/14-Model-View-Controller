const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const Blog = require('./Blog')
const User = require('./User')




class Comment extends Model { }

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
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
  blog_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Blog,
      key: 'id'
    }
  },
}, {
  sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});



module.exports = Comment;