import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Color from '../Themes/Color';

export const PopupModalStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            overflow: 'auto',

            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            border: '1px solid',
            borderColor: Color.borderLight,
            borderRadius: 5,

            backgroundColor: '#fff',
            padding: theme.spacing(4),
            width: 400,

            outline: 'none',

            [theme.breakpoints.down('sm')]: {
                width: 250,
            },
        },
        message: {
            marginTop: theme.spacing(2),
            padding: theme.spacing(1),
        }
    })
);
