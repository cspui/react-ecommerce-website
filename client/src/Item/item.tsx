import React, { useCallback } from 'react';

// mui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// router
import { useNavigate } from 'react-router-dom';

// styles
import { itemStyles } from "./Item.styles";

// redux
import { useDispatch } from 'react-redux';
import { addToCart } from "../Store/CommonSlice";

// types
import { ItemProps } from '../Types/PropsType'
import { Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';


const Item: React.FC<ItemProps> = ({ item }) => {
    const classes = itemStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = useCallback(
        () => dispatch(addToCart(item)),
        [item],
    )

    const handleClick = useCallback(
        () => navigate(`/itemdetails/${item.id}`),
        [item],
    )

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.media} onClick={handleClick}>
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

            <div className={classes.rating} >
                  <Rating name="read-only" value={item ? item.rating.rate : 0} readOnly precision={0.1} size="small" />
                  <Typography className={classes.price} variant="body2" component="h3" >
                    {item ? item.rating.count.toFixed(0) : 0}
                  </Typography>
            </div>

            <Button className={classes.button} onClick={handleAddToCart}>Add to cart</Button>
        </Card>
    )
}

export default Item;