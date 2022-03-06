import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const Wrapper = styled.div`
    margin-left: 30px;
    margin-right: 30px;
    margin-top: -9px;
`;

export const StyledButton = styled(IconButton)`
    /* position: fixed; */
    z-index: 100;
    /* bottom: 22;
    right: 22;
    flex-grow: 1; */
    /* right: '100%';
    top: 10px; */
`

export const appStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            '*::-webkit-scrollbar': {
                width: 8
            },
            '*::-webkit-scrollbar-track': {
                backgroundColor: 'transparent'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(160, 160, 160, 0.788)',
                borderRadius: 12,
                border: '6 solid transparent',
                backgroundClip: 'content-box',
            }
        },
        root: {
            marginLeft: 0,
            marginRight: 0,
            marginTop: -9,
            [theme.breakpoints.up('sm')]: {
                marginLeft: 30,
                marginRight: 30,
            },
        },
    })
);
