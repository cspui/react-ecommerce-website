import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { KeyboardArrowLeftSharp } from '@material-ui/icons';

// navigation
import { useParams, useNavigate } from 'react-router-dom';

// import auth from firebase
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

// import firestore
import { firestore } from '../Firebase/Firebase';
import Collections from '../Constant/Collection';
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

// store
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, } from '../Store/UserSlice';
import { updateLogin, updateLoadingStatus, updateNavigationTo } from '../Store/CommonSlice';

// hooks
import useLocalState from '../Hooks/useLocalState';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backButton: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // if user signed in then navigate to profile page
    if (auth.currentUser) navigate('/profile')
  }, []);

  const [email, setEmail] = useLocalState('loginEmail', '');
  const [password, setPassword] = useLocalState('loginPassword', '');

  const { navigationTo } = useSelector((state: RootState) => state.common);


  const signin = async () => {
    // validate input
    if (email.length < 1) {
      alert('Please enter your email !');
      return;
    }
    if (password.length < 1) {
      alert('Please enter your password !');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (credentials) => {
        const user = credentials.user;

        // read user docs from firestore
        const userRef = doc(firestore, Collections.User, user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        // store to user store
        const userStore = {
          uid: user.uid,
          email: email,
          fname: userData ? userData.fname : '',
          lname: userData ? userData.lname : '',
          phoneNumber: "",
          refreshToken: "",
          admin: false,
          address: "",
        }

        dispatch(setUser(userStore));

        // update login status
        dispatch(updateLogin(true));

        // navigate to home page or where it is from
        if (navigationTo) {
          navigate(navigationTo, { replace: true });
          dispatch(updateNavigationTo(''));
        } else {
          navigate('/', { replace: true });
        }

      })
      .catch((error) => {
        console.log(error)

        if (error.code == AuthErrorCodes.INVALID_EMAIL) {
          alert('Invalid email');
        }
        else if (error.code == AuthErrorCodes.USER_DELETED) {
          alert('User not found');
        }
        else {
          alert('Unknown error');
        }
      });
  };


  return (
    <Container component="main" maxWidth="xs">
      <Button startIcon={<KeyboardArrowLeftSharp />} className={classes.backButton} onClick={() => navigate(-1)}>Back</Button>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signin}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            
            <Grid item>
              <Link variant="body2" onClick={() => navigate('/signup')}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}