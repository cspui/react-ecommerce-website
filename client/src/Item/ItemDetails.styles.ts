import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const itemDetailsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 1500,
            margin: 'auto',
            padding: theme.spacing(1),
          },
          backButton: {
            margin: theme.spacing(1),
            textTransform: 'none',
          },
          content: {
            padding: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
              padding: theme.spacing(2),
            },
          },
          content_small: {
            padding: theme.spacing(1),
          },
          minusButton: {
            textTransform: 'none',
            backgroundColor: '#e2e2e2e8',
          },
          plusButton: {
            textTransform: 'none',
            backgroundColor: '#b8b8b8e8',
          },
          addToCartButton: {
            margin: theme.spacing(2),
            padding: theme.spacing(1),
            textTransform: 'none',
            backgroundColor: '#ffc164',
            alignSelf: 'flex-end'
          },
    })
);
