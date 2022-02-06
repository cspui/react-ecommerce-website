import React from 'react';

import { itemStyles } from "./Item.styles";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useNavigate } from 'react-router-dom';

import { ItemProps } from '../Types/PropsType'


const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => {
    const classes = itemStyles();

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