import React, { useEffect } from 'react';
import { useState } from "react";
import { useQuery } from "react-query";

// components
import { Drawer } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Badge } from "@material-ui/core";

import Item from "../Item/Item";
import Cart from '../Cart/Cart';

import Draggable from 'react-draggable';

// styles
import { StyledButton } from "../App.styles";

// types
import { CartItemType } from '../Types/CartItemType';

// redux
import { RootState } from '../Store/Common/CommonStore';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, updateStoreItems } from '../Store/Common/CommonSlice';


const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();


const Main = () => {
    const { storeItems } = useSelector((state: RootState) => state.common);
    const dispatch = useDispatch();

    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

    console.log(data);

    useEffect(() => {
        if (data)
            dispatch(updateStoreItems(data));

    }, [data])


    const position = { x: 0, y: 0 };

    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === clickedItem.id)

            if (isItemInCart) {
                return prev.map(item => (
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                ));
            }

            return [...prev, { ...clickedItem, amount: 1 }]
        })
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    const eventControl = (event: { type: any; }, info: any) => {
        if (event.type === 'mousemove' || event.type === 'touchmove') {
            setIsDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend') {
            setTimeout(() => {
                setIsDragging(false);
            }, 100);
        }
    }

    if (isLoading) return <LinearProgress color='secondary' />
    if (error) return <div> something wrong </div>

    return (
        <>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
                <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
            </Drawer>

            <Draggable
                defaultPosition={position}
                onDrag={eventControl}
                onStop={eventControl}
            >
                <StyledButton disabled={isDragging} onClick={() => setCartOpen(true)} color='primary'>
                    <div style={{ backgroundColor: 'rgba(253, 189, 14, 0.884)', borderRadius: 18, width: 37, height: 37, boxShadow: '1px 5px 15px 1px rgba(0,0,0,0.8)' }}>
                        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                            <AddShoppingCartIcon />
                        </Badge>
                    </div>
                </StyledButton>
            </Draggable>

            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>


        </>
    )
}


export default Main;