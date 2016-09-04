
function addNums(x,y){
	var sum=0;
	for (var i=x; i<=y; i++)
		sum+=i;
	console.log(sum);
	return sum
}; //end addNums

//call function
addNums(1,3);

/////////////////////////////////

function findMin(arr){
	var min = arr[0];
	for(i=0;i<arr.length;i++){
		if (arr[i] <= min){
			min=arr[i];
		}
	}	
	return min;		
}; //end findMin

//call function
var arr=[1,2,3,4,-4,5];
console.log(findMin(arr));
/////////////////////////////////

function findAve(arr){
	var tot=0, ave=0;
	for(i=0;i<arr.length;i++){
		tot=tot+arr[i];
	}
	ave=tot/arr.length;
	return ave
}; //end find Ave

//call function
var arr=[2,4,6];
console.log(findAve(arr));
/////////////////////////////////

/////////////////////////////////

var add = function addNums(x,y){
	var sum=0;
	for (var i=x; i<=y; i++)
		sum+=i;
	return sum
};

console.log(add(1,3));

/////////////////////////////////

var min = function findMin(arr){
	var min = arr[0];
	for(i=0;i<arr.length;i++){
		if (arr[i] <= min){
			min=arr[i];
		}
	}	
	return min;		
};
var arr=[1,2,3,4,-4,5];
console.log(min(arr));

/////////////////////////////////

var ave = function findAve(arr){
	var tot=0, ave=0;
	for(i=0;i<arr.length;i++){
		tot=tot+arr[i];
	}
	ave=tot/arr.length;
	return ave
};
var arr=[2,4,6];
console.log(ave(arr));

/////////////////////////////////
/////////////////////////////////

var person = {
	name : 'Steve',
	distance_travelled : 0,

	say_name : function(){return this.name;},
	say_something : function(param){return this.name + ' says ' + param},
	walk : function(){
		this.distance_travelled += 3;
		return this.name + ' is walking ' + this.distance_travelled;
	},
	run : function(){
		this.distance_travelled += 10;
		return this.name + ' is running ' + this.distance_travelled;
	},
	crawl : function(){
		this.distance_travelled += 1;
		return this.name + ' is crawling ' + this.distance_travelled;
	}
};

console.log(person.say_name());
console.log(person.say_something('I am cool'));
console.log(person.walk());
console.log(person.run());
console.log(person.crawl());