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

