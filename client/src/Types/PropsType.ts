import { CartItemType } from "./CartItemType";

export interface ChildrenProps {
    children?: React.ReactElement;
}

export type ItemProps = {
    item: CartItemType;
}

export type CartProps = {
    // cartItems: CartItemType[];
    // addToCart: (clickedItem: CartItemType) => void;
    // removeFromCart: (id: number) => void;
    closeCart: () => void;
}

export type CartItemProps = {
    item: CartItemType;
}

export type MenuTabProps = {
    logout: () => Promise<void>;
    closeMenu: () => void;
}
