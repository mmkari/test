import React from 'react';
import styled from 'styled-components';

// import withThemeContext from './withThemeContext';

const Input = styled.input`
  height: 50px;
  min-width: 10vh;
  font-size: 30px;
`;

// const ThemeButton = styled(Button)`
//   background: ${({ theme }) => theme.button}; // e.g. aquamarine

//   &.checked,
//   &.focus {
//     background: ${({ theme }) => theme.buttonHighlight};
//   }
// `;

// const ThemedButton = withThemeContext(ThemeButton);

export default Input;
// export { ThemedButton };
