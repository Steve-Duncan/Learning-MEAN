function Vehicle(type,wheels,passengers,speed){

	if (!(this instanceof Vehicle)) {
		// the constructor was called without "new".
		return new Vehicle(type);
	}

	//private variables
	var distance_travelled=0;

	//private methods
	var updateDistanceTravelled = function(speed){
		distance_travelled += speed;
	}

	//public variables
	this.type=type;
	this.wheels=wheels;
	this.speed=speed;
	this.passengers=passengers;
	//set noise based on vehicle type
	switch(this.type){
		case 'bike':
			this.noise='Ring Ring!';
			break;
		case 'sedan':
			this.noise='Honk Honk!';
			break;
		case 'bus':
			this.noise='All Aboard!';
			break;
		default:
			this.noise='Whoosh!'
	}
	

	//public methods
	this.makeNoise = function(){
		console.log(this.type + ' ' + this.noise);
	}
	this.move = function(speed){
		//call private function to update private variable
		updateDistanceTravelled(speed);
		//call public function
		this.makeNoise();
	}
	this.checkMiles = function(){
		//check private variable for distance travelled
		console.log('Distance travelled: ' + distance_travelled);
	}	
}

//instantiate a bike
var bike=new Vehicle('bike',2,1,10);
//ride the bike
bike.makeNoise();
bike.move(5);
bike.move(10);
bike.checkMiles();

//instantiate a car
var jeep=new Vehicle('sedan',4,5);
//drive the car
jeep.makeNoise();

//instantiate a bus
var bus=new Vehicle('bus',6,0);
//add function to bus
bus.pickup = function(passengers){
	var total;
	bus.passengers += passengers;
}

//drive the bus and pick up passengers
bus.makeNoise();
console.log('Number of passengers: ' + bus.passengers);
bus.pickup(3);
console.log('Number of passengers: ' + bus.passengers);
bus.pickup(5);
console.log('Number of passengers: ' + bus.passengers);