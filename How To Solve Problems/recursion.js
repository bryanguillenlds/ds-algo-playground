/**
 * 3 RULES
 * 1. Base Case
 * 2. Recursive Case with different input
 * 3. Return what is needed in base case (could be nothing) and in recursive case (if necessary)
 */

function findFactorialRecursive(number) {
  // Base case
  if (number === 0 || number === 1) return 1;

  // Recursive case with decreasing input (number-1)
  // Step 1: Make recursive call with smaller input, trusting it returns correct result
  // Step 2: Multiply current number by that result
  // The call stack builds down to base case, then calculates back up
  return number * findFactorialRecursive(number-1);

  // → CALL: factorial(5)
  //   → CALL: factorial(4)
  //     → CALL: factorial(3)
  //       → CALL: factorial(2)
  //         → CALL: factorial(1)
  //         ← BASE: factorial(1) = RETURNS 1
  //       ← RETURN: 2 * 1 = 2
  //     ← RETURN: 3 * 2 = 6
  //   ← RETURN: 4 * 6 = 24
  // ← RETURN: 5 * 24 = 120
}

function findFactorialIterative(number) {
  // Edge case
  if (number === 0 || number === 1) return 1;

  let factorial = number;

  // Loop in reverse until we reach zero
  // Multiply each number by the next number in decreasing order
  for (let i = number-1; i > 0; i--) {
    factorial *= i;
  }

  return factorial;
}

// console.log(findFactorialRecursive(2));
// console.log(findFactorialIterative(5));

function fibonacciIterative(number) {
  // Construct the first two values (after all, the sequence is the sum of the previous 2 values)
  let fibList = [0, 1];

  // Start looping from the third index until we reach the number we wanted to find
  // at each turn we add the previous two values to get the next value
  for (let i = 2; i <= number; i++) {
    fibList.push(fibList[i-2] + fibList[i-1]);
  }

  // Return the value at the index we wanted to find
  return fibList[number];
}

function fibonacciIterativeOptimized(number) {
  if (number === 0) return 0;
  if (number === 1) return 1;

  let prev = 0;
  let current = 1;

  // We only need the last 2 numbers to calculate the next Fibonacci number.
  // "prev" and "current" form a sliding window moving through the sequence.
  // Example for fib(5): start with 0,1 → 1,1 → 1,2 → 2,3 → 3,5
  // Trade-off: Uses less memory but doesn't store the full sequence.
  for (let i = 2; i <= number; i++) {
    let next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}


function fibonacciRecursive(number) {
  // Base case
  if (number === 0) return 0;
  if (number === 1) return 1;

  // Recursive case: fib(n) = fib(n-2) + fib(n-1)
  // Example: fib(3) = fib(1) + fib(2)
  //                 = fib(1) + (fib(0) + fib(1))
  //                 = 1 + (0 + 1)
  //                 = 2
  // Note: This creates a binary tree of calls, making it O(2^n) - inefficient!
  return fibonacciRecursive(number-2) + fibonacciRecursive(number-1);
}

function fibonacciRecursiveMemoized(number, memo = {}) {
  // Check if we've already calculated this, if so return the value
  if (number in memo) return memo[number];

  // Base cases
  // if the number is 0 or 1, return the number
  if (number === 0) return 0;
  if (number === 1) return 1;

  // Calculate once and store in cache (memo object)
  // Store the value in the memo object
  memo[number] = fibonacciRecursiveMemoized(number - 2, memo) + fibonacciRecursiveMemoized(number - 1, memo);

  return memo[number];
}

// console.log(fibonacciIterative(3));
// console.log(fibonacciIterativeOptimized(3));
// console.log(fibonacciRecursive(3));
// console.log(fibonacciRecursiveMemoized(3));

/* Write a function called power which accepts a base and an exponent.
The function should return the power of the base to the exponent.
This function should mimic the functionality of Math.pow()
- do not worry about negative bases and exponents.
*/
function power(base, exponent){
  if (exponent === 0) return 1;

  return base * power(base, exponent-1);
}
// 2 ^ 4
// 2 * (2, 3)
  // 2 * (2, 2)
      // 2 * (2, 1)
          // 2 * (2, 0)
              // 1
          // 2 * 1
          // 2
      // 2 * 2
      // 4
  // 2 * 4
  // 8
// 2 * 8
// 16

// console.log(power(2, 4));

/* Write a function called productOfArray which takes in an array of numbers and returns the product of them all. */
function productOfArray(arr) {
  if (arr.length === 0) return 1;

  return arr[0] * productOfArray(arr.slice(1));
}

//[1,2,3]
// 1 * [2, 3]
  // 2 * [3]
      // 3 * []
          // 1
      // 3 * 1
      // 3
  // 2 * 3
  // 6
// 1 * 6
// 6

// console.log(productOfArray([1,2,3]));

/* Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function. */
function recursiveRange(n){
  if (n === 0 || n === 1) return n;

  return n + recursiveRange(n-1);
}

// 3
// 3 + (2)
  // 2 + (1)
      // 1
  // 2 + 1
  // 3
// 3 + 3
// 6

// console.log(recursiveRange(3));