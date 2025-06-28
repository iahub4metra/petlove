import { createTheme } from '@mui/material';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1280,
            lg: 1440,
            xl: 1920,
        },
    },
});
export default theme;
