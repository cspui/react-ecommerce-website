export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    rating: {
        count: number;
        rate: number;
    }
    amount: number;
}
