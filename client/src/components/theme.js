import { createMuiTheme } from "@material-ui/core/styles";

const white = "#fff";
const arcOrange = "#0296f6";
const arcGrey = "#868686";

export default createMuiTheme({
    palette: {
        common: {
            blue: white,
            orange: arcOrange
        },
        primary: {
            main: white
        },
        secondary: {
            main: arcOrange
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            color: "white",
            fontSize: "1rem"
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "1rem",
            textTransform: "none",
            color: "white"
        },
        h2: {
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: "2.5rem",
            color: white,
            lineHeight: 1.5
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",
            color: white
        },
        h4: {
            fontFamily: "Raleway",
            fontSize: "1.75rem",
            color: white,
            fontWeight: 700
        },
        h6: {
            fontWeight: 500,
            fontFamily: "Raleway",
            color: white
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: arcGrey
        },
        subtitle2: {
            color: "white",
            fontWeight: 300,
            fontSize: "1.25rem"
        },
        body1: {
            fontSize: "1.25rem",
            color: arcGrey,
            fontWeight: 300
        },
        caption: {
            fontSize: "1rem",
            fontWeight: 300,
            color: arcGrey
        },
        learnButton: {
            borderColor: white,
            borderWidth: 2,
            textTransform: "none",
            color: white,
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold"
        }
    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: white,
                fontSize: "1rem"
            }
        },
        MuiInput: {
            root: {
                color: arcGrey,
                fontWeight: 300
            },
            underline: {
                "&:before": {
                    borderBottom: `2px solid ${white}`
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                    borderBottom: `2px solid ${white}`
                }
            }
        }
    }
});
