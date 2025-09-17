class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  // Make current tail point to new node we are addding
  // Make new node the new tail
  // Increment the length of the list
  append(newNode) {
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  // make new node point to the current head
  // update the head to be new nodeg
  // increment the length of the list
  prepend(newNode) {
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  // Traverse the list up until the element at the index
  traverseToIndex(index) {
    let currentNode = this.head;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  // Traverse the list up until the element right before the one at the index
  // make the new node point to the node at the index
  // make the node at the index-1 point to the new node
  // increment the length of the list
  // return the list
  insert(index, newNode) {
    if (index === 0) {
      this.prepend(newNode);
      return this;
    }

    if (index === this.length) {
      this.append(newNode);
      return this;
    }

    let currentNode = this.traverseToIndex(index - 1);

    newNode.next = currentNode.next;
    currentNode.next = newNode;
    this.length++;
    return this;
  }
}