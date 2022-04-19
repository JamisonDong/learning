"use strict";
// 数组类型
Object.defineProperty(exports, "__esModule", { value: true });
const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}
sum(1, 3, 2);
//# sourceMappingURL=05-array-types.js.map