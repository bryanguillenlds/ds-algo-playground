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

  remove(index) {
    if (index === 0) {
      const nodeToRemove = this.head;
      this.head = this.head.next;
      nodeToRemove.next = null;
      nodeToRemove.value = null;
      this.length--;
      return this;
    }

    if (index === this.length - 1) {
      const nodeToRemove = this.tail;
      const currentNode = this.traverseToIndex(index - 1);
      currentNode.next = null;
      this.tail = currentNode;
      nodeToRemove.next = null;
      nodeToRemove.value = null;
      this.length--;
      return this;
    }

    const previousNode = this.traverseToIndex(index - 1);
    const nodeToRemove = previousNode.next;
    previousNode.next = previousNode.next.next;
    nodeToRemove.next = null;
    nodeToRemove.value = null;
    this.length--;
    return this;
  }

  // Before starting to traverse the list and updating the pointers:
  // store the soon-to-be-old head so we can flip the pointers later
  // set the previous to null (heead needs to point to null just as tail does)
  // set the current node to be the head because that's where we will start traversing
  // Traverse until the the end of the list
  // set nextnode to be the next of the current
  // set the current node's next to be the previous node so it points backwards
  // update previous to be the current for the next iteration
  // update the current to be the next node for the next iteration
  // After we are done traversing, set the head to be the previous node (previous is the node at the end of the traversal)
  // and the tail to be the old head that we stored earlier
  reverseWithTwoPointers() {
    if (!this.head.next) {
      return this;
    }

    let oldHead = this.head;
    let previousNode = null;
    let currentNode = this.head;
    let nextNode;

    for (let i = 0; i < this.length; i++) {
      //store the next node before we break the link and make it point to the previous node
      nextNode = currentNode.next;
      currentNode.next = previousNode;


      //Shift two pointers to the right
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.head = previousNode;
    this.tail = oldHead;

    return this;
  }

  reverseRecursively(head) {
    // Base case: if we've reached the end of the list, return null
    if (!head) {
      return null;
    }

    // Assume current node will be the new head (will be updated if there are more nodes)
    let newHead = head;

    // If there are more nodes after this one, recursively reverse the rest
    if (head.next) {
      // Recursively reverse everything after current node, get back the new head
      newHead = this.reverseList(head.next);

      // Flip the arrow: make the next node point back to current node
      head.next.next = head;
    }

    // Break the old forward connection (current node now points to null)
    head.next = null;

    // Return the new head of the reversed list
    return newHead;
  }
}