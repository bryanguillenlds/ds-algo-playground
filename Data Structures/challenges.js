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

// console.log(firstRecurringCharacterOptimized([2, 5, 5, 2, 3, 5, 1, 2, 4]));
// console.log(firstRecurringCharacterBruteForce([2, 5, 5, 2, 3, 5, 1, 2, 4]));

/* Two Sum Given an array of integers nums and an integer target,
    return the indices i and j such that nums[i] + nums[j] == target and i != j.

    You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

    Return the answer with the smaller index first.
*/
function twoSumBruteForce(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

function twoSumOptimized(nums, target) {
  const complements = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentComplement = target - nums[i];

    if (!complements.has(nums[i])) {
      complements.set(currentComplement, i);
    } else {
      return [complements.get(nums[i]), i];
    }
  }
};

// console.log(twoSumBruteForce([3, 4, 5, 7], 9));
// console.log(twoSumOptimized([3, 4, 5, 7], 9));

/* Subarray Sum Equals K
Given an array of integers nums and an integer k,
return the total number of subarrays whose sum equals to k.
*/
function subArraySumEqualsKOptimized(nums, target) {
  //start count at 0
  let count = 0;
  //start currentsum at 0
  let currentSum = 0;

  //initialize hashmap with a sum of 0 and a count of 1 because there could be a valid
  //subarray starting at the first index
  let hashMap = new Map([[0, 1]]);

  for (let i = 0; i < nums.length; i++) {
    // Add current number to the sum
    currentSum += nums[i];

    // As we loop, ask if we have already seen a previous sum that is a valid subarray
    // Math relation: target = currentSum - previousSum(of a validsubarray)
    // Re-expressed: previousSum = currentSum - target, and that is what we should check for
    if (hashMap.has(currentSum - target)) {
      //if we have, increment the count by however many times we have seen that same previous sum before
      //because it could have appeared many times
      count += hashMap.get(currentSum - target); //this gets us the value of how many times we've seen it
    }

    //Either update the times we've seen it (if we have) or initialize it as the 1st time
    let timesSeen = (hashMap.get(currentSum) || 0) + 1;
    //Always set the currentsum we just computed
    //(if it's been seen before it'll just get updated with a new count value)
    hashMap.set(currentSum, timesSeen);
  }

  return count;
}

// sum[i-j] - sum

function subArraySumEqualsKBCubic(nums, target) {
  let count = 0;  // Keep track of how many subarrays sum to k

  // Step 1: Try every possible starting position for a subarray
  for (let startingSubArrIdx = 0; startingSubArrIdx < nums.length; startingSubArrIdx++) {

    // Step 2: For each starting position i, try every possible ending position
    for (let endingSubArrIdx = startingSubArrIdx; endingSubArrIdx < nums.length; endingSubArrIdx++) {

      // Step 3: Calculate the sum of subarray from position i to position j
      let subarraySum = 0;
      for (let index = startingSubArrIdx; index <= endingSubArrIdx; index++) {
        subarraySum += nums[index];  // Add each element in the subarray
      }

      // Step 4: Check if this subarray sums to our target k
      if (subarraySum === target) {  // Now it's clear this is the target sum
        count++;  // Found a valid subarray, increment our count
      }
    }
  }

  return count;  // Return total number of subarrays that sum to k
}

function subArraySumEqualsKCuadratic(nums, target) {
  let count = 0;  // Keep track of how many subarrays sum to k

  // Step 1: Try every possible starting position for a subarray
  for (let startingSubArrIdx = 0; startingSubArrIdx < nums.length; startingSubArrIdx++) {

    // Step 2: The sum will start being equal to the first element of the current subarray
    let subarraySum = nums[startingSubArrIdx];

    // Step 3: Check if the starting point itself is a valid subarray equal to the target
    if (subarraySum === target) {
      count++;
    }

    // Step 4: Iterate starting at the element that immediately follows the current starting point of
    // the subarray because we already checked if the starting point itself is a valid subarray
    for (let endingSubArrIdx = startingSubArrIdx + 1; endingSubArrIdx < nums.length; endingSubArrIdx++) {
      // Mathematical relationship: subarrSum = subarrSum + currentItem (subarray sum is the sum so far)
      subarraySum += nums[endingSubArrIdx];  // Add each element in the subarray until we hit the end

      // Step 5: Check if this subarray sums to the target
      if (subarraySum === target) {
        count++;  // Found a valid subarray, increment our count
      }
    }
  }

  return count;
}

// console.log(subArraySumEqualsKOptimized([1, 2, 3, 2, 1, 3, 0], 3));
// console.log(subArraySumEqualsKBCubic([1, 2, 3, 2, 1, 3, 0], 3));
// console.log(subArraySumEqualsKCuadratic([1, 2, 3, 2, 1, 3, 0], 3));

/* Merge Two Linked Lists
You are given two linked-lists that are sorted in non-decreasing order.
Merge them into a single sorted linked-list and return it.
LEETCODE 21
*/
function mergeTwoLinkedLists(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  //create a dummy starter node so that we can start the tail from there and advance it
  //and not have to worry about special logic for deciding the head before we actually start iterating
  const dummyStarterNode = new ListNode();
  //at this point the tail and the dummy node point to the same thing, but once the tail
  //is reassigned, the dummy will not change anymore and point to the head (which is what we have to return)
  let currentTail = dummyStarterNode;

  //loop until one of the lists is empty
  while (list1 && list2) {
    //check if the value of list 1 is smaller
    if (list1.val < list2.val) {
      //make previous tail point to the current node
      currentTail.next = list1;
      //update tail to be the current node
      currentTail = list1;
      //make current node be the next on the list
      list1 = list1.next;
    } else {
      currentTail.next = list2;
      currentTail = list2;
      list2 = list2.next;
    }
  }

  // attach the rest of whatever is next by pointing the currentTail to the list that still has nodes
  currentTail.next = list1 || list2;

  return dummyStarterNode.next; //return the head
}

