function VehicleConstructor(name,wheels,passengers){
	var vehicle={};

	vehicle.name=name;
	vehicle.wheels=wheels;
	vehicle.passengers=passengers;
	vehicle.noise='generic sound';
	vehicle.makeNoise = function(){
		console.log(vehicle.name + vehicle.noise);
	}
	return vehicle;
}

var bike=VehicleConstructor('bike',2,1);
bike.makeNoise = function(){
	console.log ('ring ring!');
}
bike.makeNoise();


var sedan=VehicleConstructor('sedan',4,5);
sedan.makeNoise = function(){
	console.log ('Honk Honk!');
}
sedan.makeNoise();

var bus=VehicleConstructor('bus',6,0);
bus.makeNoise = function(){
	console.log ('All Aboard!');
}
bus.pickup = function(passengers){
	var total;
	bus.passengers += passengers;
}

bus.makeNoise();
console.log(bus.passengers);
bus.pickup(3);
console.log(bus.passengers);
bus.pickup(5);
console.log(bus.passengers);