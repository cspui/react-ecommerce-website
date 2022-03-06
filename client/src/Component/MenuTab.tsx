import React from "react";

// styles
import { menuStyles } from "./MenuTab.styles";
import { Button, Typography } from "@material-ui/core";
import { MenuOpen } from "@material-ui/icons";

// navigation
import { useNavigate } from "react-router-dom";

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector } from 'react-redux';

// type
import { MenuTabProps } from "../Types/PropsType";


const MenuTab = (props: MenuTabProps) => {
    const { logout, closeMenu } = props;
    const classes = menuStyles();
    const navigate = useNavigate();

    const { isLogin } = useSelector((state: RootState) => state.common);

    return (
        <div className={classes.root}>
            <div className={classes.header} onClick={closeMenu}>
                <Typography variant="h5">Menu</Typography>
                <MenuOpen />
            </div>

            <div className={classes.links}>
                <Button className={classes.link} onClick={() => {
                    navigate('/');
                    closeMenu();
                }}>
                    <Typography variant="h6">Home</Typography>
                </Button>
                <Button className={classes.link}>
                    <Typography variant="h6">About</Typography>
                </Button>
                <Button className={classes.link}>
                    <Typography variant="h6">Contact</Typography>
                </Button>
                <Button className={classes.link}>
                    <Typography variant="h6">FAQ</Typography>
                </Button>
                <Button className={classes.link}>
                    <Typography variant="h6">Terms</Typography>
                </Button>
                <Button className={classes.link}>
                    <Typography variant="h6">Privacy</Typography>
                </Button>
            </div>

            <div className={classes.logout}>
                {isLogin ? <Button
                    className={classes.button}
                    onClick={logout}>
                    Logout
                </Button> : null}
            </div>
        </div>
    )
}


export default MenuTab;
