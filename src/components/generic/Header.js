import styled from "styled-components";

const Header = styled.div`
  z-index: 1;
  position: ${props => (props.large ? "absolute" : "fixed")};

  width: 100%;
  height: ${props => (props.large ? "300px" : "56px")};
  text-align: center;

  h1 {
    color: white;
    font-style: italic;
    font-weight: 700;
    font-size: 8em;

    transition: transform 500ms cubic-bezier(0.51, 0.02, 0.53, 0.91);
    transform-origin: top;
    transform: ${props =>
      props.large
        ? "scale(1) translateY(75px)"
        : "scale(0.25) translateY(50px)"};
  }
`;

export default Header;
