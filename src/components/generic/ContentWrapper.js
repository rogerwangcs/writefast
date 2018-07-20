import styled from "styled-components";
import theme from "constants/theme";
import viewport from "constants/viewport";

const ContentWrapper = styled.div`
  margin: auto;
  position: relative;

  @media (max-width: ${viewport.MOBILE}) {
    width: 100vw;
    padding: 10px;
  }
  @media (min-width: ${viewport.MOBILE}) {
    width: 90vw;
    padding: 25px;
  }
  @media (min-width: ${viewport.DESKTOP}) {
    width: ${props =>
      props.max ? "1360px" : viewport.DESKTOP_CONTENT_WIDTH + "px"};
    padding: 25px;
  }
`;

export default ContentWrapper;
