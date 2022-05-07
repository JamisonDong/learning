import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent (virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 是同一个组件
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是同一个组件
    mountElement(virtualDOM, container, oldDOM)
  }
};


// 是否是同一个组件
function isSameComponent (virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
