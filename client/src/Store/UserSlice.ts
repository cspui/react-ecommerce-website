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

// check the localstorage for user data and store it the initialState
if (typeof window !== undefined && window.localStorage) {
    const saved = window.localStorage.getItem('user');
    if (saved) {
        initialState.uid = JSON.parse(saved).uid;
        initialState.email = JSON.parse(saved).email;
        initialState.fname = JSON.parse(saved).fname;
        initialState.lname = JSON.parse(saved).lname;
        initialState.phoneNumber = JSON.parse(saved).phoneNumber;
        initialState.refreshToken = JSON.parse(saved).refreshToken;
        initialState.admin = JSON.parse(saved).admin;
        initialState.address = JSON.parse(saved).address;
    }
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
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
            localStorage.removeItem('user');
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
            localStorage.setItem('user', JSON.stringify({ ...state, uid: action.payload }));
            state.uid = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, email: action.payload }));
            state.email = action.payload;
        },
        setFname: (state, action: PayloadAction<string>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, fname: action.payload }));
            state.fname = action.payload;
        },
        setLname: (state, action: PayloadAction<string>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, lname: action.payload }));
            state.lname = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, phoneNumber: action.payload }));
            state.phoneNumber = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, refreshToken: action.payload }));
            state.refreshToken = action.payload;
        },
        setAdmin: (state, action: PayloadAction<boolean>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, admin: action.payload }));
            state.admin = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            localStorage.setItem('user', JSON.stringify({ ...state, address: action.payload }));
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