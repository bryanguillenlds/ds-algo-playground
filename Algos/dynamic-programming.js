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

// Memoization: Store the results of expensive function calls and return the cached result when the same inputs occur again
function fibonacciRecursiveMemoized(number, memo = {}) {
  // Check if we've already calculated this, if so return the value
  if (number in memo) return memo[number];

  // Base cases
  // if the number is 0 or 1, return the number
  if (number === 0) return 0;
  if (number === 1) return 1;

  // Calculate once and store in cache (memo object)
  // Store the value in the memo object
  let result= fibonacciRecursiveMemoized(number - 2, memo) + fibonacciRecursiveMemoized(number - 1, memo);
  memo[number] = result;

  return result;
}

// Tabulation: Build up a table-cache by solving smaller subproblems and using the results to solve larger ones
function fibonacciIterativeTabulation(number) {
  // Construct the first two values (after all, the sequence is the sum of the previous 2 values)
  let fibList = [0, 1];

  // Start looping from the third index until we reach the number we wanted to find
  // at each turn we add the previous two cached values to get the next value
  // and we add it to the cache too
  for (let i = 2; i <= number; i++) {
    fibList.push(fibList[i-2] + fibList[i-1]);
  }

  // Return the value at the index we wanted to find
  return fibList[number];
}