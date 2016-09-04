function Person(name){
	this.name = name;
	this.distance_travelled = 0,

	this.say_name = function(){return this.name;},
	this.say_something = function(param){return this.name + ' says ' + param},
	this.walk = function(){
		this.distance_travelled += 3;
		return this.name + ' is walking ' + this.distance_travelled;
	},
	this.run = function(){
		this.distance_travelled += 10;
		return this.name + ' is running ' + this.distance_travelled;
	},
	this.crawl = function(){
		this.distance_travelled += 1;
		return this.name + ' is crawling ' + this.distance_travelled;
	}
}; //end Person

var newbie = new Person('Steve');
console.log(newbie.name, newbie.distance_travelled);
newbie.run();
console.log(newbie.name, newbie.distance_travelled);

////////////////////////////////////////////////////////
function Ninja(name, cohort, belt_level){
	this.name = name;
	this.cohort = cohort;
	this.belt_level = 'yellow belt';

	this.level_up = function(){
		if (this.belt_level == 'yellow belt'){
			this.belt_level = 'red belt';
		} else if (this.belt_level == 'red belt'){
			this.belt_level = 'black belt';
		};	
	};
}; //end Ninja

var ninja = new Ninja('Steve', '2016 online');
console.log(ninja.name, ninja.cohort, ninja.belt_level)
ninja.level_up();
console.log(ninja.name, ninja.cohort, ninja.belt_level)
ninja.level_up();
console.log(ninja.name, ninja.cohort, ninja.belt_level)
