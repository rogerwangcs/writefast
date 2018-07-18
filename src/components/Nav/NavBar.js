import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";
import theme from "constants/theme";

import NavButton from "components/Nav/NavButton";
import RoundButton from "components/generic/RoundButton";
import AppLogo from "components/Nav/AppLogo";

const StyledNav = styled.div`
  position: fixed;
  z-index: 2;

  background-color: ${theme.colors.primary4};
  width: 100vw;
  height: 56px;

  box-shadow: 0 5px 5px -5px #333;
`;

const StyledLeftSide = styled.div`
  display: flex;
  float: left;
  margin-left: 15px;
`;

const StyledRightSide = styled.div`
  display: flex;
  float: right;
`;

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  route = url => {
    this.props.history.push(url);
  };

  render() {
    return (
      <StyledNav>
        <StyledLeftSide>
          <AppLogo />
          <NavButton float="left" onClick={() => this.route("/")}>
            <p>Write Fast</p>
          </NavButton>
        </StyledLeftSide>
      </StyledNav>
    );
  }
}

export default withRouter(Nav);
