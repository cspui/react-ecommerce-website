import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../Types/CartItemType';

export interface CommonState {
    value: number,
    isLogin: boolean,
    cartItem?: CartItemType[],
    storeItems?: CartItemType[],
}

const initialState: CommonState = {
    value: 0,
    isLogin: false,
}

export const CommonSlice = createSlice({
    name: 'Common',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        // login status
        updateLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        // for items in Cart
        updateCartItem: (state, action: PayloadAction<CartItemType[]>) => {
            state.cartItem = action.payload;
        },
        // for items display in store
        updateStoreItems: (state, action: PayloadAction<CartItemType[]>) => {
            state.storeItems = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateLogin, updateCartItem, updateStoreItems } = CommonSlice.actions;

export default CommonSlice.reducer;