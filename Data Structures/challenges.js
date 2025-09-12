function maxSubArray(nums) {
  //Variables to keep track:
  let currentSum = nums[0];
  let maxSum = nums[0]; //At the beginning they are the same

  // start looping at the next index to start deciding if we should keep extending
  // or start fresh since next item is bigger than the sum we have so far.
  for (let i = 1; i < nums.length; i++) {
      const currentItem = nums[i];

      currentSum = Math.max(currentItem, currentSum + currentItem); //Does adding make the sum larger? Grab wtv is larger
      maxSum = Math.max(maxSum, currentSum); //Compare what is currently the maxsum with the result from above
  }

  return maxSum;
};

//Example with: [5,4,-1,7,8]

// currentSum 5, maxSum 5
// currentItem 4
// currentSum 9
// maxSum 9

// currentItem -1
// currentSum 8
// maxSum 9

// currentItem 7
// currentSum 16
// maxSum 16

// currentItem 8
// currentSum 23
// maxSum 23 // Answer

/* Given an array of integers, return the first recurring character */
function firstRecurringCharacterBruteForce(array) {
  // Iterate over each element starting from the second one
  for (let j = 1; j < array.length; j++) {  // Start from second element
    // For each element at position j, check all previous elements
    for (let i = 0; i < j; i++) {           // Check all previous elements
      // If a previous element matches the current one, it's a duplicate
      if (array[i] === array[j]) {
        return array[j]; // Return the first duplicate encountered
      }
    }
  }

  // If no duplicates are found, return this message
  return "No recurring characters found";
}

function firstRecurringCharacterOptimized(array) {
  const uniqueSet = new Set();

  for (let i = 0; i < array.length; i++) {
    if(uniqueSet.has(array[i])) {
      return array[i];
    }
    uniqueSet.add(array[i]);
  }

  return "No recurring characters found";
}

console.log(firstRecurringCharacterOptimized([2, 5, 5, 2, 3, 5, 1, 2, 4]));
console.log(firstRecurringCharacterBruteForce([2, 5, 5, 2, 3, 5, 1, 2, 4]));