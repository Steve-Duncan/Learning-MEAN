var _ = {
	map: function(arr, func) {    
		//map creates new array, determined by passed function
		var arr_new = [];
		for (var i=0; i < arr.length; i++){
			
			arr_new.push(func(arr[i]));
		};
		return arr_new;
	},

	reduce: function(arr, func) {
		//reduce list of values down to single value
		var done = 0;
		for (var i=0; i < arr.length; i++){
			done += func(arr[i])
		};
		return done;
	},

	find: function(arr, find, num) {
		//check list for presence of given value
		var found
		for(var i=0;i<arr.length;i++){
			if (arr[i]==num){
				found = true;
				break;
			} else {
				found = false;
			};
		};
		return found;
	},

	filter: function(arr, func) { 
		//return list of values that meet given criteria
		var arr_new=[];
		for(var i=0;i<arr.length;i++){
			if (func(arr[i])){
				arr_new.push(arr[i]);
			};			
		};
		return arr_new;
	},

	reject: function(arr, func) {
		//return list of values that fail to meet given 
				var arr_new=[];
		for(var i=0;i<arr.length;i++){
			if (!func(arr[i])){
				arr_new.push(arr[i]);
			};			
		};
		return arr_new;
	}
};

var list = [1, 2, 3];
//try map function
var func = function map(val){return val + ' little piggy'}
console.log (_.map(list,func));

//try reduce function
var func = function reduce(num){return num}
console.log (_.reduce(list,func));

//try find function
num=2
var func = function find(num){return num}
console.log (_.find(list,func,num));

//try filter function
var func = function filter(num){return num >=2}
console.log (_.filter(list,func));

//try reject function
var func = function reject(num){return num >=2}
console.log (_.reject(list,func));

