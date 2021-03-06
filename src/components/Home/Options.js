import React, { Component } from "react";
import styled from "styled-components";
import theme from "constants/theme";

import { CSSTransition } from "react-transition-group";

import { TransparentButton } from "components/generic/Buttons";

const OptionsGroup = styled.div`
  position: absolute;
  width: 100%;

  top: 250px;

  * {
    color: white;
  }
  p {
    font-weight: 600;
  }

  /* .options-enter {
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
  } */
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

const Options = props => {
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
            <h2>Pace:</h2>
            <TransparentButton
              active={props.pace}
              name="lightning"
              color={theme.colors.hoverblue}
              onClick={() => props.setPace("lightning")}
            >
              <p>Lightning</p>
            </TransparentButton>
            <TransparentButton
              active={props.pace}
              name="normal"
              color={theme.colors.hoverblue}
              onClick={() => props.setPace("normal")}
            >
              <p>Normal</p>
            </TransparentButton>
            <TransparentButton
              active={props.pace}
              name="creative"
              color={theme.colors.hoverblue}
              onClick={() => props.setPace("creative")}
            >
              <p>Creative</p>
            </TransparentButton>
          </OptionSection>
          {/* <OptionSection>
            <h2>Length:</h2>
            <TransparentButton
              active={props.length}
              name="full"
              color={theme.colors.hoverblue}
              onClick={() => props.setLength("full")}
            >
              <p>Full Page</p>
            </TransparentButton>
            <TransparentButton
              active={props.length}
              name="half"
              color={theme.colors.hoverblue}
              onClick={() => props.setLength("half")}
            >
              <p>Half Page</p>
            </TransparentButton>
          </OptionSection> */}
        </div>
      </CSSTransition>
    </OptionsGroup>
  );
};

export default Options;
