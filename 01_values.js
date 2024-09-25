// Caner Tüysüz, 25/09/2024
// If you want colored comments to be applied, you can install
// "Better Commands" from VS Code Extensions

//? Unary operators
//! typeof is an Unary operator
//! Other Unary operators are: +,-,++,--,!,~,delete,void,await
console.log(typeof 4.5, typeof "x")

//? Comparison
console.log("A" < "Z")
// -> True
console.log("a" < "z")
// -> True
console.log("a" > "Z")
// -> True
console.log(NaN !== NaN)
// -> True

/* 
NaN is supposed to denote the result of a nonsensical 
computation, and as such, it isn’t equal to the result of any 
other nonsensical computations.
*/

//? Logical Operators
console.log(true && false)
// -> False
console.log(false || true)
// -> True

// Due to a historical quirk, null is type of object in javascript

//? Type Coercion
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true
console.log(null == undefined)
// → true

//? Short-circuiting of logical operators

// || Operator return teh value to it's left when that value
// can be converted to true. And on it's right otherwise.
console.log(null || "user")
// -> user
console.log("Agnes" || "user")
// -> Agnes

//! 0, NaN, and the empty string ("") counted as false

//! X will be ignored and not being evaluated in those cases:
//! true || X, false && X
