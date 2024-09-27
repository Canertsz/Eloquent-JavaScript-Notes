//? Objects

/* 

There’s an Object.assign function that copies all properties 
from one object into another:

*/

let objectA = { a: 1, b: 2 }
Object.assign(objectA, { b: 3, c: 4 })
console.log(objectA)
// -> { a: 1, b: 3, c: 4 }

let object1 = { value: 10 }
let object2 = object1
let object3 = { value: 10 }

console.log(object1 == object2)
// -> true
console.log(object1 == object3)
// -> false

object1.value = 15
console.log(object2.value)
// -> 15
console.log(object3.value)
// -> 10

//! object1 and object3 refers to the different adresses,
//! even though their values are same.
//! object2 refers to the same adress in memory with object1
//! so changing object1 also changes object2

let todoList = []

function remember(task) {
  todoList.push(task)
}

function getTask() {
  return todoList.shift()
}

function rememberUrgently(task) {
  todoList.unshift(task)
}

/*

This program manages a queue of tasks. You add tasks to the 
end of the queue by calling remember("groceries"), and when 
you’re ready to do something, you call getTask() to get (and 
remove) the front item from the queue. The rememberUrgently 
function also adds a task but adds it to the front instead 
of the back of the queue.

*/

//? Rest Parameters

function max(...numbers) {
  let result = -Infinity
  for (let number of numbers) {
    if (number > result) result = number
  }
  return result
}
console.log(max(4, 1, 9, -2))
// → 9

/*

When such a function is called, the rest parameter is bound 
to an array containing all further arguments.

*/

console.log(Math.PI)
// -> 3.141592653589793

//? JSON

/* 

An array with another array inside of it consists of (at least)
one memory region for the inner array and another for the outer
array, containing (among other things) a number that represents
the address of the inner array.

*/

//? Exercise - The Sum of A Range

const range = (start, end, step) => {
  let arr = []
  for (let i = start; i <= end; i += step) {
    arr.push(i)
  }
  return arr
}

console.log(range(1, 10, 2))
// → [1, 3, 5, 7, 9]

const sum = (array) => {
  let total = 0
  for (let i = 0; i < array.length; i++) {
    total += array[i]
  }
  return total
}

arr = range(1, 10, 2)

console.log(sum(arr))
// -> 55

//? Exercise - Reversing an Array

const reverseArray = (array) => {
  let output = []
  array.forEach((element) => {
    output.unshift(element)
  })
  return output
}

//? Exercise - A List

const arrayToList = (arr) => {
  if (arr.length === 0) {
    return null
  }
  return { value: arr[0], rest: arrayToList(arr.slice(1)) }
}

const listToArray = (list) => {
  let arr = []
  for (let node = list; node !== null; node = node.rest) {
    arr.push(node.value)
  }
  return arr
}

const prepend = (element, list) => {
  return { value: element, rest: list }
}

const nthRecursive = (list, position) => {
  if (position === 0) return list ? list.value : undefined
  if (list === null) return undefined
  return nthRecursive(list.rest, position - 1)
}

//? Exercise - Deep Comparison

function deepEqual(arg1, arg2) {
  if (arg1 === arg2) return true

  if (
    arg1 === null ||
    typeof arg1 !== "object" ||
    arg2 === null ||
    typeof arg2 !== "object"
  )
    return false

  let arg1keys = Object.keys(arg1)
  let arg2keys = Object.keys(arg2)

  if (arg1keys.length !== arg2keys.length) return false

  for (let key of arg1keys) {
    if (!arg2keys.includes(key) || !deepEqual(arg1[key], arg2[key])) {
      return false
    }
  }

  return true
}

let obj = { here: { is: "an" }, object: 2 }
console.log(deepEqual(obj, obj))
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }))
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }))
// → true
