import { configureStore } from '@reduxjs/toolkit';
import CommonSlice from './CommonSlice';

export const CommonStore = configureStore({
    reducer: {
        common: CommonSlice,
    },
})

export type RootState = ReturnType<typeof CommonStore.getState>
export type AppDispatch = typeof CommonStore.dispatch