import * as React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// pages
import Main from '../Main/main';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/Signup';
import ItemDetails from '../ItemDetails';
import Test from '../test';

// components
import NavBar from '../Component/BackToTop';


const Navigator = () => {

    return (
        <BrowserRouter>
            <NavBar />

            <Routes>
                <Route path='/*' element={<Main />} />

                <Route path="/t" element={<Test />} />

                <Route path="/itemdetails" >
                    <Route path=":id" element={<ItemDetails />} />
                </Route>

                <Route path='/login' element={<Login />} />

                <Route path='/signup' element={<SignUp />} />

            </Routes>
        </BrowserRouter>
    )
};


export default Navigator;