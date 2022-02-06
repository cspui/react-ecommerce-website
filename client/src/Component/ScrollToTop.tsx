import * as React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router";

import { ChildrenProps } from "../Types/PropsType";

// scroll restoration to top when navigating to new page
const ScrollToTop = (props: ChildrenProps) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;
