import React from 'react';
import styled from 'styled-components';

import withThemeContext from './withThemeContext';

const Button = styled.button`
  background: aquamarine;
  font-size: 24px;

  min-width: 10vh;

  // border: 2px solid lightgray;
  cursor: pointer;
`;

const ThemeButton = styled(Button)`
  background: ${({ theme }) => theme.button}; // e.g. aquamarine

  &.checked,
  &.active,
  &.focus {
    background: ${({ theme }) => theme.buttonHighlight};
  }
`;

const ThemedButton = withThemeContext(ThemeButton);

export default Button;
export { ThemedButton };
