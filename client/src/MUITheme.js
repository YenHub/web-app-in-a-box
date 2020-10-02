import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const MUITheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00d0ff',
    },
    secondary: {
      main: '#5700d9',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    }
  },
});

export default MUITheme;
