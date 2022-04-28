import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../Types/CartItemType';

export interface CommonState {
    isLogin: boolean,                                // is user logged in
    cartItems: CartItemType[],                       // items in the cart                                
    storeItems: CartItemType[],                      // items show in the store
    isLoading: boolean,                              // is the data loading
    navigationTo: string,                            // navigation to the next page
    searchText: string,                              // search text
}

const initialState: CommonState = {
    isLogin: false,
    cartItems: [],
    storeItems: [],
    isLoading: false,
    navigationTo: '',
    searchText: '',
}

// localstorage get items for each state
if (typeof window !== undefined && window.localStorage) {
    const saved = window.localStorage.getItem('isLogin');
    if (saved) {
        initialState.isLogin = JSON.parse(saved);
    }
    const saved2 = window.localStorage.getItem('cartItems');
    if (saved2) {
        initialState.cartItems = JSON.parse(saved2);
    }
    const saved3 = window.localStorage.getItem('storeItems');
    if (saved3) {
        initialState.storeItems = JSON.parse(saved3);
    }
    const saved4 = window.localStorage.getItem('isLoading');
    if (saved4) {
        initialState.isLoading = JSON.parse(saved4);
    }
    const saved5 = window.localStorage.getItem('navigationTo');
    if (saved5) {
        initialState.navigationTo = JSON.parse(saved5);
    }
    const saved6 = window.localStorage.getItem('searchText');
    if (saved6) {
        initialState.searchText = JSON.parse(saved6);
    }

}

export const CommonSlice = createSlice({
    name: 'Common',
    initialState,
    reducers: {
        // login status
        updateLogin: (state, action: PayloadAction<boolean>) => {
            localStorage.setItem('isLogin', JSON.stringify(action.payload));
            state.isLogin = action.payload;
        },

        // for items in Cart
        updateCartItem: (state, action: PayloadAction<CartItemType[]>) => {
            localStorage.setItem('cartItems', JSON.stringify(action.payload));
            state.cartItems = action.payload;
        },
        addToCart: (state, action: PayloadAction<CartItemType>) => {
            const isItemInCart = state.cartItems.find(item => item.id === action.payload.id);

            if (isItemInCart) {
                state.cartItems = state.cartItems.map(item => (
                    item.id === action.payload.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                ));
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                return;
            }

            state.cartItems = [...state.cartItems, { ...action.payload, amount: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            // typescript recude bugged
            // state.cartItem = state.cartItem.reduce((ack: CartItemType[], item: CartItemType) => {
            //     if (item.id === action.payload) {
            //         if (item.amount === 1) return ack;
            //         return [...ack, { ...item, amount: item.amount - 1 }];
            //     } else {
            //         return [...ack, item];
            //     }
            // }, [] as CartItemType[]);

            // find the id of the item in state.cartItem to be decrement or remove from state.cartItem array
            const index = state.cartItems.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                if (state.cartItems[index].amount === 1) {
                    state.cartItems.splice(index, 1);
                }
                else {
                    state.cartItems[index].amount -= 1;
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // for items display in store
        updateStoreItems: (state, action: PayloadAction<CartItemType[]>) => {
            localStorage.setItem('storeItems', JSON.stringify(action.payload));
            // set expired time to 1 day
            localStorage.setItem('refreshStoreItemIn', JSON.stringify(new Date().getTime() + 86400000));
            state.storeItems = action.payload;
        },

        // for loading status
        updateLoadingStatus: (state, action: PayloadAction<boolean>) => {
            localStorage.setItem('isLoading', JSON.stringify(action.payload));
            state.isLoading = action.payload;
        },

        // for navigation
        updateNavigationTo: (state, action: PayloadAction<string>) => {
            localStorage.setItem('navigationTo', JSON.stringify(action.payload));
            state.navigationTo = action.payload;
        },

        // for search text
        updateSearchText: (state, action: PayloadAction<string>) => {
            localStorage.setItem('searchText', JSON.stringify(action.payload));
            state.searchText = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    updateLogin,

    updateCartItem,
    addToCart,
    removeFromCart,

    updateStoreItems,

    updateLoadingStatus,

    updateNavigationTo,

    updateSearchText,

} = CommonSlice.actions;

export default CommonSlice.reducer;