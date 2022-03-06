import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Color from "./Color";

let Theme = createTheme({
    palette: {
        primary: {
            main: Color.primaryLight,
        },
        secondary: {
            main: Color.secondaryLight
        },
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;