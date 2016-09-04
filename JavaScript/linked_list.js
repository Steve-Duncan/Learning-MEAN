function LinkedList(){

	var Node = function(element){
		this.element = element;
		this.next = null;
	};

	var length = 0;
	var head = null;

	this.append = function(element){
		var node = new Node(element), current;
		if (!this.head) {
			// this is initial element
			//set the list head to the first element added; next is null by default
			this.head = node;

		} else {
			//there is already a head element, so set that to current
			current = this.head;
			//while the current element has a next...
			while(current.next){
				//set the current element to the next element
				current=current.next
			}
			//set the current element next value to the node being added
			current.next = node;
		}
		
		length++;
	};

	this.insert = function(element){};
	this.remove = function(element){};

	this.print = function(){
		var current = this.head
		var list_to_print = '[ '
		while(current){

			if(current.next){
				console.log(current.element, current.next.element)
				list_to_print += current.element + ':' + current.next.element + '; '
			} else {
				console.log(current.element, current.next)
				list_to_print += current.element + ':' + current.next + ' ]'
			}
			current=current.next;
		}
		
		console.log(list_to_print)
	};
	this.size = function(element){};
};

var list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.print();

