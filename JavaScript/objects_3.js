function Vehicle(type){
	this.type=type;
	//call function to create vehicle; this was the only way I found to list multiple attributes
	//in a single prototype function. However, my concern is this defeats the purpose of prototype
	//for creating a single instance prototype function to be shared by multiple instances. Will
	//doing it this way in fact create a new prototype function for each instance of vehicle?
	this.createVehicle();
};

Vehicle.prototype.createVehicle = function(){

	this.miles=0;
	//add attributes based on vehicle type
	if (this.type=='bike'){
		this.wheels = 2;
		this.speed=5;
		this.noise='Ring Ring!';
	}else if(this.type=='sedan'){
		this.wheels = 4;
		this.speed=65;
		this.noise='Honk Honk!';
	} else if(this.type=='bus'){
		this.wheels = 6;
		this.speed=55;
		this.noise='All aboard!';
	};
	//create vin number
	this.vin = Math.floor(Math.random() * 10000000000);

	return this;
};

//add some functions
Vehicle.prototype.move=function(){
	//calculate distance travelled
	this.miles += this.speed;
 	return this;
};

Vehicle.prototype.makeNoise = function(){
	console.log(this.noise);
};

Vehicle.prototype.checkMiles = function(){
	console.log(this.miles);
};

Vehicle.prototype.showInfo = function(){
	console.log('\nNew vehicle!')
	console.log ('Type: ' + this.type + '\nNumber of wheels:',this.wheels,
	'\nNoise: ' + this.noise + '\nSpeed:', this.speed, '\nVIN# ',this.vin);

	return this;
};

Vehicle.prototype.testDrive = function(){
	console.log('\nTest drive!')
	console.log('Starting miles: ',this.miles);
	this.makeNoise();
	this.move();
	console.log('After move: ',this.miles);
};

//instantiate a vehicle
car = new Vehicle('sedan');
//describe vehicle
car.showInfo();
//take a test drive
car.testDrive();

//instantiate a vehicle
bike = new Vehicle('bike');
//describe vehicle
bike.showInfo();
//take a test drive
bike.testDrive();

//instantiate a vehicle
bus = new Vehicle('bus');
//describe vehicle
bus.showInfo();
//take a test drive
bus.testDrive();





















