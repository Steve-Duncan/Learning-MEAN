//create factory and attach to module
productModule.factory('productFactory',['$http', function($http){
	var factory = {};
	var products = [];

	factory.index = function(callback){
		callback(products);
	}

	factory.getProducts = function(callback){
		callback(products);
	}

	factory.create = function(newProd, callback){
		newProd.available = 50;
		products.push(newProd);
		callback(products);
	}

	factory.buyProduct = function(index, callback){
		if (products[index].available > 0){
			products[index].available -= 1;
		}
		callback(products);
	}
	return factory;
}]);
