// EDGE LIST with arrays
// Only showing the connections, not the nodes
const edgeList = [[0, 2], [2, 3], [2, 1], [1, 3]];

// ADJACENT LIST with arrays
// the index is the actual value of the node
// the value is the list of nodes that are connected to it.
// node 0 is connected to node 2, node 1 is connected to node 2 and node 3, etc.
const adjacentListArray = [[2], [2, 3], [0, 1, 3], [1, 2]];

// ADJACENT LIST with objects
const adjacentListObject = {
  0: [2],
  1: [2, 3],
  2: [0, 1, 3],
  3: [1, 2]
};

// ADJACENT MATRIX with arrays
// the index is the actual value of the node
// the value is 1 if the node is connected to the node at the index, 0 otherwise.
// node 0 is connected to node 2, node 1 is connected to node 2 and node 3, etc.
const adjacentMatrixArray = [
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 0]
];

// ADJACENT MATRIX with objects
const adjacentMatrixObject = {
  0: [0, 0, 1, 0],
  1: [0, 0, 1, 1],
  2: [1, 1, 0, 1],
  3: [0, 1, 1, 0]
};

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.edges = [];
//   }
// }

class UndirectedGraph {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacentList = {};
  }

  addVertex(node) {
    if (this.adjacentList[node]) {
      return 'Vertex Already Exists';
    }

    this.adjacentList[node] = [];
    this.numberOfNodes++;

    return this.adjacentList;
  }

  addEdge(node1, node2) {
    if (!this.adjacentList[node1] || !this.adjacentList[node2]) return;

    this.adjacentList[node1].push(node2);
    this.adjacentList[node2].push(node1);
  }

  removeEdge(node1, node2) {
    if (!this.adjacentList[node1] || !this.adjacentList[node2]) return;

    this.adjacentList[node1] = this.adjacentList[node1].filter(n => n !== node2);
    this.adjacentList[node2] = this.adjacentList[node2].filter(n => n !== node1);
  }

  removeVertex(node) {
    if (!this.adjacentList[node]) return;

    this.adjacentList[node].forEach(connection => this.removeEdge(node, connection));

    delete this.adjacentList[node];
    this.numberOfNodes--;
  }
}