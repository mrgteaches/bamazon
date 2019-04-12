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
    start();
  });

  function start(){
    inquirer.prompt([{
      type: "list",
      name: "whatDo",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
    }]).then(function(ans){
       switch(ans.whatDo){
        case "View Products for Sale": viewProducts();
        break;
        case "View Low Inventory": viewLowInventory();
        break;
        case "Add to Inventory": addToInventory();
        break;
        case "Add New Product": addNewProduct();
        break;
        case "End Session": console.log('Goodbye!');
      }
    });
  }

  //views all inventory
  function viewProducts(){
    console.log("-----All Inventory-----");
    connection.query('SELECT * FROM products', function(err, res){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------');
  
    for(var i = 0; i<res.length;i++){
      console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || " + "Department: " + res[i].department_name + " || " + "Price: " + res[i].price + " || " + "QTY: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------');
    }  
    start();
    });
  }

  //views inventory lower than 5
  function viewLowInventory(){
    console.log('-----Low Inventory-----');
  
    connection.query('SELECT * FROM products', function(err, res){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<res.length; i++) {
      if(res[i].stock_quantity <= 5) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------');
      }
    }  
    start();
    });
  }

  //displays prompt to add more of an item to the store and asks how much
  function addToInventory(){
    console.log('-----Adding to Inventory-----');
  
    connection.query('SELECT * FROM products', function(err, res){
    if(err) throw err;
    var itemArray = [];
    //pushes each item into an itemArray
    for(var i=0; i<res.length; i++){
      itemArray.push(res[i].product_name);
    }
  
    inquirer.prompt([{
      type: "list",
      name: "product",
      choices: itemArray,
      message: "Which item would you like to add inventory?"
    }, {
      type: "input",
      name: "qty",
      message: "How much would you like to add?",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
      }]).then(function(ans){
        var currentQty;
        for(var i=0; i<res.length; i++){
          if(res[i].product_name === ans.product){
            currentQty = res[i].stock_quantity;
          }
        }
        connection.query('UPDATE Products SET ? WHERE ?', [
          {stock_quantity: currentQty + parseInt(ans.qty)},
          {product_name: ans.product}
          ], function(err, res){
            if(err) throw err;
            console.log('Quantity was updated.');
            start();
          });
        })
    });
  }
  
  //allows manager to add a completely new product to store
  function addNewProduct(){
    console.log('-----Adding New Product-----');
  
    //grab name of departments
    connection.query('SELECT * FROM products', function(err, res){
      if(err) throw err;
    //   for(var i = 0; i<res.length; i++){
    //     deptNames.push(res[i].department_name);
    //   }
    })
  
    inquirer.prompt([{
      type: "input",
      name: "id",
      message: "Item ID: ",
      validate: function(value){
        if(value){return true;}
        else{return false;}
      }
    },  {
      type: "input",
      name: "product",
      message: "Product: ",
      validate: function(value){
        if(value){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "department",
      message: "Department: ",
      validate: function(value){
        if(value){return true;}
        else{return false;}
      }

    }, {
      type: "input",
      name: "price",
      message: "Price: ",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "quantity",
      message: "Quantity: ",
      validate: function(value){
        if(isNaN(value) == false){return true;}
        else{return false;}
      }
    }]).then(function(ans){
      connection.query('INSERT INTO products SET ?',{
        item_id: ans.id,  
        product_name: ans.product,
        department_name: ans.department,
        price: ans.price,
        stock_quantity: ans.quantity
      }, function(err, res){
        if(err) throw err;
        console.log('Another item was added to the store.');
        start();
      })
    //   start();
    });
  }
  
//    start();