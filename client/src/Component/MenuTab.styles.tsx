import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Color from '../Themes/Color';

export const menuStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 350,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('sm')]: {
                width: 250,
            },
        },
        header: {
            padding: theme.spacing(1),
            margin: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: Color.hoverLight,
            },
        },
        links: {
            marginTop: theme.spacing(1),
            overflow: 'auto',
            border: '1px solid',
            borderColor: Color.borderLight,
            flexDirection: 'column',
            display: 'flex',
        },
        link: {
            padding: theme.spacing(1),
            border: '1px solid',
            borderColor: Color.borderLight,
            borderRadius: 0,
        },
        logout: {
            alignContent: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginTop: 'auto',
        },
        button: {
            width: '100%',
            padding: theme.spacing(1),
            overflow: 'auto',
            border: '1px solid',
            borderColor: Color.borderLight,
            borderRadius: 0,
            flexDirection: 'column',
            display: 'flex',
        },
    })
);
