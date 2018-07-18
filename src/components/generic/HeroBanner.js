import styled from 'styled-components';
import theme from 'constants/theme.js';

const Hero = styled.div `
  background-color: ${theme.colors.tertiary4};
  width: 100%;
  height: 250px;

  padding: 25px;

  color: ${theme.colors.lightgray};

  text-align: center;
  h1 {
    color: white;
    margin-top: 150px;
  }
`;

export default Hero;
