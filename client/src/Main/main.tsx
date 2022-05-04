import React, { useEffect, useMemo } from 'react';
import { useState } from "react";
import { useQuery } from "react-query";
import Draggable from 'react-draggable';

// components
import {
    Drawer,
    Grid,
    Badge,
    TablePagination,
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
        - store cart items in firestore for each user ?
    3. firestore and sample data (✅)
    4. cart checkout ui & stripe payment FPX
    5. JWT auth
        - login/signup refresh token, 
    6. Guarded routes for restricted access to page (✅)
        - nested scroll to top on route change
    7. middleware for authentication request in backend (only needed for server, cloud func handled it ?)
        - firebase auth middleware id token
    8. firebase security rules for restricted access to data (✅ need more test)
        - restrict read access to User collection to itself (uid) but allow write access to anyone (✅)
    9. store state when reload page (✅)
        - need research on refresh token for user signin session and status (onAuthStateChanged(✅)) remove local storage ?
    10. more signup/login options (google, facebook, etc) 
    11. password reset & verification (email/phone)
        - confirm password (rewrite) on signup ui + func (✅)
    12. Pages of items (page 1, page 2, page 3, etc) OR infinite scroll (✅)

    unassigned:
    Admin custom claim or role
    modal popup (✅)
    Profile page and functions
    Comments and ratings for produts
    Settings ?
    Notification sys
    Search func product by name (✅)
    filter / sort func product by price (✅)
    Menu side bar (✅)
    Isomorphic page SSR, SEO friendly
    Code splitting / lazy imports
    Added global font type (Chilanka) (✅)
    stress test 3000 items + some optimization(memo) (✅)
    support multi language
    track user purchase history etc
    auto get user location? or ask user to enter location?


    POST Development:
    image upload func (firestore bucket ? store in aws s3 ?)
    Admin functions / Panel (batch upload product etc)
    styling fix
    move all inline functions to arrow function top (optimization)


    Explore:
    createAsyncThunk


    last: host a node server using google app engine
    https://cloud.google.com/appengine/docs/standard/nodejs/building-app

    ssl cert: https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
*/


const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();


// very heavy render functions for all items
const allItems = (storeItems: CartItemType[]) => {
    console.log('RENDERING all items !!!');

    return (
        <React.Fragment>
            {storeItems?.map(item => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Item item={item} />
                </Grid>
            ))}
        </React.Fragment>
    );
}



const Main = () => {
    const dispatch = useDispatch();

    const { cartItems: cartItem, storeItems, searchText } = useSelector((state: RootState) => state.common);

    const defaultCartIconPosition = { x: 0, y: 0 };

    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [filterStoreItems, setFilterStoreItems] = useState<CartItemType[]>([]);
    const [displayStoreItems, setDisplayStoreItems] = useState<CartItemType[]>([]);
    const [numOfItems, setNumOfItems] = useState<number>(storeItems?.length || 0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(12);


    // const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

    // useEffect(() => {
    //     if (data) {
    //         dispatch(updateStoreItems(data));
    //         console.log(data);
    //     }
    // }, [data])

    // useEffect(() => {
    //     // update loading status
    //     dispatch(updateLoadingStatus(isLoading));
    // }, [isLoading])


    // search or filter items
    useEffect(() => {
        let tempFilterStoreItems = [...storeItems];
        if (searchText) {
            tempFilterStoreItems = storeItems.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
        }

        // sort items
        tempFilterStoreItems = tempFilterStoreItems.sort((a, b) => a.title.localeCompare(b.title));

        // update filter items
        setFilterStoreItems(tempFilterStoreItems);
        setNumOfItems(tempFilterStoreItems.length);

        // if pageNumber is more than number of items, set pageNumber to 0
        if (pageNumber > Math.ceil(tempFilterStoreItems.length / pageSize) - 1) {
            setPageNumber(0);
        }
    }, [storeItems, searchText]);

    // update display items when page size or page number change
    useEffect(() => {
        let tempDisplayStoreItems = [...filterStoreItems];

        // items to be displayed by page
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        tempDisplayStoreItems = tempDisplayStoreItems.slice(startIndex, endIndex);

        setDisplayStoreItems(tempDisplayStoreItems);
    }, [pageNumber, filterStoreItems, pageSize]);


    const handleOpenCart = () => {
        setCartOpen(true);
    }
    const handleCloseCart = () => {
        setCartOpen(false);
    }

    const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount, 0);

    const dragEventControl = (event: { type: any; }, info: any) => {
        if (event.type === 'mousemove' || event.type === 'touchmove' || event.type === 'touchstart') {
            setIsDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend' || event.type === 'touchcancel') {
            setTimeout(() => {
                setIsDragging(false);
            }, 100);
        }
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    };


    // test on memorize render items 
    // const MemoizedItems = useMemo(() => allItems(storeItems), [storeItems]);


    return (
        <>
            <Drawer anchor='right' open={cartOpen} onClose={handleCloseCart} >
                <Cart closeCart={handleCloseCart} />
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
                    onDrag={dragEventControl}
                    onStop={dragEventControl}
                >
                    <StyledButton
                        disabled={isDragging}
                        onClick={handleOpenCart}
                        onTouchStart={handleOpenCart}
                        onTouchMove={handleCloseCart}
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
                {/* {MemoizedItems} */}

                {displayStoreItems?.map(item => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Item item={item} />
                    </Grid>
                ))}
            </Grid>

            <TablePagination
                rowsPerPageOptions={[12, 24, 36]}
                component="div"
                count={numOfItems}
                rowsPerPage={pageSize}
                page={pageNumber}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 24,
                    marginBottom: 40,
                }}
            />

        </>
    )
}


export default Main;