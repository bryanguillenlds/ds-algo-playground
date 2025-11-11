function binarySearch(array, target) {
  // store starting point and ending point
  let startingPoint = 0;
  let endingPoint = array.length - 1;


  // Loop through array while starting point is less than or equal to ending point
  while (startingPoint <= endingPoint) {
    // recalculate middle in each iteration with current starting or ending point
    let middle = Math.floor((startingPoint + endingPoint) / 2);

    // ask if middle is equal to target, if it is, return immediately
    if (array[middle] === target) {
      return middle; // return the index of the found target
    }

    // If target is smaller, make ending point - 1 the current middle point
    if (target < array[middle]) {
      endingPoint = middle - 1;
    } else {
    // If target is larger, make middle + 1 the new starting point
      startingPoint = middle + 1;
    }
  }

  // if we get to this point, it means the target was not found
  return -1;
}

function searchStringPattern(string, target) {
  let count = 0;

  // Loop through the string
  for (let i = 0; i < string.length; i++) {
    // Loop througuh the pattern target to check if the characters match
    for (let j = 0; j < target.length; j++) {
      //* If the characters do not match, break out of the inner loop
      // We check i + j because we want to check the next character in the string:
      //    - i + j gives us the actual string index to compare with target[j]
      //    Example: if i=5 and j=2, we're checking string[7] against target[2] (the third character of the target)
      //*    This is a sliding window: at each i, check if the pattern matches starting at i.
      // If they match, loop will keep going and j will keep incrementing until it reaches the length of the target
      if (string[i + j] !== target[j]) {
        break;
      }

      // If we get to the last character of the target, it means we found a match
      if (j === target.length - 1) {
        // If we found a match, increment the count
        count++;
      }
    }
  }

  return count; // return the number of times the pattern was found in the string
}

function BFSearch(tree) {
  // Queue to store nodes to visit
  // Start the queue with the root
  let nodeQueue = [tree.root];
  // List to contain visited nodes in BFS order to return in the end
  let visitedNodes = [];
  // To keep track of the node that has to be dequeued
  let queueFront = 0

  // Keep traversing while the front of the queue is still within
  // the list of nodes to visit (meaning there are nodes left to process)
  while (queueFront < nodeQueue.length) {
    // Get current element that has to be dequeued and increase index to the next after we retrieve it (postfix increment ++)
    let currentNodeOnQueue = nodeQueue[queueFront++];
    visitedNodes.push(currentNodeOnQueue.value);

    // If the node being removed from the queue has a left child, add it to queue
    if (currentNodeOnQueue.left) {
      nodeQueue.push(currentNodeOnQueue.left);
    }

    // If the node being removed from the queue has a right child, add it to queue
    if (currentNodeOnQueue.right) {
      nodeQueue.push(currentNodeOnQueue.right);
    }
  }

  //return visited nodes list
  return visitedNodes;
}

// This function assumes it will be called with the initial queue (with the root node of the tree),
// visited nodes list (empty), and queue front index of 0.
function BFSearchRecursive(nodeQueue, visitedNodes, queueFront = 0) {
  // Base case: if queue front index is at or beyond the queue length,
  // return visited nodes list
  if (queueFront >= nodeQueue.length) {
    return visitedNodes;
  }

  // Get current node at the front of the queue (simulating dequeue without shifting)
  let currentNodeOnQueue = nodeQueue[queueFront];
  // Add current node's value to visited nodes list
  visitedNodes.push(currentNodeOnQueue.value);

  // If the node being removed from the queue has a left child, add it to queue
  if (currentNodeOnQueue.left) {
    nodeQueue.push(currentNodeOnQueue.left);
  }

  // If the node being removed from the queue has a right child, add it to queue
  if (currentNodeOnQueue.right) {
    nodeQueue.push(currentNodeOnQueue.right);
  }

  // Recursively process the next node in the queue (increment queueFront index)
  return BFSearchRecursive(nodeQueue, visitedNodes, queueFront + 1);
}

//* For preorder:
// Visit current node, then visit left subtree of each current node,
// then visit right subtree of each current node
// (For each node: Parent -> Left Children -> Right Children)
function preOrderTraversal(node, list) {
  // Base case: if the node is null (meaning we've reached the end of the tree), return/exit
  if (!node) {
    return;
  }

  // Add the node's value to the list
  list.push(node.value);

  // Recursively visit left subtree of each current node
  preOrderTraversal(node.left, list);

  // Recursively visit right subtree of each current node
  preOrderTraversal(node.right, list);
}

function DFSearchPreorder(tree) {
  if (!tree || !tree.root) {
    return [];
  }

  let visitedNodes = [];
  const currentNode = tree.root;

  preOrderTraversal(currentNode, visitedNodes);

  return visitedNodes; // return the list of visited nodes
}

//* For Postorder:
// Visit every node in left subtree first, then every node in right subtree of each current node, and then the current node
// (For each node: Left Children -> Right Children -> Parent)
function postOrderTraversal(node, list) {
  // Base case: if the node is null (meaning we've reached the end of the tree), return/exit
  if (!node) {
    return;
  }

  // Recursively visit left subtree of each current node
  postOrderTraversal(node.left, list);

  // Recursively visit right subtree of each current node
  postOrderTraversal(node.right, list);

  // Add the node's value to the list
  list.push(node.value);
}

function DFSearchPostorder(tree) {
  if (!tree || !tree.root) {
    return [];
  }

  let visitedNodes = [];
  const currentNode = tree.root;

  postOrderTraversal(currentNode, visitedNodes);

  return visitedNodes; // return the list of visited nodes
}

//* For Inorder:
// Visit every node in left subtree first, then the current node, and then every node in right subtree of each current node.
// (For each node: Left Children -> Parent -> Right Children)
function inOrderTraversal(node, list) {
  // Base case: if the node is null (meaning we've reached the end of the tree), return/exit
  if (!node) {
    return;
  }

  // Recursively visit left subtree of each current node
  inOrderTraversal(node.left, list);

  // Add the node's value to the list
  list.push(node.value);

  // Recursively visit right subtree of each current node
  inOrderTraversal(node.right, list);
}

function DFSearchInorder(tree) {
  if (!tree || !tree.root) {
    return [];
  }

  let visitedNodes = [];
  const currentNode = tree.root;

  inOrderTraversal(currentNode, visitedNodes);

  return visitedNodes; // return the list of visited nodes
}

// This helper function assumes we have access to the adjacency list of the graph.
//* Base case: recursion naturally stops when the loop finishes iterating through all neighbors
// (either because all neighbors are visited, or the node has no neighbors)
function GraphDFSRecursiveTraversal(node, list, visitedNodes, adjacencyList) {
  // Add the node's value to the list to be returned
  list.push(node);

  // Add the node's value to the visited nodes obj (mark as visited)
  visitedNodes[node] = true;

  // Loop through the node's neighbors (in the adjacency list)
  for (let neighbor of adjacencyList[node]) {
    // if the neighbor of the current iteration has not been visited, recursively visit it
    if (!visitedNodes[neighbor]) {
      GraphDFSRecursiveTraversal(neighbor, list, visitedNodes, adjacencyList);
    }
  }
}

function GraphDFSRecursive(node, adjacencyList) {
  // (Guard clause): if the node is null or undefined, return/exit
  // (handles invalid starting nodes)
  if (!node) {
    return [];
  }

  // List to return nodes
  let list = [];

  // Store visited nodes in obj
  let visitedNodes = {};

  // Recursive helper function to visit all neighbors of the current node
  GraphDFSRecursiveTraversal(node, list, visitedNodes, adjacencyList);

  return list; // return the list of visited nodes
}

// DFS For Graph Iterative
function GraphDFSIterative(node, adjacencyList) {
  // List to return nodes
  let list = [];

  // Store visited nodes in obj
  let visitedNodes = {};

  // Stack to store nodes to visit
  // Why stack? Because we want to visit the last added node/neighbor first (LIFO)
  let stackToVisit = [node];

  // While the stack is not empty (meaning there are nodes/neighbors left to process), keep traversing
  while (stackToVisit.length > 0) {
    // Get (and remove) last node/neighbor in stack (list to visit)
    let nodeToVisit = stackToVisit.pop();

    // If node to visit wasn't already visited
    if (!visitedNodes[nodeToVisit]) {
      // visit it, add it to list to be returned
      list.push(nodeToVisit);

      // mark it as visited
      visitedNodes[nodeToVisit] = true;

      // loop through neighbors to add neighbors to stack of nodes to visit
      for (const neighbor of adjacencyList[nodeToVisit]) {
        //only push if neighbor hasn't been visited already
        if (!visitedNodes[neighbor]) {
          stackToVisit.push(neighbor);
        }
      }
    }
  }

  return list; // return the list of visited nodes
}

// BFS For Graph Iterative
// Assumes access to adjacencyList
function GraphBFSIterative(node, adjacencyList) {
  // List to return nodes
  let list = [];

  // Store visited nodes in obj
  let visitedNodes = {};

  // Queue to store nodes to visit
  // Why Queue? Because we want to visit the neighbor nodes in the order they were added to the queue (FIFO)
  // so we avoid going to the next level before all neighbors have been visited
  let queueToVisit = [node];

  // To keep track of the node that has to be dequeued
  let queueFront = 0

  // Mark the starting node as visited
  visitedNodes[node] = true;

  // Keep traversing while the front of the queue is still within
  // the queue of nodes to visit (meaning there are nodes left to process)
  while (queueFront < queueToVisit.length) {
    // Get current element that has to be dequeued and increase index to the next AFTER we retrieve it (postfix increment ++)
    // This is better than unshift which would add time complexity
    let currentNodeOnQueue = queueToVisit[queueFront++];

    // Push to list
    list.push(currentNodeOnQueue);

    // Loop through neighbors to add neighbors to queue of nodes to visit
    for (const neighbor of adjacencyList[currentNodeOnQueue]) {
      // Only push if neighbor hasn't been visited already
      if (!visitedNodes[neighbor]) {
        visitedNodes[neighbor] = true;
        queueToVisit.push(neighbor);
      }
    }
  }

  return list;
}