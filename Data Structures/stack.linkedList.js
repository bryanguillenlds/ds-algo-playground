class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  // See the very top node of the stack
  peek() {
    if (this.length === 0) {
      return null;
    }

    return this.top;
  }

  // Add a new node to the top of the stack
  push(value) {
    const newNode = new Node(value);

    // If the stack is empty, set the top and bottom to the new node
    if (this.length === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      // If the stack is not empty, set the top to the new node and the new node's next to the old top
      // this is why we need to store the reference to the old top before updating the top
      const oldTop = this.top;
      this.top = newNode;
      this.top.next = oldTop;
    }

    this.length++;
    return this;
  }

  // Remove the top node from the stack
  pop() {
    if (this.length === 0) {
      return null;
    }

    // Store the top node to be removed
    // Make the top point to the next node (the node that was previously the top)
    // Set the next of the old top to null (garbage collector will remove the old top)
    const topToBeRemoved = this.top;
    this.top = this.top.next;
    topToBeRemoved.next = null;
    this.length--;

    if (this.length === 0) {
      this.bottom = null;
    }

    return topToBeRemoved;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.length === 0;
  }
}