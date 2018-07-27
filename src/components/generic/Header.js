import styled from "styled-components";

const Header = styled.div`
  z-index: 10;
  position: ${props => (props.large ? "absolute" : "fixed")};
  top: 0;

  width: 100%;
  height: 300px;
  text-align: center;

  transition: transform 500ms cubic-bezier(0.51, 0.02, 0.53, 0.91);
  transform-origin: top;
  transform: ${props =>
    props.large ? "scale(1)" : "scale(0.25)"};

  h1 {
    color: white;
    font-style: italic;
    font-weight: 700;
    font-size: 8em;
    margin-top: ${props =>
    props.large ? "75px" : "40px"};
  }
`;

export default Header;
