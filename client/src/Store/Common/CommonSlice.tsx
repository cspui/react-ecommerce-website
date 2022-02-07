import { PlaylistAddOutlined } from '@material-ui/icons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../Types/CartItemType';

export interface CommonState {
    value: number,                                        // value of the counter
    isLogin: boolean,                                     // is user logged in
    cartItems: CartItemType[] | [],                       // items in the cart                                
    storeItems: CartItemType[] | [],                      // items show in the store
}

const initialState: CommonState = {
    value: 0,
    isLogin: false,
    cartItems: [],
    storeItems: [],
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
                return
            }

            state.cartItems = [...state.cartItems, { ...action.payload, amount: 1 }];
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
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
        },

        // for items display in store
        updateStoreItems: (state, action: PayloadAction<CartItemType[]>) => {
            state.storeItems = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,

  updateLogin,

  updateCartItem,
  addToCart,
  removeFromCart,

  updateStoreItems,
} = CommonSlice.actions;

export default CommonSlice.reducer;