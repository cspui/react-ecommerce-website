import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Color from "./Color";

let Theme = createTheme({
    palette: {
        primary: {
            main: Color.primary
        },
        secondary: {
            main: Color.secondary
        },
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;