// 判断是否为组件
export default function isFunction (virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function'
};
