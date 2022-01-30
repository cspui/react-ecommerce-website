import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createTheme({
    palette: {
        primary: {
            main: '#f3f3f3f4',
        },
        secondary: {
            main: '#000000',
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;