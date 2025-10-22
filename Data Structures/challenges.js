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


/*Implement Queue using Two Stacks
Leetcode 232
*/
class MyQueue {
  //declaring as class fields beacuse we don't care about instantiating this class with constructor arguments
  inputStack = [];
  outputStack = [];

  constructor() {
  }

  // Push elements normally. An array is a stack by default.
  push(x) {
      this.inputStack.push(x);
  }

  // Push elements from the input stack into the output stack by popping them off.
  // Then pop from the output stack to get the last element (which is now the first as a queue);
  pop() {
      if (!this.outputStack.length) {
          while(this.inputStack.length) {
              this.outputStack.push(this.inputStack.pop());
          }
      }

      return this.outputStack.pop();
  }

  // Same as pop, but we don't pop the element off. We just return the last element.
  peek() {
      if (!this.outputStack.length) {
          while(this.inputStack.length) {
              this.outputStack.push(this.inputStack.pop());
          }
      }

      return this.outputStack[this.outputStack.length - 1];
  }

  // Check if the stacks are empty. If both are empty, the queue is empty.
  empty() {
      return !this.inputStack.length && !this.outputStack.length;
  }
}

/* Valid Parentheses
Leetcode 20
*/
function validParentheses(s) {
  const stack = [];

  const matchingPairs = {
    '}': '{',
    ')': '(',
    ']': '['
  };

  for (let i = 0; i < s.length; i++) {
    //If it is an open bracket (if it's not in the map of pairs for closings)
    if (!matchingPairs[s[i]]){
      //push the open bracket into stack for later comparison
      stack.push(s[i]);
    } else {
      //if it is a closing bracket and if its pair value matches the top of the stack
      if (matchingPairs[s[i]] === stack[stack.length - 1]) {
        //pop the top of the stack (the open bracket) so that we can check the next closing bracket against the next open bracket
        stack.pop();
      } else {
        //if it is a closing bracket and if its pair value does not match the top of the stack
        //then it is not a valid closing bracket
        return false;
      }
    }
  }

  //if stack is empty after checking all the brackets, then all the open brackets have been closed correctly, so it is valid.
  return !stack.length;
}

/* Leetcode 219
Given an integer array nums and an integer k,
return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k,
otherwise return false.

Translation: You have an array of numbers, and a number k.
You need to find out if there are two of the same number that are not too far apart,
Meaning their positions in the list are at most "k" distance apart.
*/
function containsNearbyDuplicate(nums, k) {
  // If the window is 0 then it is invalid because two numbers can't fit there to compare
  if (k === 0) return false;

  // A set will be used as a sliding window to add or remove numbers that fit into the expected size
  let seenNums = new Set();

  for (let i = 0; i < nums.length; i++) {
      //If we have seen it before (within the existing window), it is valid
      if (seenNums.has(nums[i])) {
          return true;
      }

      // if the size of the set is bigger than expected, delete the first number in the window
      // so that when we add the current number, the window doesn't grow larger than "k"
      if (seenNums.size >= k) {
          seenNums.delete(nums[i-k]);
      }

      // add the number we just saw to the window
      seenNums.add(nums[i]);
  }

  return false;
};


/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
Leetcode 242
*/
function isAnagram(s, t) {
  // If they are not the same length, invalid.
  if (s.length !== t.length) return false;

  let freqMap = {}; //store how many times a char has been seen

  // Loop through first string to determine the frequencies
  for (let i = 0; i < s.length; i++) {
      // if we haven't seen the current char before, add to map and initialize as seen once
      if (!freqMap[s[i]]) {
          freqMap[s[i]] = 1;
      } else {
          // if we've seen it before, increment the frequency
          freqMap[s[i]]++;
      }
  }

  // Loop through second string to subtract the frequency
  // if it matches a char we've seen in the first string
  for (let j = 0; j < t.length; j++) {
      // if it is a char that hasn't been seen at all in the first string,
      // we already know it is NOT an anagram.
      if (!freqMap[t[j]]) return false;

      // if we have seen it in the first string, decrease it
      freqMap[t[j]]--;
  }

  return true;
}

/*
Given a string s, return true if it is a palindrome, or false otherwise.
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
Leetcode 125
*/
function isPalindrome(string) {
  if (string.length === 1) return true;

  if (string.length < 1) return false;

  // Normalize the string and remove nonalphanumeric chars
  let s = string.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  // Set the two pointers to the first and last characters
  let startPointer = 0;
  let endPointer = s.length-1;

  // Loop while the start pointer hasn't met the endpointer as they move
  for (let i = 0; startPointer < endPointer; i++) {
    // If the chars match, move forward and backwards to check next two chars
    if (s[startPointer] === s[endPointer]) {
      startPointer++;
      endPointer--;
    } else {
      // if they don't match, we know is not a valid palindrome
      return false;
    }
  }

  return true;
}
