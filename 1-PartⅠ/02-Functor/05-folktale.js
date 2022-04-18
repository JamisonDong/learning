const { compose, curry } = require('folktale/core/lambda')
const { toUpper, first } = require('lodash/fp')
// let f = curry(2, (x, y) => x + y)

// console.log(f(1,2));
// console.log(f(1,3));

let f = compose(toUpper, first)
console.log(f(['asfa','sfa']));