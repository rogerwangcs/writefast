import React from "react";
import { Prompt } from "react-router";
import { Editor, EditorState, ContentState, Modifier } from "draft-js";
import * as Scroll from "react-scroll";
import { animateScroll } from "react-scroll";

import styled, { keyframes } from "styled-components";
import theme from "constants/theme";
import viewport from "constants/viewport";

import Section from "components/generic/Section";
import ContentWrapper from "components/generic/ContentWrapper";

const warning_extreme = keyframes`
  from {
    box-shadow: 0px 0px 75px 15px rgba(255, 0, 0, 1);
  }

  to {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.15);
  }
`;

const warning_mild = keyframes`
  from {
    box-shadow: 0px 0px 30px 3px rgba(255, 0, 0, 1);
  }

  to {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.15);
  }
`;

const StyledEditor = styled.div`
  position: relative;
  user-select: none;

  background-color: ${theme.colors.gray1};
  border-radius: 15px;
  padding: 50px 60px;
  min-height: 1000px;

  margin-top: 200px;
  margin-bottom: 300px;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.15);

  animation-name: ${props => {
    if (props.warningMode === "normal") return "normal";
    else if (props.warningMode === "mild") return warning_mild;
    else return warning_extreme;
  }};
  animation-duration: ${props => {
    if (props.warningMode === "normal") return "800ms";
    else if (props.warningMode === "mild") return "800ms";
    else return "300ms";
  }};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  * {
    user-select: none;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    line-height: 32px;
    letter-spacing: 1px;
  }
`;

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("    ")
      ),
      initialTime: 60,
      time: 60,
      warningMode: "normal"
    };
  }

  resetTime = () => {
    this.setState({ time: this.state.initialTime });
  };

  decrementTime = () => {
    this.setWarningMode();
    this.setState({ time: this.state.time - 1 });
  };

  setWarningMode = () => {
    if (this.state.time > this.state.initialTime / 2) {
      this.setState({ warningMode: "normal" });
    } else if (this.state.time > 10) {
      this.setState({ warningMode: "mild" });
    } else {
      this.setState({ warningMode: "extreme" });
    }
  };

  //determine if the timer should be reset by counting last sentence word length.
  checkPeriod = text => {
    const endPunct = [".", "?", "!"];
    const sentWordMin = 6;

    const lastChar = text.slice(-1);
    const lastSent = text.split(/[.!?]/).slice(-2, -1)[0];

    if (lastSent != null) {
      let lastSentWordLen = 0;
      lastSent.split(" ").map(word => {
        //SpellChecking goes here.
        lastSentWordLen++;
      });

      if (endPunct.indexOf(lastChar) >= 0 && lastSentWordLen >= sentWordMin) {
        this.resetTime();
      }
    }
  };

  //focus into the draft editor.
  focus = () => {
    let editorState = this.state.editorState;
    if (!editorState.getSelection().getHasFocus()) {
      editorState = EditorState.moveFocusToEnd(editorState);
    }
    this.setState({
      editorState
    });
  };

  //scrolls to current block when user types
  autoScroll = () => {
    let draftEditor = null;
    this.getSelectedBlockElement() !== null
      ? (draftEditor = this.getSelectedBlockElement())
      : (draftEditor = document.getElementsByClassName("DraftEditor-root")[0]);

    //calculate offsetTop to scroll to.
    const draftEditorLoc = draftEditor.offsetTop + draftEditor.clientHeight;

    window.scroll({
      top: Math.max(0, draftEditorLoc - 100),
      left: 0,
      behavior: "smooth"
    });
  };

  //retrieve dom node where draft cursor is located, otherwise, return null.
  getSelectedBlockElement = () => {
    var selection = window.getSelection();
    if (selection.rangeCount == 0) return null;
    var node = selection.getRangeAt(0).startContainer;
    do {
      if (node.getAttribute && node.getAttribute("data-block") == "true")
        return node;
      node = node.parentNode;
    } while (node != null);
    return null;
  };

  //tabs 4 spaces on tab.
  onTab = e => {
    e.preventDefault();
    const tabCharacter = "    ";

    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(
        currentState,
        newContentState,
        "insert-characters"
      )
    });
  };

  onChange = editorState => {
    this.setState({ editorState }, () => this.autoScroll());

    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const text = content.getBlockForKey(selection.getAnchorKey()).getText();
    const anchorText = text.slice(0, selection.getAnchorOffset());

    this.checkPeriod(anchorText);
  };

  componentDidMount = () => {
    //set focus onto editor.
    this.focus();

    //start timeloop
    this.timeLoop = setInterval(() => this.decrementTime(), 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timeLoop);
    clearInterval(this.autoScroll);
  };

  render() {
    return (
      <Section color={theme.colors.secondary2}>
        <ContentWrapper>
          <Prompt
            when={true}
            message="You haven't finished your writing sprint. You will lose your progress if you leave now. Are you sure you want to leave?"
          />
          {this.state.time}
          <StyledEditor
            // Prevents user from copying or dragging text outside of the editor.
            onCopy={e => e.preventDefault()}
            onDragStart={e => e.preventDefault()}
            onClick={() => this.focus()}
            warningMode={this.state.warningMode}
          >
            <Editor
              onTab={this.onTab}
              onChange={this.onChange}
              editorState={this.state.editorState}
            />
          </StyledEditor>
        </ContentWrapper>
      </Section>
    );
  }
}

export default MyEditor;
