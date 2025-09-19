/*
- Collection of nums
- find matching pair that is equal to a target sum:
- [1, 2, 3, 9] sum to find = 8
- [1, 2, 4, 4] sum to find = 8
- Has to be O(n) time complexity

-Ask about type of input, ordered or unordered, integer or float. What to return
- (in this case, integer, ordered array, indexes of the pairs or boolean indicating if it was found)
-Talk out loud about possible solutions and blockers.
-Let the interviewer talk, sometimes they can give hints or help.
*/

function findPairOrdered(array, targetSum) {
	// check if input is valid, if not return string message saying it is invalid.
  // Loop thrrough the array and check if the sum of the first index and the last index is equal to the target sum.
  // If it is, return an object with the indexes of the pairs and the boolean indicating if it was found.
  // If it is larger than targetsum, move the last index to the left.
  // If it is smaller than targetsum, move the first index to the right.
  // if we get to a point where the first index is equal to the last index, return a string message saying it was not found.

  if (!Array.isArray(array) || array.length < 2 || typeof targetSum !== 'number') {
    return "Invalid input";
  }

  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex < rightIndex) {
    const currentSum = array[leftIndex] + array[rightIndex];

    if (currentSum === targetSum) {
      return {
        pairs: {
					firstIndex: {
						value: array[leftIndex],
						index: leftIndex
					},
					secondIndex: {
						value: array[rightIndex],
						index: rightIndex
					}
				},
        found: true
      };
    }

    if (currentSum > targetSum) {
      rightIndex--;
    } else {
      leftIndex++;
    }
  }

  return "No pair found that sums to target";
}

function findPairUnordered(array, targetSum) {
  // Check if the input is valid
  // Loop through array and get the complement (targetSum - currentIndex), store currentIndex value in a hash map
	// Loop through hash map and check if the complement value is in the hash map
	// If it is, return the object with the indexes of the pairs and the boolean indicating if it was found.
	// If it is not, return a string message saying it was not found.

  if (!Array.isArray(array) || array.length < 2 || typeof targetSum !== 'number') {
    return "Invalid input";
  }

  const hashMap = new Map();

  for (let i = 0; i < array.length; i++) {
    const complement = targetSum - array[i];
    if (hashMap.has(complement)) {
      return {
				found: true,
				num1: {
					value: array[i],
					index: i
				},
				num2: {
					value: complement,
					index: hashMap.get(complement)
				}
			};
    }
    hashMap.set(array[i], i);
  }

  return "No pair found that sums to target";
}

// console.log(findPairOrdered([1, 2, 3, 9], 8));
// console.log(findPairOrdered([1, 2, 4, 4], 8));

// console.log(findPairUnordered([1, 2, 9, 3], 8));
// console.log(findPairUnordered([1, 4, 2, 4], 8));

/* Given 2 arrays, create a function that lets a user know (true/false) whether these two arrays contain any common items
- const array1 = ['a', 'b', 'c', 'x'];
- const array2 = ['z', 'y', 'i'];
- should return false

- const array1 = ['a', 'b', 'c', 'x'];
- const array2 = ['z', 'y', 'x'];
- should return true
*/
function findCommonItemsBruteForce(array1, array2) {
  // Loop through array1 and check if any of the items are in array2
  // If it is, return true
  // If it is not, return false

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }

  return false;
}

console.log(findCommonItemsBruteForce(['a', 'b', 'c', 'x'], ['z', 'y', 'i']));
console.log(findCommonItemsBruteForce(['a', 'b', 'c', 'x'], ['z', 'y', 'x']));

function findCommonItemsOptimized(array1, array2) {
  // Check if input is valid
  // Loop through array1 and store the items in a hash map
  // Loop through array2 and check if the items are in the hash map
  // If it is, return true
  // If it is not, return false

  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return "Invalid input";
  }

  const hashMap = new Map();

  for (let i = 0; i < array1.length; i++) { // O(n)
    // We do a check to make sure the item is not already in the hash map to avoid duplicates in case the interviewer
    // asks for first occurence of the item.
    if (!hashMap.has(array1[i])) {
      hashMap.set(array1[i], i);
    }
  }

  for (let j = 0; j < array2.length; j++) { // O(m)
    if (hashMap.has(array2[j])) { // O(1)
      return true;
    }
  }

  return false;
}

console.log(findCommonItemsOptimized(['a', 'b', 'c', 'x'], ['z', 'y', 'i']));
console.log(findCommonItemsOptimized(['a', 'b', 'c', 'x'], ['z', 'y', 'x']));