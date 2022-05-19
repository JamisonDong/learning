import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Css from './Css';
import styled from "@emotion/styled"

// const primaryColor = props => css`
//   color: ${props.colors.primary};
//   width: 100px;
//   height: 100px;
//   background: skyblue;
// `

const Button = styled.button`
  width: 100px;
  height: 30px;
  background: ${props => props.bgColor || "skyblue"};

`

const Container = styled.div({
  width: 800,
  background: 'pink'
}, props => ({
  width: props.w || 1000,
  background: "rgba(139, 170, 65, 1)",
  margin: '0 auto'
}))

const primaryColor = props => css({
  color: props.colors.primary,
  // width: 100,
  // height: 100,
  // background: 'pink'
})

function App () {
  console.log(useTheme());
  return <Container
    w={1600}
    css={primaryColor}>
    <Css css={primaryColor} />
    <Button bgColor="blue">我是杨可爱</Button>
  </Container>;
}


export default App;

