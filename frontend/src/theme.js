// Third Party Imports.
import { InputBase, alpha, createTheme } from "@mui/material";
import styled from "@emotion/styled";

// Theme.
export let theme = createTheme({
    // Theme customization goes here as usual, including tonalOffset and/or
    // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
        salmon: {
            main: "#ff9d9d",
            contrastText: "#000000"
        },
        primaryButton: {
            main: "#162D3A",
            contrastText: "#ffffff",
        },
        primary: {
            main: "#162D3A",
        },
        secondary: {
            main: "#313957",
        },
        tertiary: {
            main: "#F7FBFF",
        },
    },
    typography: {
        // Add Popins font
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
});




// Input Form.
export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(1),
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
        border: "1px solid",
        borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
        fontSize: 16,
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));