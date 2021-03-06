const factorial = function (n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

const fib = function (n) {
  if (n == 0) {
    return 0;
  }
  let a1 = 0;
  let a2 = 1;
  for (let i = 1; i < n; i++) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}