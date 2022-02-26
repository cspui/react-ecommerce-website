import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    uid: string,
    email: string,
    fname: string,
    lname: string,
    phoneNumber: string,
    refreshToken: string,
    admin: boolean,
    address: string,
}

const initialState: UserState = {
    uid: "",
    email: "",
    fname: "",
    lname: "",
    phoneNumber: "",
    refreshToken: "",
    admin: false,
    address: "",
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.fname = action.payload.fname;
            state.lname = action.payload.lname;
            state.phoneNumber = action.payload.phoneNumber;
            state.refreshToken = action.payload.refreshToken;
            state.admin = action.payload.admin;
            state.address = action.payload.address;
        },
        clearUser: (state) => {
            state.uid = "";
            state.email = "";
            state.fname = "";
            state.lname = "";
            state.phoneNumber = "";
            state.refreshToken = "";
            state.admin = false;
            state.address = "";
        },

        // assign individual state of user
        setUid: (state, action: PayloadAction<string>) => {
            state.uid = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setFname: (state, action: PayloadAction<string>) => {
            state.fname = action.payload;
        },
        setLname: (state, action: PayloadAction<string>) => {
            state.lname = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        setAdmin: (state, action: PayloadAction<boolean>) => {
            state.admin = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    setUser,
    clearUser,

    setUid,
    setEmail,
    setFname,
    setLname,
    setPhoneNumber,
    setRefreshToken,
    setAdmin,
    setAddress,
  
} = UserSlice.actions;

export default UserSlice.reducer;