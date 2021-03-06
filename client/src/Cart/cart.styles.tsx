import styled from "styled-components";

export const Wrapper = styled.aside`
    font-family: Arial, Helvetice, sans-serif;
    width: 500px;
    padding: 20px;

`

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Color from "../Themes/Color";

export const cartStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 400,
            paddingLeft: theme.spacing(1),  
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            height: '98.7%',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                width: 300,
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
        items: {
            padding: theme.spacing(1),
            overflow: 'auto',
            border: '1px solid',
            borderColor: Color.borderLight,
            borderRadius: 5,
        },
        bottom: {
            padding: theme.spacing(1),
            paddingTop: theme.spacing(2),
            marginTop: 'auto',
        },
        checkout: {
            alignContent: 'center',
            justifyContent: 'center',
            display: 'flex',
        },
        button: {
            width: '70%',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            alignSelf: 'center',
        },
    })
);
