const Sequelize = require('sequelize');
const sequelize = require('../config/connectDB');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createDate: {
        type: Sequelize.DATE,
        allowNull: false
    }
},
{timestamps: false}
);

module.exports = Post;