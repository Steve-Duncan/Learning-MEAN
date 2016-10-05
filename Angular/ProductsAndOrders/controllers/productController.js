//create controller and attach to module
productModule.controller('productController', ['$scope', 'productFactory', function ($scope, productFactory){
	
	function getProducts(data){
		$scope.products = data;
		$scope.newProd = {};
	}

	$scope.products = {};
	$scope.newProd = {};

	$scope.index = function(){
		productFactory.index(getProducts);
	}
	
	$scope.createProduct = function(){
		productFactory.create($scope.newProd, getProducts);
	}
	
	$scope.deleteProduct = function(index){
	    $scope.products.splice(index, 1);			 
	}
}]);