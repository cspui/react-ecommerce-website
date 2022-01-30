import * as React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router";

import Props from "../Types/PropsType";


const ScrollToTop = (props: Props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;
