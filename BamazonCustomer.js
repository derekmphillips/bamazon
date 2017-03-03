var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: process.argv[2], 
    database: "Bamazon"
})

connection.connect(function(err) {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);
	InvSearch()
})

var InvSearch = function() {
        var query = 'SELECT * FROM products';
        connection.query(query, function(err, res) {
        	console.log(' Available Products')
            console.log('***********************************')
            for (var i = 0; i < res.length; i++) {
                console.log("Item ID:  " + res[i].ItemID + " || Product Name: " + res[i].ProductName + " || Department: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || Quanity: " + res[i].StockQuantity);
            }
        })
        selectItem();
};

var selectItem = function() {
		
	inquirer.prompt([{
		name: 'id',
		type: 'input',
		message: 'Please Select ID of the item you would like to by?',
		validate: function(value) {
			if (isNaN(value) == false) {
				return true;

			} else {
				console.log('\nAdd a valid ID number.\n');
				return false;
			} 
		} 
	}, {
		name: 'total',
		type: 'input',
		message: 'How many would you like to buy?',
		validate: function(value) {	
			if (isNaN(value) == false) {				
				return true;
			} else {		
				console.log('\nPlease supply total\n');
				return false;
			} 
		} 
		
	}]).then(function(answer) {			
			console.log(answer);
			IntItem = parseInt(answer.total);
			console.log(IntItem);
			connection.query("SELECT * FROM Products WHERE ?", [{ItemID: answer.id}], function(err, data) { 
				if (err) throw err;
				if (data[0].StockQuantity < IntItem) {
				console.log("Sorry, the quanity selected is currently not availible, please make another selection");
				InvSearch()
				}	
				else {
					var newQuantity = data[0].StockQuantity - IntItem;
					var totalPrice = data[0].Price * IntItem;
					connection.query('UPDATE products SET StockQuantity = ? WHERE ItemID = ?', [newQuantity, answer.id], function(err, results) {
						if (err) throw err;
						else {
							console.log("Congrats on your purchase! Your total cost is $"+ totalPrice);
							redo();
						}
					})	
				}
			})
		})
	  
}; 

var redo = function() {
	inquirer.prompt({
        type: "confirm",
        message: "Would you like to make another purchase?",
        name: "confirm",
        default: true
    
		}).then(function(answer) {
			if (answer.confirm)
			{
				InvSearch();
			}
			else {
				console.log("Please come back again!")
			}
		}) 	
}



