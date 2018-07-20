import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";
import viewport from "constants/viewport";
import theme from "constants/theme.js";

import { CSSTransition } from "react-transition-group";
import RoundButton from "components/generic/RoundButton";

const StyledBegin = styled.div`
  text-align: center;

  .hover-hitbox {
    z-index: 100;
    position: absolute;

    width: 50%;
    height: 200px;
    border-radius: 100px;

    bottom: 200px;
    left: 50%;
    transform: translateX(-50%);

    :hover {
      cursor: pointer;
    }
  }

  .bg_container {
    overflow: hidden;
    z-index: -1;
    position: absolute;

    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .begin-enter {
    opacity: 0.01;
    transform: scale(0.5) translateY(-100%);
  }
  .begin-enter-active {
    opacity: 1;
    transform: scale(1) translateY(0%);
    transition: all 500ms ease-in-out;
  }
  .begin-exit {
    opacity: 1;
    transform: scale(1) translateY(0%);
  }
  .begin-exit-active {
    opacity: 0;
    transform: scale(0.5) translateY(-100%);
    transition: all 500ms ease-in-out;
  }
`;

const BeginButton = styled.div`
  position: absolute;
  width: 100%;

  bottom: 300px;

  transition: all 300ms ease-in-out;
  transform-origin: center bottom;
  transform: ${props => (props.hover ? "scale(1.1)" : "scale(1)")};
`;

const PaperGraphic = styled.div`
  position: absolute;
  background-color: ${theme.colors.gray1};

  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;

  width: 600px;
  height: 275px;

  border-radius: 25px 25px 0px 0px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.15);

  transition: transform 300ms ease-in-out;
  transform-origin: bottom;
  transform: ${props => (props.hover ? "translateY(0px)" : "translateY(50px)")};
`;

const HoverBg = styled.div`
  position: absolute;
  z-index: -1;

  width: 100%;
  height: 100%;
  border-radius: ${props => (props.hover ? "0px" : "300px 300px 0px 0px;")};

  background-color: ${theme.colors.secondary2};
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;

  transition: all 300ms ease-out;
  transform: ${props => (props.hover ? "scale(1)" : "scale(0.3,0)")};
  transform-origin: center bottom;
`;

class Begin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleHover = hoverState => {
    this.setState({ hover: hoverState });
  };
  render() {
    return (
      <StyledBegin>
        <div
          className="hover-hitbox"
          onMouseEnter={() => this.handleHover(true)}
          onMouseLeave={() => this.handleHover(false)}
          onClick={() => this.props.history.push("/write")}
        />
        <BeginButton hover={this.state.hover}>
          <h1>Start Writing!</h1>
        </BeginButton>
        <CSSTransition
          in={window.location.pathname === "/"}
          timeout={500}
          classNames="begin"
          unmountOnExit
        >
          <div className="bg_container">
            <HoverBg hover={this.state.hover} />
            <PaperGraphic hover={this.state.hover} draggable="false" />
          </div>
        </CSSTransition>
      </StyledBegin>
    );
  }
}

export default withRouter(Begin);
