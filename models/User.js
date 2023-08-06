const db = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
// bcrupt to hash the password
const { hash, compare } = require("bcrypt");
const Blog =require('./Blog')


class User extends Model {
  
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  }
}, {
  sequelize: db,
  modelName: "user",
  hooks: {
    async beforeCreate(user) {
      const hashPassword = await hash(user.password, 10);
      user.password = hashPassword;
    },
  },
}
);

User.prototype.validatePass = async function (formPassword) {
const isValid = await compare(formPassword, this.password);

return isValid;
};

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = User;