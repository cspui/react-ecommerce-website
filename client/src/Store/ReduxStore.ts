import { configureStore } from '@reduxjs/toolkit';
import CommonSlice from './CommonSlice';
import UserSlice from './UserSlice';

export const ReduxStore = configureStore({
    reducer: {
        common: CommonSlice,
        user: UserSlice,
    },
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch