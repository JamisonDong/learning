// 数组类型

export { }
const array1: Array<number> = [1, 2, 3]

const array2: number[] = [1, 2, 3]

function sum(...args: number[]) {
  return args.reduce((pre, cur) => pre + cur, 0)
}

sum(1,3,2)