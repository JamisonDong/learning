import React, { render } from "./react"
import { Component } from "./react"
const root = document.getElementById("root")

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi Fiber</p>
  </div>
)

render(jsx, root)

setTimeout(() => {
  const jsx = (
    <div>
      <div>奥利给</div>
      {/* <p>Hi Fiber</p> */}
    </div>
  )
  render(jsx, root)
}, 2000)

class Greating extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return <div>{this.props.title}</div>
  }
}

function FnComponent (props) {
  return <div>{props.title}</div>
}

// render(<Greating title="hello react" />, root)