// static 方法

class Person {
  constructor (name) {
    this.name = name
  }

  say () {
    console.log(`hi, my name is ${this.name}`)
  }

  static create (name) {
    return new Person(name)
  }
}
// !静态方法由类本身去调用
const tom = Person.create('tom')
tom.say()
