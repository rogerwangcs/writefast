import styled from "styled-components";

const RoundButton = styled.div`
  position: relative;
  display: inline-block;
  margin: 8px;
  padding: 7px 18px;
  background-color: ${props => props.color};

  border-radius: 20px/50%;

  > * {
    color: white;
  }

  :hover {
    cursor: pointer;
    background-color: ${props => props.hoverColor};
  }
`;

const TransparentButton = RoundButton.extend`
  background-color: ${props =>
    props.active === props.name ? props.color : "rgba(0,0,0,0.25)"};

  :hover {
    cursor: pointer;
    background-color: ${props => props.color};
  }
`;

export { RoundButton, TransparentButton };
