
function runningLogger(){
	console.log('I am running!')
}; //end runningLogger
runningLogger();

///////////////////////////////////////////

function multiplyByTen(param){
	var sum=param*10;
	return sum
}; //end multiplyByTen
console.log(multiplyByTen(5));

///////////////////////////////////////////

function stringReturnOne(){
	return "Hard coded string one";
};

///////////////////////////////////////////

function stringReturnTwo(){
	return "Hard coded string two";
}; //end stringReturnOne
console.log(stringReturnOne());
console.log(stringReturnTwo());

///////////////////////////////////////////

function caller(param){
	if (typeof(param)=='function'){
		return stringReturnTwo();
	};
}; //end caller
var func=stringReturnTwo;
console.log('Invoke function:',caller(func));

///////////////////////////////////////////

function myDoubleConsoleLog(paramOne,paramTwo){
	for (var i in arguments){
		if(typeof(arguments[i]=='function')){
			console.log(arguments[i]());
		}	
	}	
}; //end myDoubleConsoleLog
myDoubleConsoleLog(stringReturnOne,stringReturnTwo);

///////////////////////////////////////////

function caller2(param){
	console.log('starting');
	setTimeout(function(){
		if(typeof(param=='function')){};	
	}, 2000);
	console.log('invoke param function');
	console.log('ending?');
	return 'interesting';
}; //end caller2

console.log(caller2(myDoubleConsoleLog(stringReturnOne,stringReturnTwo)))