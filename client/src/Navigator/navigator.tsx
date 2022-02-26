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

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';

// components
import NavBar from '../Component/NavBar';
import ScrollToTop from '../Component/ScrollToTop';

// mui
import { LinearProgress } from '@material-ui/core';


const Navigator = () => {
    const { isLoading } = useSelector((state: RootState) => state.common);

    return (
        <BrowserRouter>
            <NavBar />

            {isLoading && <LinearProgress />}

            <ScrollToTop >
                <Routes>

                    <Route path='/*' element={<Main />} />

                    <Route path="/t" element={<Test />} />

                    <Route path="/itemdetails" >
                        <Route path=":id" element={<ItemDetails />} />
                    </Route>

                    <Route path='/login' element={<Login />} />

                    <Route path='/signup' element={<SignUp />} />

                </Routes>

            </ScrollToTop>
        </BrowserRouter>
    )
};


export default Navigator;