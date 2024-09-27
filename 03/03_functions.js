const foo = function () {
  return
}

console.log(foo())
// -> undefined

/* 
The preceding code works, even though the function is defined 
below the code that uses it. Function declarations are not part 
of the regular top-to-bottom flow of control. They are 
conceptually moved to the top of their scope and can be used 
by all the code in that scope.
*/

console.log("The future says:", future())

function future() {
  return "You'll never have flying cars"
}

//? The Call Stack

function greet(who) {
  console.log("Hello ", who)
}

greet("Henry")

console.log("Bye!")

// We could show the flow of control schematically like this:

/*

not in function
  in greet
    in console.log
  in greet
not in function
  in console.log
not in function

*/

/*

Because a function has to jump back to the place that called 
it when it returns, the computer must remember the context 
from which the call happened.

The place where the computer stores this context is the call 
stack. Every time a function is called, the current context is 
stored on top of this stack. When a function returns, it 
removes the top context from the stack and uses that context 
to continue execution.

*/

//? Optional Arguments

//! Below code won't throw any error
const square = (x) => {
  return x * x
}
console.log(square(4, true, "bear"))
// -> 16

/* 

javascript ignores the extra arguments and computes the square of 
the first one.

*/

//? Closure

//! below code is an example of closure. twice becomes a
//! function that returns number*2. When called again with value
//! 5, program outputs 10
function multiplier(factor) {
  return (number) => number * factor
}

let twice = multiplier(2)
console.log(twice(5))
// → 10

//? Recursion

//! An example to recursion is:
function power(base, exponent) {
  if (exponent == 0) {
    return 1
  } else {
    return base * power(base, exponent - 1)
  }
}
console.log(power(3, 3))
// -> 27

/*

Running through a simple loop is generally cheaper than
calling a function multiple times.

*/

//! A more advanced example to recursion:
function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history
    } else if (current > target) {
      return null
    } else {
      return (
        find(current + 5, `(${history} + 5)`) ??
        find(current * 3, `(${history} * 3)`)
      )
    }
  }
  return find(1, "1")
}

console.log(findSolution(24))
// → (((1 * 3) + 5) * 3)

//? Functions and Side Effects

/*

Functions can be roughly divided into those that are called for 
their side effects and those that are called for their return 
value (though it is also possible to both have side effects and 
return a value).

*/

//! you might consider extracting side effects to another
//! function and reduce the complexity

/*

A pure function is a specific kind of value-producing function 
that not only has no side effects but also doesn’t rely on side 
effects from other code.

*/

//! A pure function, when called with the same arguments,
//! always produces the same value (and doesn’t do anything else).

//? Exercise - Minimum

/*

The previous chapter introduced the standard function Math.min 
that returns its smallest argument. We can write a function 
like that ourselves now. Define the function min that takes 
two arguments and returns their minimum.

*/

function min(arg1, arg2) {
  if (arg1 < arg2) {
    return arg1
  } else {
    return arg2
  }
}

console.log(min(0, 10))
// -> 0

console.log(min(0, -10))
// -> -10

//? Exercise - Recursion

const isEven = (arg) => {
  if (arg == 0) {
    return true
  } else if (arg == 1) {
    return false
  } else if (arg < 0) {
    return isEven(-arg)
  } else {
    return isEven(arg - 2)
  }
}

console.log(isEven(50))
// → true
console.log(isEven(75))
// → false
console.log(isEven(-1))
// -> false

//? Exercise - Bean Counting

/*

You can get the Nth character, or letter, from a string by writing
[N] after the string (for example, string[2]). The resulting value
will be a string containing only one character (for example, "b"). 
The first character has position 0, which causes the last one to 
be found at position string.length - 1. In other words, a 
two-character string has length 2, and its characters have 
positions 0 and 1.

Write a function called countBs that takes a string as its only 
argument and returns a number that indicates how many uppercase 
B characters there are in the string.

*/

const countBs = (text, countChar) => {
  let found = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] == countChar) found++
  }
  return found
}

console.log(countBs("aaaBBBBcdd", "B"))
// -> 4
