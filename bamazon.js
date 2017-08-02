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
	console.log("\n");
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

var buyItem = function() {
	inquirer.prompt([{
		name: "Item",
		type: 'input',
		message: "Please enter the ID of the product you would like to purchase.",
		validate: function(value) {
			// validates answer
			if (isNaN(value) === false) {
				return true;
				console.log("OK.")
				} else {
					console.log("\nPlease check that only the ID number has been entered and entered correctly.\n");
					return false;
				}
			}
				}, {
		name: 'Qty',
		type: 'input',
		message: '\nPlease enter the quantity of the product you would like to purchase.\n',
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
				console.log("OK.")
				} else {
					console.log("\nPlease check that only the ID number has been entered and entered correctly.\n");
					return false;
				}
			}
		}]).then(function(answer) {
			var ItemInt = parseInt(answer.Qty);
			//Queries the database
			connection.query("SELECT * FROM PRODUCTS WHERE ?", [{item_ID: answer.Item}], function(err, data) {
				if (err) throw err;
			// Checks if sufficient quantity exists 
			if (data[0].stock_qty < ItemInt) {
				console.log("We're sorry, that Item is currently out of stock\n");
				console.log("Please choose another Product\n");
				start();
			} else {

			var updateQty = data[0].stock_qty - ItemInt;
			var totalPrice = data[0].price * ItemInt;
			connection.query('UPDATE products SET stock_qty = ? WHERE item_ID = ?', [updateQty, answer.Item], function(err, results) {
			if (err) {
				throw err;
			} else {
				console.log("Purchase successful!\n");
				console.log("Your total cost is: $ " + totalPrice);

			inquirer.prompt({
				name: "continueShop",
				type: "confirm",
				message: "Would you like to continue shopping?",
			}).then(function(answer) {
				if (answer.continueShop === true) {
					console.log("Ok, let's continue.");
					start();
				} else {
					console.log("OK. Thanks, come again soon!");
					connection.end();
				}
			});
			}
			});
			}
			});
		});
		};




// add product 

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