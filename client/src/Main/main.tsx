import React, { useEffect } from 'react';
import { useState } from "react";
import { useQuery } from "react-query";
import Draggable from 'react-draggable';

// components
import {
    Drawer,
    Grid,
    Badge,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import Item from "../Item/Item";
import Cart from '../Cart/Cart';

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
        - store cart items in firestore ?
    3. firestore and sample data (✅)
    4. cart checkout ui & stripe payment FPX
    5. JWT auth
    6. Guarded routes for restricted access to page (✅)
        - nested scroll to top on route change
    7. middleware for authentication request in backend
    8. firebase security rules for restricted access to data (✅ need more test)
        - restrict read access to User collection to itself (uid) but allow write access to anyone (✅)
    9. store state when reload page (✅)
        - need research on refresh token for user signin session and status
    10. more signup/login options (google, facebook, etc) 
    11. password reset & verification (email/phone)
        - confirm password (rewrite) on signup ui + func (✅)
    12. Pages of items (page 1, page 2, page 3, etc)

    unassigned:
    Admin custom claim or role
    Error modal popup
    Profile page and functions
    Comments and ratings for produts
    Settings ?
    Notification sys
    Search func product
    Menu side bar
    Isomorphic page SSR, SEO friendly
    Code splitting / lazy imports
    Added global font type (Chilanka) (✅)


    POST Development:
    image upload func (firestore bucket ? store in aws s3 ?)
    Admin functions / Panel (batch upload product etc)
    styling fix


    Explore:
    createAsyncThunk


    last: host a node server using google app engine
    https://cloud.google.com/appengine/docs/standard/nodejs/building-app

    ssl cert: https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
*/


const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();


const Main = () => {
    const dispatch = useDispatch();

    const { cartItems: cartItem } = useSelector((state: RootState) => state.common);
    const { storeItems } = useSelector((state: RootState) => state.common);

    const [cartOpen, setCartOpen] = useState(false);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const defaultCartIconPosition = { x: 0, y: 0 };

    // const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

    // useEffect(() => {
    //     if (data) {
    //         // dispatch(updateStoreItems(data));
    //         console.log(data);
    //     }
    // }, [data])

    // useEffect(() => {
    //     // update loading status
    //     dispatch(updateLoadingStatus(isLoading));
    // }, [isLoading])

    const closeCart = () => {
        setCartOpen(false);
    }

    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount, 0);

    const eventControl = (event: { type: any; }, info: any) => {
        if (event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'touchstart') {
            setIsDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend' || event.type === 'touchcancel') {
            setTimeout(() => {
                setIsDragging(false);
            }, 100);
        }
    }

    return (
        <>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)} >
                <Cart closeCart={closeCart} />
            </Drawer>

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}>
                <Draggable
                    defaultPosition={defaultCartIconPosition}
                    onDrag={eventControl}
                    onStop={eventControl}
                >
                    <StyledButton
                        disabled={isDragging}
                        onClick={() => setCartOpen(true)}
                        onTouchStart={() => setCartOpen(true)}
                        onTouchMove={() => setCartOpen(false)}
                        color='primary'>
                        {/* may need change the icon button to Fab */}
                        <div style={{ backgroundColor: 'rgba(253, 189, 14, 0.884)', borderRadius: 18, width: 37, height: 37, boxShadow: '1px 5px 15px 1px rgba(0,0,0,0.8)' }}>
                            <Badge badgeContent={getTotalItems(cartItem)} color='error'>
                                <AddShoppingCartIcon />
                            </Badge>
                        </div>
                    </StyledButton>
                </Draggable>
            </div>

            <Grid container spacing={3}>
                {storeItems?.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Item item={item} />
                    </Grid>
                ))}
            </Grid>

        </>
    )
}


export default Main;