/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default store => next => action => {
  console.log("testzhixingle");
  next(action)
}