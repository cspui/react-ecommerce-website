import * as React from 'react';

// Imrpovements : lazy loading
// https://stackoverflow.com/questions/60390144/react-lazy-loading-when-to-use


// router
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// pages
import Main from '../Main/Main';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/Signup';
import ItemDetails from '../Item/ItemDetails';
import Test from '../test';
import Checkout from '../Cart/Checkout';
import Profile from '../User/Profile';

// components
import NavBar from '../Component/NavBar';
import ScrollToTop from '../Component/ScrollToTop';
import { PrivateRoute } from './PrivateRoute';


const Navigator = () => {

    return (
        <BrowserRouter>
            <NavBar />

            <ScrollToTop >
                <Routes>

                    <Route path='/*' element={<Main />} />

                    <Route path="/t" element={
                        <PrivateRoute>
                            <Test />
                        </PrivateRoute>
                    } />

                    <Route path="/itemdetails" >
                        <Route path=":id" element={<ItemDetails />} />
                    </Route>

                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />

                    <Route path='/profile' element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />

                    <Route path='/checkout' element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    } />

                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    )
};


export default Navigator;