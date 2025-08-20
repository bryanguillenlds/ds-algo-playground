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

}

console.log(findPairOrdered([1, 2, 3, 9], 8));
console.log(findPairOrdered([1, 2, 4, 4], 8));