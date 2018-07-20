import styled from "styled-components";
import theme from "constants/theme";

const RoundButton = styled.div`
  display: inline-block;
  margin: 8px;
  padding: 7px 18px;
  background-color: ${props =>
    props.transparent ? "rgba(0,0,0,0.25)" : theme.colors.secondary2};

  border-radius: 20px/50%;

  > * {
    color: white;
  }

  :hover {
    cursor: pointer;
    background-color: ${theme.colors.secondary2};
  }
`;

export default RoundButton;
