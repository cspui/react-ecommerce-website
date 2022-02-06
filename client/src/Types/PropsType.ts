import { CartItemType } from "./CartItemType";

export interface ChildrenProps {
    children?: React.ReactElement;
}

export type ItemProps = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

export type CartProps = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

export type CartItemProps = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}


