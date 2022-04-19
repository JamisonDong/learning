"use strict";
// 原始数据类型
const a = 'foobar';
const b = 100; // NaN Infinity
const c = true; // false
// 在非严格模式（strictNullChecks）下，
// string, number, boolean 都可以为空
// const d: string = null
// const d: number = null
// const d: boolean = null
const e = undefined;
const f = null;
const g = undefined;
// Symbol 是 ES2015 标准中定义的成员，
// 使用它的前提是必须确保有对应的 ES2015 标准库引用
// 也就是 tsconfig.json 中的 lib 选项必须包含 ES2015
const h = Symbol();
// Promise
// const error: string = 100
//# sourceMappingURL=02-primitive-types.js.map