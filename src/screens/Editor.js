import React from "react";
import ReactDOM from "react-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding
} from "draft-js";

import ContentWrapper from "components/generic/ContentWrapper";

import styled from "styled-components";

const StyledEditor = styled.div`
  background-color: lightblue;
  border-radius: 15px;
  padding: 25px;
  min-height: 1280px;

  margin-top: 200px;

  ::selection {
    color: rbga(0, 0, 0, 0); /* WebKit/Blink Browsers */
  }
  user-select: none;

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
      editorState: EditorState.createEmpty(),
      initialTime: 60,
      time: 60
    };
    setInterval(() => this.decrementTime(), 1000);
  }

  componentDidMount = () => {
    //set Focus on mount
    let editorState = this.state.editorState;

    if (!editorState.getSelection().getHasFocus()) {
      editorState = EditorState.moveFocusToEnd(editorState);
    }

    this.setState({
      editorState
    });
  };

  resetTime = () => {
    this.setState({ time: this.state.initialTime });
  };

  decrementTime = () => {
    this.setState({ time: this.state.time - 1 });
  };

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

  onChange = editorState => {
    this.setState({ editorState });
    this.checkPeriod(
      editorState
        .getCurrentContent()
        .getFirstBlock()
        .getText()
    );
  };

  render() {
    return (
      <ContentWrapper>
        {console.log(
          this.state.editorState
            .getCurrentContent()
            .getFirstBlock()
            .getText()
        )}
        {this.state.time}
        <StyledEditor
          // Prevents user from copying or dragging text outside of the editor.
          onCopy={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
        >
          <Editor
            spellCheck
            autoCorrect
            autoCapitalize
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </StyledEditor>
      </ContentWrapper>
    );
  }
}

export default MyEditor;
