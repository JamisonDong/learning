"use strict";
// 元组（Tuple）
Object.defineProperty(exports, "__esModule", { value: true });
const tuple = [18, 'zce'];
// const age = tuple[0]
// const name = tuple[1]
const [age, name] = tuple;
// ---------------------
const entries = Object.entries({
    foo: 123,
    bar: 456
});
const [key, value] = entries[0];
// key => foo, value => 123
//# sourceMappingURL=06-tuple-types.js.map