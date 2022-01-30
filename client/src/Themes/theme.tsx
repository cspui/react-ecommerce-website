import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createTheme({
    palette: {
        primary: {
            main: '#000000dd'
        },
        secondary: {
            main: '#f3f3f3f4'
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;