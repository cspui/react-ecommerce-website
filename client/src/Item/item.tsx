import React from 'react';
// import { Button } from "@material-ui/core";

import { CartItemType } from '../Types/CartItemType';

import { Wrapper } from "./item.styles";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';


type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
    media: {
        height: '80%',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    image: {
        // user-drag: none;
        // -webkit-user-drag: none;
        // user-select: none;
        // -moz-user-select: none;
        // -webkit-user-select: none;
        // -ms-user-select: none;
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
});


const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    const classes = useStyles();

    const navigate = useNavigate();

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.media} onClick={() => navigate(`/itemdetails/${item.id}`)}>
                <CardMedia
                    draggable="false" 
                    component="img"
                    alt={item.title}
                    height="200"
                    image={item.image}
                    title={item.title}
                />
                <CardContent >
                    <Typography gutterBottom variant="h5">
                        {item.title}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>

            <Typography className={classes.price} variant="body2" component="h3" >
                ${item.price.toFixed(2)}
            </Typography>

            <Button className={classes.button} onClick={() => handleAddToCart(item)}>Add to cart</Button>
        </Card>
    )
}

export default Item;