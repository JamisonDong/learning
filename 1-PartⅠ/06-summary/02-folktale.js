const Maybe = require('folktale/maybe')

const toRMB = s => Maybe.fromNullable(s)
  .map(v => v.replace("$", ""))
  .map(parseFloat)
  .map(v => v * 7)
  .map(v => v.toFixed(2))
  .map(v => "￥" + v)
  .getOrElse()

console.log(toRMB('$299.9'));