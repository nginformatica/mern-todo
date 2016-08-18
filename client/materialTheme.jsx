import { 
    deepPurple500,
    deepPurple700,
    deepOrangeA400
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const AppTheme = getMuiTheme({
    palette: {
        primary1Color: deepPurple500,
        primary2Color: deepPurple700,
        accent1Color: deepOrangeA400
    }
});

export default AppTheme;