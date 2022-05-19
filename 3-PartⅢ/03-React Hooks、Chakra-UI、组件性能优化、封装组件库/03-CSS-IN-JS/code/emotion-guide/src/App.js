import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Css from './Css';

// const primaryColor = props => css`
//   color: ${props.colors.primary};
//   width: 100px;
//   height: 100px;
//   background: skyblue;
// `


const primaryColor = props => css({
  color: props.colors.primary,
  // width: 100,
  // height: 100,
  background: 'pink'
})

function App () {
  console.log(useTheme());
  return <div css={primaryColor}>
    <Css css={primaryColor} />
  </div>;
}


export default App;

