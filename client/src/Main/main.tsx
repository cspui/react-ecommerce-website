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
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, updateStoreItems, updateLoadingStatus } from '../Store/CommonSlice';


/*
    ============= TODO ===============
    1. firebase auth create user and ui for login/signup (email/password) (✅)
    2. backend api signup and store data in firestore (✅)
    3. firestore and sample data
    4. cart checkout ui & stripe payment FPX
    5. JWT auth
    6. Guarded routes for restricted access to page
    7. middleware for authentication request in backend
    8. firebase security rules for restricted access to data (✅ need more test)
        - restrict read access to User collection to itself (uid) but allow write access to anyone (✅)
    9. store state when reload page
    10. more signup/login options (google, facebook, etc) 
    11. password reset & verification (email/phone)

    unassigned:
    Admin custom claim or role
    Error modal popup
    Profile page and functions
    Comments and ratings for produts
    Settings ?
    Notification sys
    Search func product
    Menu side bar


    POST Development:
    image upload func (firestore bucket ? store in aws s3 ?)
    Admin functions / Panel (batch upload product etc)
    styling fix


    Explore:
    createAsyncThunk


    last: host a node server using google app engine
    https://cloud.google.com/appengine/docs/standard/nodejs/building-app
*/


const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();


const Main = () => {
    const dispatch = useDispatch();
    
    const { cartItems: cartItem } = useSelector((state: RootState) => state.common);

    const [cartOpen, setCartOpen] = useState(false);
    
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const defaultCartPosition = { x: 0, y: 0 };
    
    const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
    
    useEffect(() => {
        if (data)
            dispatch(updateStoreItems(data));
        console.log(data);
    }, [data])

    useEffect(() => {
        // update loading status
        dispatch(updateLoadingStatus(isLoading));
    }, [isLoading])


    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount, 0);

    // const handleAddToCart = (clickedItem: CartItemType) => {
    //     setCartItems(prev => {
    //         const isItemInCart = prev.find(item => item.id === clickedItem.id)

    //         if (isItemInCart) {
    //             return prev.map(item => (
    //                 item.id === clickedItem.id
    //                     ? { ...item, amount: item.amount + 1 }
    //                     : item
    //             ));
    //         }

    //         return [...prev, { ...clickedItem, amount: 1 }]
    //     })
    // };

    // const handleRemoveFromCart = (id: number) => {
    //     setCartItems(prev =>
    //         prev.reduce((ack, item) => {
    //             if (item.id === id) {
    //                 if (item.amount === 1) return ack;
    //                 return [...ack, { ...item, amount: item.amount - 1 }];
    //             } else {
    //                 return [...ack, item];
    //             }
    //         }, [] as CartItemType[])
    //     );
    // };

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

    if (error) return <div> something wrong </div>

    return (
        <>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
                <Cart />
            </Drawer>

            <Draggable
                defaultPosition={defaultCartPosition}
                onDrag={eventControl}
                onStop={eventControl}
            >
                <StyledButton disabled={isDragging} onClick={() => setCartOpen(true)} color='primary'>
                    {/* may need change the icon button to Fab */}
                    <div style={{ backgroundColor: 'rgba(253, 189, 14, 0.884)', borderRadius: 18, width: 37, height: 37, boxShadow: '1px 5px 15px 1px rgba(0,0,0,0.8)' }}>
                        <Badge badgeContent={getTotalItems(cartItem)} color='error'>
                            <AddShoppingCartIcon />
                        </Badge>
                    </div>
                </StyledButton>
            </Draggable>

            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Item item={item} />
                    </Grid>
                ))}
            </Grid>

        </>
    )
}


export default Main;