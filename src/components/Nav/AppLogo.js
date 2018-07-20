import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import styled from 'styled-components';
import logo from 'media/App-Logo.png';

const StyledAppLogo = styled.img `
  width: 36px;
  height: 36px;
  margin: auto;

  :hover {
    cursor: pointer;
  }
`;

const AppLogo = (props) => {
  return (<StyledAppLogo src={logo} onClick={() => props.history.push('/')}/>);
}

export default withRouter(AppLogo);