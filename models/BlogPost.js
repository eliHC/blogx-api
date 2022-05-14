module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
       { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};
