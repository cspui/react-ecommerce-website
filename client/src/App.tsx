import React from 'react';

// styles
import { appStyles, } from "./App.styles";

// theme
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from './Themes/Theme';

import Navigator from './Navigator/Navigator';

const App = () => {
  const classes = appStyles();

  return (
    <ThemeProvider theme={Theme}>
      {/* <Wrapper> */}
      <div className={classes.root}>
        <Navigator />
      </div>
      {/* </Wrapper> */}
    </ThemeProvider>
  );
}

export default App;
