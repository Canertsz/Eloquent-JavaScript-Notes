import SCRIPTS from "./scripts.js"

//? Exercise - Flattening

//! without concat
let arrays = [[1, 2, 3], [4, 5], [6]]

let singleArray = arrays.reduce((acc, item) => {
  item.forEach((n) => acc.push(n))
  return acc
})

console.log(singleArray)
// -> [ 1, 2, 3, 4, 5, 6 ]

//! with concat
let arrays2 = [[1, 2, 3], [4, 5], [6]]

let singleArray2 = arrays2.reduce((acc, current) => acc.concat(current))

console.log(singleArray2)
// -> [ 1, 2, 3, 4, 5, 6 ]

//? Exercise - Your Own Loop

const loop = (value, test, update, body) => {
  while (test(value)) {
    body(value)
    value = update(value)
  }
}

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
)
// -> 3
// -> 2
// -> 1

//? Exercise - Everything

const everyLoop = (arr, cond) => {
  for (let e of arr) {
    if (!cond(e)) return false
  }
  return true
}

console.log(everyLoop([1, 3, 5], (n) => n < 10))
// → true
console.log(everyLoop([2, 4, 16], (n) => n < 10))
// → false
console.log(everyLoop([], (n) => n < 10))
// → true

const everySome = (arr, cond) => {
  return !arr.some((e) => !cond(e))
}

console.log(everySome([1, 3, 5], (n) => n < 10))
// → true
console.log(everySome([2, 4, 16], (n) => n < 10))
// → false
console.log(everySome([], (n) => n < 10))
// → true

//? Exercise - Dominant Writing Direction

//! provided on book
function countBy(items, groupName) {
  let counts = []
  for (let item of items) {
    let name = groupName(item)
    let known = counts.find((c) => c.name == name)
    if (!known) {
      counts.push({ name, count: 1 })
    } else {
      known.count++
    }
  }
  return counts
}

//! provided on book
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to
      })
    ) {
      return script
    }
  }
  return null
}

const dominantDirection = (text) => {
  const scriptsCount = countBy(text, (char) => {
    const codePoint = char.codePointAt(0)
    const script = characterScript(codePoint)
    return script ? script.direction : null
  })

  const dominantScript = scriptsCount
    .filter(({ name }) => name !== null)
    .reduce(
      (mostFrequent, current) =>
        current.count > mostFrequent.count ? current : mostFrequent,
      { count: 0 }
    )

  return dominantScript.name || "ltr"
}

console.log(dominantDirection("Hello!"))
// → ltr
console.log(dominantDirection("Hey, مساء الخير"))
// → rtl
