import React from 'react';

// styles
import { Wrapper, } from "./App.styles";

// theme
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from './Themes/theme';

import Navigator from './Navigator/navigator';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: -9,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 30,
      marginRight: 30,
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {/* <Wrapper> */}
      <div className={classes.root}>
        <Navigator />
      </div>
      {/* </Wrapper> */}
    </ThemeProvider>
  );
}

export default App;
