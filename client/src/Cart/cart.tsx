import React from "react";

import CartItem from "../Item/CartItem";

// styles
import { cartStyles, Wrapper } from "./Cart.styles";
import { Button, Typography } from "@material-ui/core";
import { MenuOpen } from "@material-ui/icons";

// navigation
import { useNavigate } from "react-router-dom";

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector } from 'react-redux';

// types
import { CartItemType } from '../Types/CartItemType';
import { CartProps } from "../Types/PropsType";


const Cart = (props: CartProps) => {
    const { closeCart } = props;
    const classes = cartStyles();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state: RootState) => state.common);

    const calculateTotalPrice = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    return (
        <div className={classes.root}>
            <div className={classes.header} onClick={closeCart}>
                <Typography variant="h5">Your shopping cart</Typography>
                <MenuOpen />
            </div>
            <div className={classes.items}>
                {cartItems.length === 0 ? <p>No items in cart.</p> : null}
                {cartItems.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
            <div className={classes.bottom}>
                <Typography variant="h5" >Total: ${calculateTotalPrice(cartItems).toFixed(2)}</Typography>
            </div>
            <div className={classes.checkout}>
                <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={() => {
                    navigate("/checkout");
                }}>
                    Checkout
                </Button>
            </div>
        </div>
    )
}


export default Cart;
