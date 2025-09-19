class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  // Make current tail point to new node we are appending
  // Make new node.prev point to the soon to be OLD tail
  // Make new node the new tail
  // Increment the length of the list
  append(newNode) {
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  // make new node.next point to the current head
  // make current head.prev point to the new node
  // update the head to be new node
  // increment the length of the list
  prepend(newNode) {
    newNode.next = this.head;
    this.head.prev = newNode;
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

    let previousNode = this.traverseToIndex(index - 1);

    newNode.next = previousNode.next;
    previousNode.next.prev = newNode;
    previousNode.next = newNode;
    newNode.prev = previousNode;
    this.length++;
    return this;
  }

  remove(index) {
    if (index === 0) {
      const nodeToRemove = this.head;
      this.head = this.head.next;
      nodeToRemove.next = null;
      this.head.prev = null;
      nodeToRemove.value = null;
      this.length--;
      return this;
    }

    if (index === this.length - 1) {
      const nodeToRemove = this.tail;
      const previousNode = this.traverseToIndex(index - 1);
      previousNode.next = null;
      this.tail.prev = null;
      this.tail = previousNode;
      nodeToRemove.next = null;
      nodeToRemove.value = null;
      this.length--;
      return this;
    }

    const previousNode = this.traverseToIndex(index - 1);
    const nodeToRemove = previousNode.next;
    previousNode.next = nodeToRemove.next;
    nodeToRemove.next.prev = previousNode;
    nodeToRemove.prev = null;
    nodeToRemove.next = null;
    nodeToRemove.value = null;
    this.length--;
    return this;
  }
}