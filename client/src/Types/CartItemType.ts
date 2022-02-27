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

    // data for firestore
    uniqueId: string;
    quantity: number;   // stock count ?
    // totalPrice: number;
    createdAt: number;
    updatedAt: number;
    
    // data for the application
    // quantity: number;
    // total: number;
    amount: number;
}
