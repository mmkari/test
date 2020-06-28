import * as React from 'react';

const ThemeContext = React.createContext(null);

const withThemeContext = (Component) => (props) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => <Component {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
};

export default withThemeContext;
export { ThemeContext };
