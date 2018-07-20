import styled from 'styled-components'
import theme from 'constants/theme'

const NavButton = styled.div `

  float: ${props => props.float};

  height: 56px;
  padding: 18px 10px;

  > p {
    font-size: 16px;
    color: ${theme.colors.lightgray};
    text-decoration: none;
  }

  :hover {
    cursor: pointer;
  }
`;

export default NavButton;