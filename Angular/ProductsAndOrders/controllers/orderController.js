//create controller and attach to module
productModule.controller('orderController', ['$scope', 'productFactory', function ($scope, productFactory){
	
	function getProducts(data){
		$scope.products = data;
		$scope.newProd = {};
	}

	$scope.products = {};
	$scope.newProd = {};

	productFactory.index(getProducts);

	$scope.buyProduct = function(index){
		productFactory.buyProduct(index, getProducts);
	}

}]);