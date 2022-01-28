import React from 'react';

// styles
import { Wrapper, } from "./App.styles";

// theme
import { ThemeProvider } from "@material-ui/core/styles";
import theme from './Themes/theme';

import Navigator from './Navigator/navigator';

const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>

        <Navigator />

      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
