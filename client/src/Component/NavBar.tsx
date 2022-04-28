import React, { useEffect, useState } from 'react';

// component
import {
  Drawer,
  LinearProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Zoom,
  Fab,
  useScrollTrigger,
} from '@material-ui/core';

import MenuTab from './MenuTab';

// icons
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

// navigation
import { useNavigate } from "react-router-dom";

// type
import { ChildrenProps } from "../Types/PropsType";

// styles
import { navBarStyles } from './NavBar.styles';

// auth
import { auth } from '../Firebase/Firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../Store/UserSlice';
import { updateLogin, updateLoadingStatus, updateNavigationTo, updateSearchText } from '../Store/CommonSlice';


function BackToTop(props: ChildrenProps) {
  const { children } = props;

  const classes = navBarStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}


const NavBar = (props: ChildrenProps) => {
  const classes = navBarStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, isLoading, searchText } = useSelector((state: RootState) => state.common);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('user changed', user)
      if (user) {
        // dispatch(setUser(userStore));
        dispatch(updateLogin(true));
      } else {
        dispatch(updateLogin(false));
        dispatch(clearUser());
      }
    });
  
    return () => {
      dispatch(clearUser());
      unsubscribe();
    }
  }, [])
  

  const logout = async () => {
    try {
      await signOut(auth);

      // clear user store
      dispatch(clearUser());

      // change login status
      dispatch(updateLogin(false));

      // redirect to login page
      navigate('/', { replace: true });

    } catch (error) {
      console.log(error);
    }
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Drawer anchor='left' open={menuOpen} onClose={() => setMenuOpen(false)} >
            <MenuTab logout={logout} closeMenu={closeMenu}/>
          </Drawer>

          <Typography variant="h6" className={classes.title} onClick={() => navigate('/')}>
            Logo
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => dispatch(updateSearchText(event.target.value))}
              value={searchText}
            />
          </div>

          {isLogin ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  navigate('/profile');
                  handleClose();
                  }}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  logout();
                }}>Logout</MenuItem>
              </Menu>
            </div>
          )
            :
            (
              <Button color='secondary' onClick={() => {
                navigate('/login');
              }}>Login</Button>
            )}
        </Toolbar>

        {isLoading && <LinearProgress />}
      </AppBar>

      <Toolbar id="back-to-top-anchor" />

      <BackToTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
    </React.Fragment>
  );
}

export default NavBar;