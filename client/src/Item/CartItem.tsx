import React from "react";
import { Button } from "@material-ui/core";

// styles
import { Wrapper } from "./CartItem.styles";

// redux
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from "../Store/Common/CommonSlice";

// types
import { CartItemProps } from '../Types/PropsType';



const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className="buttons">
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => dispatch(removeFromCart(item.id))}
                    >
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => dispatch(addToCart(item))}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    )
};


export default CartItem;


