//? Methods

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`)
}
let whiteRabbit = { type: "white", speak }
let hungryRabbit = { type: "hungry", speak }

whiteRabbit.speak("Oh my fur and whiskers")
// → The white rabbit says 'Oh my fur and whiskers'
hungryRabbit.speak("Got any carrots?")
// → The hungry rabbit says 'Got any carrots?'

/*

You can think of this as an extra parameter that is passed 
to the function in a different way than regular parameters. 
If you want to provide it explicitly, you can use a function’s
call method, which takes the this value as its first argument
and treats further arguments as normal parameters.

*/

speak.call(whiteRabbit, "Hurry")
// -> The white rabbit says 'Hurry'

//! Arrow functions can see the "this" binding of the scope
//! around them.

let finder = {
  find(array) {
    return array.some((v) => v == this.value)
  },
  value: 5,
}
console.log(finder.find([4, 5]))
// -> true

//? Overriding derived properties

/*

When you add a property to an object, whether it is present 
in the prototype or not, the property is added to the object 
itself. If there was already a property with the same name 
in the prototype, this property will no longer affect the 
object, as it is now hidden behind the object’s own property.

*/

class Rabbit {
  constructor(type) {
    this.type = type
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
  }
}

let killerRabbit = new Rabbit("killerRabbit")

Rabbit.prototype.teeth = "small"
console.log(killerRabbit.teeth)
// → small
killerRabbit.teeth = "long, sharp, and bloody"
console.log(killerRabbit.teeth)
// → long, sharp, and bloody
console.log(new Rabbit("basic").teeth)
// → small
console.log(Rabbit.prototype.teeth)
// → small

//? Exercise - A Vector Type

class Vec {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  plus(otherVector) {
    return new Vec(this.x + otherVector.x, this.y + otherVector.y)
  }

  minus(otherVector) {
    return new Vec(this.x - otherVector.x, this.y - otherVector.y)
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)))
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)))
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length)
// → 5

//? Exercise - Groups

class Group {
  constructor() {
    this.members = []
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value)
    }
  }

  delete(value) {
    this.members = this.members.filter((member) => member !== value)
  }

  has(value) {
    return this.members.includes(value)
  }

  static from(iterable) {
    let group = new Group()
    for (let value of iterable) {
      group.add(value)
    }
    return group
  }
}

let group = Group.from([10, 20])
console.log(group.has(10))
// → true
console.log(group.has(30))
// → false
group.add(10)
group.delete(10)
console.log(group.has(10))
// → false

//? Exercise - Iterable Groups

class Group2 {
  constructor() {
    this.members = []
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value)
    }
  }

  delete(value) {
    this.members = this.members.filter((member) => member !== value)
  }

  has(value) {
    return this.members.includes(value)
  }

  static from(iterable) {
    let group = new Group2()
    for (let value of iterable) {
      group.add(value)
    }
    return group
  }

  [Symbol.iterator]() {
    let index = 0
    let members = this.members

    return {
      next() {
        if (index < members.length) {
          return { value: members[index++], done: false }
        } else {
          return { done: true }
        }
      },
    }
  }
}

for (let value of Group2.from(["a", "b", "c"])) {
  console.log(value)
}
// → a
// → b
// → c
