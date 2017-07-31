var colors = require('colors');
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Superman1103',
	database: 'bamazon_db'
});

connection.connect(function(err){
	if (err) throw (err);
	console.log("Welcome to the Bamazon Marketplace.".bgCyan);
	start();
});

var start = function() {
	connection.query('SELECT * FROM Products', function(err, res) {
		console.log('------------------------------');
		console.log('Available Bamazon Products'.bgYellow);
		console.log('------------------------------');
		var table = new Table({
			head: ['item_id'.white, 'product_name'.white, 'department_name'.white, 'price'.white, 'stock_qty'.white],
			colWidths: [5, 20, 15, 15, 5, 5]
		});
		for (var i=0; i < res.length; i++) {
			var productArray = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_qty];
			table.push(productArray);
		}
		console.log(table.toString());
		buyItem();
	});
}

/*
function createProduct() {
	var query = connection.query(
		'insert into products set ?',
		{
			product_name: 'shake weight'
			department_name: 'fitness',
			price: '19.99',
			stock_qty: 999
		},
		function(err, res) {
			console.log(res.affectedRows + ' product inserted');
		}
}
*/