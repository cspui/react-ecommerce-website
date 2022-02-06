import styled from "styled-components";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid lightblue;
    border-radius: 20px;

    button {
        border-radius: 0 0 20px 20px;
    }

    img {
        max-height: 250px;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
    }

    div {
        font-family: Arial, Helvetice, sans-serif;
        padding: 1rem;
        height: 100%;
    }
`;


export const itemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
        },
        media: {
            height: '80%',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
        },
        price: {
            height: '10%',
            paddingLeft: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        button: {
            height: '10%',
            width: '100%',
        },
    })
);
