var express = require('express');
var router = express.Router();
var Todo = require('../models/todo.js');
/* GET home page. */
router.get('/', function (req, res, next) {

	Todo.findAll({order: 'id'}).then(function (results) {
		res.render('index', { data: results });
	})

});
router.post('/', function (req, res) {

	var newTodo = req.body.todo;
	// if (newTodo == "") {
	// 	return res.redirect('/');
	// }
	Todo.create({ title: newTodo }).then(function () {
		res.redirect('/');
	}).catch(function(error){
		console.log(error.stack);
		res.redirect('/');
	});
});

router.get('/done/:id', function(req, res){
	Todo.update({completed: true}, {where: {
		id: req.params.id
	}}).then(function(){
		res.redirect('/');
	});
});
router.get('/delete/:id', function(req, res){
	Todo.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(){
		res.redirect('/');
	});
});
module.exports = router;
