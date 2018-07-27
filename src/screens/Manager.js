import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import theme from "constants/theme";
import viewport from "constants/viewport";

import Section from "components/generic/Section";
import ContentWrapper from "components/generic/ContentWrapper";
import RoundButton from "components/generic/RoundButton";

const StyledManager = styled.div`
  .header {
    z-index: 5;
    position: fixed;
    background-color: ${theme.colors.primary2};
    width: 100%;
    height: 56px;
    top: 0;

    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);

    div {
      float: right;
      margin-right: 10px;
    }
  }

  .page-section {
    padding-top: 56px;
  }
`;

const PageListContainer = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const StyledPageItem = styled.div`
  background: white;
  width: 200px;
  height: 250px;

  padding: 12px;
  margin: 25px;

  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  border-radius: 10px;

  p {
    font-size: 10px;
  }

  overflow: hidden;
`;

const PageItem = props => {
  return (
    <StyledPageItem>
      <h4>{props.title}</h4>
      <p>{props.content}</p>
    </StyledPageItem>
  );
};

class Manager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledManager>
        <div className="header">
          <RoundButton
            name="back"
            color={theme.colors.secondary2}
            onClick={() => this.props.history.push("/")}
          >
            <p>Start New</p>
          </RoundButton>
        </div>
        <Section className="page-section" color={theme.colors.primary4}>
          <ContentWrapper>
            <PageListContainer>
              {this.props
                .getPages()
                .slice(0)
                .reverse()
                .map(page => (
                  <PageItem title={page.title} content={page.content} />
                ))}
            </PageListContainer>
          </ContentWrapper>
        </Section>
      </StyledManager>
    );
  }
}

export default withRouter(Manager);
