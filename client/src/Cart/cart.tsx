import React from "react";

import CartItem from "../Item/CartItem";

// styles
import { Wrapper } from "./Cart.styles";

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector } from 'react-redux';

// types
import { CartItemType } from '../Types/CartItemType';


const Cart = () => {
    const { cartItems } = useSelector((state: RootState) => state.common);

    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}


export default Cart;
