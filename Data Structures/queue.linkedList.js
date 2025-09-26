class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class Queue {
	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

	// See the first node of the queue
	peek() {
		return this.first;
	}

	// Add a new node to the end of the queue
	enqueue(value) {
		const newNode = new Node(value);

		if (this.length === 0) {
			this.first = newNode;
			this.last = newNode;
		} else {
			this.last.next = newNode;
			this.last = newNode;
		}

		this.length++;

		return this;
	}

	// Remove the first node from the queue
	dequeue() {
		if (this.length === 0) {
			return null;
		}

		const removedNode = this.first;
		const newFirst = this.first.next;
		this.first.next = null;
		this.first = newFirst;

		this.length--;

		if (this.length === 0) {
			this.last = null;
		}

		return removedNode;
	}

	// Check if the queue is empty
	isEmpty() {
		return this.length === 0;
	}
}