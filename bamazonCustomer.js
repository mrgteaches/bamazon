var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Jikodikipe8!",
    database: "bamazonDB"
});
  
// connect to MySQL database
  connection.connect(function(err) {
    if (err) throw err;
    buyProduct();
  });

 

    function buyProduct() {
      // query the database for all items 
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        else {
          for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id + " || Product Name: " + results[i].product_name + " || Price: " + results[i].price + " || Quantity Available: " + results[i].stock_quantity);
          }
    }
        inquirer
        .prompt([
        {
          name: "productID",
          type: "input",       
          message: "What is the item ID of the item you'd like to buy?"
        },
        {
          name: "units",
          type: "input",
          message: "How many units of this item would you like to buy?"
        }
      ])
          
          .then(function(answer) {
            // get the information of the chosen item
            
            for (var i = 0; i < results.length; i++) {
              if (results[i].item_id === parseInt(answer.productID)) {   
                var chosenItem = results[i];
              }
            }
            // determine if quantity is high enough
            if (chosenItem.stock_quantity >= parseInt(answer.units)) {
              // there is enough; reduce the stock in database and provide customer's total
              var newQuantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.units);
              var totalPrice = parseFloat(chosenItem.price) * parseInt(answer.units);   
              //var grandTotal = []; //
              
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newQuantity
                  },
                  {
                    item_id: chosenItem.item_id
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Order placed successfully! Your total for this item is $" + totalPrice + ".\n");   
                  //grandTotal.push(parseInt(totalPrice)); //
                  askAgain();             
                }
              );
            }
            else {              
              console.log("Insufficient quantity; please try again!");   
              askAgain();           
            }
          });
      });
    }
    
    function askAgain(){
      inquirer.prompt([{
        name: "again",
        type: "confirm",
        message: "Would you like to purchase another item?"
      }])
        .then(function(answer){
        if(answer.again){
          buyProduct();
        } else{
          // add for loop
          // var finalTotal =0;
          // for (var i = 0; i < grandTotal.length; i++) {
          //   finalTotal = finalTotal += grandTotal[i];
          // }
          console.log("Thank You!");
          //console.log("Your final total is: $" + finalTotal);
        }
      });
    }

   
    


   