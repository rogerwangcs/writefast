import styled from 'styled-components';
import theme from 'constants/theme';

const RoundButton = styled.div `

  height: 32px;
  margin: 10px;
  padding: 6px 15px 0px;
  background-color: ${props => props.color};

  border-radius: 15px/50%;

  color: white;
  font-size: 16px;

  :hover {
    cursor: pointer;
    background-color: ${theme.colors.secondary1};
  }
`;

export default RoundButton;