import React, { Component } from "react";
import Clipboard from "react-clipboard.js";
import { toast } from "react-toastify";

import styled from "styled-components";
import theme from "constants/theme";

import { RoundButton } from "components/generic/Buttons";

const StyledPageItem = styled.div`
  transition: transform 200ms ease-in-out;

  :hover {
    transform: translateY(-3px);

    .actions {
      div {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .page-item {
    overflow: hidden;
    background: white;
    width: 200px;
    height: 250px;

    padding: 12px;
    margin: 25px 25px 5px;

    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
    border-radius: 10px;

    p {
      font-size: 10px;
    }
  }
  .actions {
    text-align: center;
    div {
      transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
      transform: scale(0.8);
      opacity: 0;
    }
  }
`;

const PageItem = props => {
  const toastCopy = () => {
    toast.success("Copied to Clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };

  const toastDelete = () => {
    toast.success("Page Deleted!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };

  return (
    <React.Fragment>
      <StyledPageItem>
        <div className="page-item">
          <h4>{props.title}</h4>
          <p>{props.content}</p>
        </div>
        <div className="actions">
          <Clipboard component="a" data-clipboard-text={props.content}>
            <RoundButton
              color={theme.colors.secondary3}
              hoverColor={theme.colors.secondary1}
              onClick={() => toastCopy()}
            >
              <p>Copy</p>
            </RoundButton>
          </Clipboard>
          <RoundButton
            color={theme.colors.red2}
            hoverColor={theme.colors.red1}
            onClick={() => {
              props.deletePage(props.pageID);
              toastDelete();
            }}
          >
            <p>Delete</p>
          </RoundButton>
        </div>
      </StyledPageItem>
    </React.Fragment>
  );
};

export default PageItem;
