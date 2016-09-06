function Deck(card){
	this.card = card;
	this.deck = [];
};

Deck.prototype.addCards = function(){
	var self = this;
	var suits=ranks=[]
	var suit, rank;
	
	//arrays with values for suits and ranks
	suits = ['Diamonds', 'Spades', 'Hearts', 'Clubs'];
	ranks = ['2','3','4','5','6','7','8','9','10', 'Jack','Queen','King','Ace'];
	//load deck with cards
 	suits.forEach(function(suit){
		ranks.forEach(function(rank){
			self.card = rank + ' ' + suit;
			self.deck.push(self.card);
		});
	});
	return this;
};

Deck.prototype.deal = function(num_cards) {
	var self = this;
	var hand = [];
	//load hand with cards and remove those cards from the deck
	for (var c=1;c<=num_cards;c++){
		hand.push(self.deck.pop());
	};

	return hand;
};

Deck.prototype.shuffle = function(){
	var self = this;
	var moveCard

	for (var i = 0; i < self.deck.length; i++){
		//this will generate a random number within the length of the deck
		var rand_num = ('shuffle ',parseInt(self.deck.length * Math.random()));
		// get the card with index of rand_num
		moveCard = self.deck[rand_num];
		// remove the card
		self.deck.splice(rand_num, 1);
		//and add it to end of deck
		self.deck.push(moveCard);
    };
    return this;
};

Deck.prototype.reset = function(){
	// this returns deck to original unshuffled order
	var self = this;
	//clear the deck and reload
	self.deck = [];
	self.addCards();
	return this;	
};

function Player(name){
	this.name = name;
	this.hand = [];
};

Player.prototype.draw = function(num_cards){
	var self = this;
	//call the deck deal method to load a hand of cards
	var hand = deck.deal(num_cards);
	if (self.hand.length < 1){
		self.hand = (hand);
		//console.log('first draw:', self.hand)
	} else {
		//console.log('second draw:', hand);
		for (var c=0; c<num_cards;c++){
			self.hand.push(hand[c])
		};
		// console.log ('final hand:',self.hand);
	};
	
	return self;
};

Player.prototype.discard = function(card_index){
	var self = this;
	// remove card with selected index
	self.hand.splice(card_index,1);	
	return this;
};

Player.prototype.showHand = function(){
	var self = this;
	//show all cards in user's hand
	for (var i in self.hand){
		console.log(i, self.hand[i]);
	};
	console.log('\n');
	return this;
};

// instantiate deck
deck = new Deck();
// add cards to deck
deck.addCards();
//shuffle the deck
deck.shuffle();


//instantiate player
Steve = new Player('Steve');
//draw cards
Steve.draw(3).draw(2).showHand().discard(2).draw(1).showHand();

// reset deck to original unshuffled order
deck.reset()
//console.log(deck)


