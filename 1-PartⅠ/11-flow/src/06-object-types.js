/**
 * 对象类型
 * @flow
 */

const obj1 = { foo: string, bar: number } = { foo: 'string', bar: 100 }
const obj2 = { foo?: string, bar: number } = { bar: 100 }

// 限制键值都为字符串
const obj3: { [string]: string } = {}

