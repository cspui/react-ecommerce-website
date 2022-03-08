import React from "react";

// router
import { Navigate, useLocation } from "react-router-dom";

// auth
import { auth } from '../Firebase/Firebase';

// redux
import { useDispatch } from 'react-redux';
import { updateNavigationTo } from '../Store/CommonSlice';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    if (!auth.currentUser) {
        dispatch(updateNavigationTo(location.pathname));

        return <Navigate to="/login" replace />;
    }

    return children;
}