import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
// https://material-ui.com/customization/theming/#unstable-createmuistrictmodetheme-options-args-theme
const reelBlue = '#2a6db0';
const reelLightBlue = '#bde0eb';
const reelGrey = '#868686';
const reelRed = '#b02a2a';
const gradientBlue = `linear-gradient(45deg, #17a3c3, ${reelBlue})`;

const defaultTheme = createMuiTheme();
export default createMuiTheme({
  palette: {
    primary: {
      main: reelBlue,
      light: reelLightBlue,
    },
    secondary: {
      main: reelRed,
    },
    error: {
      main: reelRed,
    },
  },
  typography: {
    h2: {
      fontFamily: "Roboto, 'Segoe UI', sans-serif",
      fontWeight: 700,
      fontSize: '2rem',
      color: reelBlue,
    },
    h3: {
      fontSize: '1rem',
      fontFamily: "Roboto, 'Segoe UI', sans-serif",
      color: reelBlue,
      fontWeight: 700,
    },
    h4: {
      fontSize: '0.8rem',
      fontFamily: "Roboto, 'Segoe UI', sans-serif",
      color: reelBlue,
      fontWeight: 700,
    },
    h5: {
      fontSize: '0.8rem',
      fontFamily: "Roboto, 'Segoe UI', sans-serif",
      color: reelBlue,
      fontWeight: 700,
    },
    subtitle1: {
      color: reelGrey,
      fontSize: '1rem',
      fontWeight: 300,
    },
    subtitle2: {
      color: reelGrey,
      fontSize: '1rem',
      fontWeight: 200,
      [defaultTheme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1.25rem',
      color: reelGrey,
      fontWeight: 300,
    },
    body2: {
      fontSize: '1.25rem',
      color: 'white',
      fontWeight: 300,
    },
    caption: {
      fontSize: '1rem',
      fontWeight: 300,
      color: reelGrey,
    },
  },
  overrides: {
    MuiTypography: {
      h3: {
        fontFamily: 'Helvetica',
        fontWeight: 800,
        fontStyle: 'italic',
        letterSpacing: '-0.15rem',
        textTransform: 'capitalize',
        fontSize: '2rem',
        lineHeight: 0.8,
      },
      h4: {
        fontFamily: 'Helvetica',
        fontWeight: 800,
        fontStyle: 'italic',
        letterSpacing: '-0.10rem',
        textTransform: 'capitalize',
        fontSize: '1.3rem',
        lineHeight: 0.8,
      },
      h6: {
        fontFamily: 'Helvetica',
        fontWeight: 800,
        fontStyle: 'italic',
        letterSpacing: '-0.05rem',
        textTransform: 'capitalize',
        fontSize: '1rem',
        lineHeight: 0.8,
      },
    },
    MuiButton: {
      root: {
        fontFamily: "Roboto, 'Segoe UI', sans-serif",
        padding: '2px 10px',
        position: 'inherit',
      },
      containedPrimary: {
        backgroundImage: gradientBlue,
      },
    },
    MuiInputLabel: {
      root: {
        color: reelBlue,
        fontSize: '1rem',
      },
    },
    MuiInput: {
      root: {
        color: reelGrey,
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid ${reelBlue}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${reelBlue}`,
        },
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: '0.7rem',
        '&$error': { color: reelRed },
      },
    },

    // Data table
    MuiTableCell: {
      root: {
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '0.8rem',
          paddingTop: '0.6em',
          paddingBottom: '0.6em',
        },
      },
    },

    MuiTablePagination: {
      actions: {
        '& button': {
          [defaultTheme.breakpoints.down('xs')]: {
            padding: '0.4em',
          },
        },
      },
      caption: {
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '0.9rem',
        },
      },
      toolbar: {
        minHeight: '2.5em',
      },
    },

    MuiTableBody: {
      root: {
        '&:nth-child(1)': {
          backgroundColor: '#FF0000',
        },
      },
    },
    MuiAppBar: {
      root: {
        backgroundImage: gradientBlue,
      },
    },
    MuiFab: {
      root: {
        backgroundImage: gradientBlue,
      },
    },
    MuiBottomNavigationAction: {
      label: {
        fontFamily: 'Helvetica',
        fontWeight: 800,
        fontStyle: 'italic',
        letterSpacing: '-0.05rem',
        textTransform: 'capitalize',
        fontSize: '0.8rem',
        lineHeight: 0.8,
        '&$selected': {
          fontSize: '0.8rem',
          letterSpacing: 0,
          fontWeight: 800,
        },
      },
      root: {
        '&$selected': {
          fontSize: '0.7rem',
          color: 'white',
          backgroundImage: gradientBlue,
        },
      },
    },
  },
});
