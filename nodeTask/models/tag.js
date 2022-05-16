module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },          
          post_id: {
            type: DataTypes.JSON
          }
          
    });
    return Tags;
  };