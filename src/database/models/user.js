module.exports = (sequelize, DataTypes) => {

  /**
    * @param {import('sequelize').DataTypes} DataTypes
    * @param {import('sequelize').Sequelize } Sequelize
    * @returns
    */

  const User = sequelize.define("User", {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'Users'
  });

  return User;
};