import isFunction from "./isFunction"
import mountComponent from "./mountComponent"
import mountNativeElement from "./mountNativeElement"

export default function mountElement (virtualDOM, container) {
  // Component
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container)
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container)
  }
};
