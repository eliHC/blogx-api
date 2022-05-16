module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  return User;
};
// desabilitar updatedAt e createdAt
// https://stackoverflow.com/questions/39587767/disable-updatedat-update-date-field-in-sequelize-js

// validação de e-mail
// https://stackoverflow.com/questions/44559079/sequelize-js-orm-unique-email-validation-for-mysql-not-working
