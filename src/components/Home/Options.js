import React, { Component } from "react";
import styled from "styled-components";
import theme from "constants/theme";

import { CSSTransition } from "react-transition-group";

import RoundButton from "components/generic/RoundButton";

const OptionsGroup = styled.div`
  position: absolute;
  width: 100%;

  top: 300px;

  * {
    color: white;
  }
  p {
    font-weight: 600;
  }

  .options-enter {
    opacity: 0.01;
    transform: scale(0.5) translateY(-100%);
  }
  .options-enter-active {
    opacity: 1;
    transform: scale(1) translateY(0%);
    transition: all 500ms ease-in-out;
  }
  .options-exit {
    opacity: 1;
    transform: scale(1) translateY(0%);
  }
  .options-exit-active {
    opacity: 0;
    transform: scale(0.5) translateY(-100%);
    transition: all 500ms ease-in-out;
  }
`;

const OptionSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin-top: 10px;
    margin-right: 25px;
  }
`;

const Options = () => {
  return (
    <OptionsGroup>
      <CSSTransition
        in={window.location.pathname === "/"}
        timeout={500}
        classNames="options"
        unmountOnExit
      >
        <div>
          <OptionSection>
            <h2>Speed:</h2>
            <RoundButton transparent color={theme.colors.secondary4}>
              <p>Lightning</p>
            </RoundButton>
            <RoundButton transparent color={theme.colors.secondary4}>
              <p>Normal</p>
            </RoundButton>
            <RoundButton transparent color={theme.colors.secondary4}>
              <p>Creative</p>
            </RoundButton>
          </OptionSection>
          <OptionSection>
            <h2>Length:</h2>
            <RoundButton transparent color={theme.colors.secondary4}>
              <p>Full Page</p>
            </RoundButton>
            <RoundButton transparent color={theme.colors.secondary4}>
              <p>Half Page</p>
            </RoundButton>
          </OptionSection>
        </div>
      </CSSTransition>
    </OptionsGroup>
  );
};

export default Options;
