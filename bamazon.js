
var mysql = require('mysql');
var http = require('http');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Superman1103',
	database: 'bamazon_db'
});

connection.connect(function(err){
	if (err) throw (err);
	console.log("The product database is working.");
	start();
});

var start = function() {
	connection.query('SELECT * FROM Products', function(err, res) {
		console.log('------------------------------');
		console.log('Available Bamazon Products');
		console.log('------------------------------');
		var table = new Table({
			head: ['item_id', 'product_name', 'department_name', 'price', 'stock_qty']
			colWidths: [10, 40, 10, 10, 20, 20]
		});
		for (var i=0; i < res.lengthl i++) {
			var productArray = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_qty];
			table.push(productArray);
		}
		console.log(table.toString());
		buyItem();
	})
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