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

const StyledEditorPage = styled.div`
  background-color: ${theme.colors.secondary2};
  position: relative;

  .hover-hitbox {
    display: ${props => (props.display ? "block" : "none")};
    z-index: 100;
    position: absolute;

    width: 50%;
    height: 125px;
    border-radius: 100px;

    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);

    :hover {
      cursor: pointer;
    }
  }
  .bg_container {
    overflow: hidden;
    position: fixed;

    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
`;

const HoverBg = styled.div`
  position: fixed;
  z-index: 100;

  width: 100vw;
  height: 100vh;
  border-radius: ${props => (props.hover ? "0px" : "300px 300px 100px 100px;")};

  background-color: ${theme.colors.hoverblue};
  margin: auto;
  top: 0;
  left: 0;

  transition: all 200ms ease-out;
  transform: ${props => (props.hover ? "scale(1)" : "scale(0.3,0)")};
  transform-origin: center bottom;
`;

const SubmitButton = styled.div`
  display: ${props => (props.display ? "block" : "none")};
  position: absolute;
  text-align: center;

  width: 100%;
  bottom: 100px;
  left: 0px;
  text-align: center;

  transition: all 100ms ease-out;
  transform: ${props => (props.hover ? "scale(1.25)" : "scale(1)")};
`;

const StyledEditor = styled.div`
  z-index: 2;
  position: relative;
  user-select: none;

  background-color: ${theme.colors.gray1};
  border-radius: 15px;
  padding: 50px 60px;
  min-height: 1000px;

  margin-top: 200px;
  margin-bottom: 175px;

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

    let pace;
    props.pace === "lightning"
      ? (pace = 20)
      : props.pace === "normal"
        ? (pace = 60)
        : (pace = 120);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("    ")
      ),
      initialTime: pace,
      time: pace,
      warningMode: "normal",
      submit: false,
      hover: false
    };
  }

  handleHover = hoverState => {
    this.setState({ hover: hoverState });
  };

  resetTime = () => {
    this.setState({ time: this.state.initialTime });
  };

  decrementTime = () => {
    this.setWarningMode();
    this.setState({ time: this.state.time - 1 });
  };

  setWarningMode = () => {
    if (this.state.time > this.state.initialTime * 0.6) {
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
    //currently not working: cant scroll properly when there is only one large content block.
    // let draftEditor = null;
    // this.getSelectedBlockElement() !== null
    //   ? (draftEditor = this.getSelectedBlockElement())
    //   : (draftEditor = document.getElementsByClassName("DraftEditor-root")[0]);
    // //calculate offsetTop to scroll to.
    // const draftEditorLoc = draftEditor.offsetTop + draftEditor.clientHeight;
    // window.scroll({
    //   top: Math.max(0, draftEditorLoc - 100),
    //   left: 0,
    //   behavior: "smooth"
    // });
  };

  canSubmit = () => {
    const draftEditor = document.getElementsByClassName("DraftEditor-root")[0];
    return draftEditor.clientHeight >= 896;
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

    this.setState({ submit: this.canSubmit() });
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
      <StyledEditorPage display={this.state.submit}>
        <div className="bg_container">
          <HoverBg hover={this.state.hover} />
        </div>
        <Section>
          <ContentWrapper>
            <Prompt
              when={true}
              message="You haven't finished your writing sprint. You will lose your progress if you leave now. Are you sure you want to leave?"
            />
            <StyledEditor
              // Prevents user from copying or dragging text outside of the editor.
              onCopy={e => e.preventDefault()}
              onPaste={e => e.preventDefault()}
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
            <div
              className="hover-hitbox"
              onMouseEnter={() => this.handleHover(true)}
              onMouseLeave={() => this.handleHover(false)}
              onClick={() => this.props.history.push("/")}
            />
            <SubmitButton display={this.state.submit} hover={this.state.hover}>
              <h1>Finish</h1>
            </SubmitButton>
          </ContentWrapper>
        </Section>
      </StyledEditorPage>
    );
  }
}

export default MyEditor;
