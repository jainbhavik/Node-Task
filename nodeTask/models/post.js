module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },          
          fields:{
            type: DataTypes.STRING
          }, 
          title: {
            type: DataTypes.STRING
          }, 
          desc: {
            type: DataTypes.STRING
          }, 
          image: {
            type: DataTypes.STRING
          }
          
    });
    return Post;
  };