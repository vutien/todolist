var data = require('./demo.js').data;
var Sequelize = require('sequelize');
var database = new Sequelize('todo','postgres','123456',{host:'localhost', dialect: 'postgres', port: 5432});
var Todo = database.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    'completed': {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
});
Todo.sync({force: true}).then(function(){
    return data.forEach((function(item){
        Todo.create({
            title: item
        });
    }))
    
});
module.exports = Todo;