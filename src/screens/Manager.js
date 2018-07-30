import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";
import theme from "constants/theme";
import viewport from "constants/viewport";

import PageItem from "components/Manager/PageItem";
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
                  <PageItem
                    title={page.title}
                    content={page.content}
                    pageID={page._id}
                    deletePage={this.props.deletePage}
                  />
                ))}
            </PageListContainer>
          </ContentWrapper>
        </Section>
      </StyledManager>
    );
  }
}

export default withRouter(Manager);
