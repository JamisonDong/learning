import mountElement from "./mountElement"
import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode"

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  // 判断旧的DOM对象是否存在 存在则删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  // 将转换之后的DOM对象放置在页面中
  container.appendChild(newElement)
  let component = virtualDOM.component
  if (component) {
    component.setDOM(newElement)
  }
};
