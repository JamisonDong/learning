// export default function (store) {
//   return function (next) {
//     return function (action) {

//     }
//   }
// }

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default store => next => action => {
  console.log(store);
  console.log(action);
  next(action)
}