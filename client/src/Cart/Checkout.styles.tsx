import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Color from '../Themes/Color';

export const CheckoutStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 1500,
            margin: 'auto',
            padding: theme.spacing(1),
            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(0),
                paddingTop: theme.spacing(1),
            },
        },
        content: {
            padding: theme.spacing(0),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(1),
            },
        },
        selectAll: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            backgroundColor: Color.hoverLight,
            borderRadius: '5px',
        },
        items: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            backgroundColor: Color.hoverLight,
            borderRadius: '5px',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
            },
        },
        checkbox: {
            padding: theme.spacing(1),
            color: Color.primaryLight,
        },
        imgBackground: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '200px',
            maxHeight: '200px',
            width: '100%',
            height: 'auto',
            backgroundColor: Color.darkGrey,
        },
        image: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '200px',
            maxHeight: '200px',
            width: 'auto',
            height: 'auto',
        },
        content_small: {
            padding: theme.spacing(1),
            overflow: 'hidden',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
        location: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            backgroundColor: Color.lightGrey,
            borderRadius: '5px',
        },
        summary: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            backgroundColor: Color.lightGrey,
            borderRadius: '5px',
        },
        typography: {
            padding: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row',
        },
        summaryTypography: {
            margin: theme.spacing(1),
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        checkoutButton: {
            padding: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },



        minusButton: {
            textTransform: 'none',
            backgroundColor: '#e2e2e2e8',
        },
        plusButton: {
            textTransform: 'none',
            backgroundColor: '#b8b8b8e8',
        },
    })
);
