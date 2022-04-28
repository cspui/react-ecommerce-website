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


import ApiCall from '../Constant/ApiCall';
import API from '../Constant/API';


// import auth from firebase
import { auth } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

// import firestore
import { firestore } from '../Firebase/Firebase';
import Collections from '../Constant/Collection';
import { collection, addDoc } from "firebase/firestore";

// store
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, } from '../Store/UserSlice';
import { updateLogin, updateLoadingStatus, updateNavigationTo } from '../Store/CommonSlice';

// hooks
import useLocalState from '../Hooks/useLocalState';


// html textinput autofill
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill


const Copyright = () => {
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // if user signed in then navigate to profile page
    if (auth.currentUser) navigate('/profile')
  }, []);
  
  const [fname, setFname] = useLocalState('signupFname', '');
  const [lname, setLname] = useLocalState('signupLname', '');
  const [email, setEmail] = useLocalState('signupEmail', '');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { navigationTo } = useSelector((state: RootState) => state.common);


  const signUpUser = () => {
    // validate input
    if (fname.length < 1) {
      alert('Please enter your first name !');
      return;
    }
    if (lname.length < 1) {
      alert('Please enter your last name !');
      return;
    }
    if (email.length < 1) {
      alert('Please enter your email !');
      return;
    }
    if (password.length < 1) {
      alert('Please enter your password !');
      return;
    }
    if (confirmPassword.length < 1) {
      alert('Please confirm your password !');
      return;
    }
    if (password !== confirmPassword) {
      alert('Confirm password do not match !');
      return;
    }

    // call api
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('NewUser', userCredential, user);

        // save user data to firestore
        const body = {
          uid: user.uid,
          fname: fname,
          lname: lname,
          email: email,
        }

        ApiCall.POST(API.signup, body).then(
          (res) => {
            console.log('Signup', res);
          }
        ).catch(
          (err) => {
            console.log('Signup', err);
          }
        )

        // save data to current user store 
        const userData = {
          uid: user.uid,
          email: email,
          fname: fname,
          lname: lname,
          phoneNumber: "",
          refreshToken: "",
          admin: false,
          address: "",
        }

        dispatch(setUser(userData));

        // update login status, role ?
        dispatch(updateLogin(true));

        // navigate to home page or where it is from
        if (navigationTo) {
          navigate(navigationTo, { replace: true });
          dispatch(updateNavigationTo(''));
        } else {
          navigate('/', { replace: true });
        }

        // V9 modular approach
        // try {
        //   const docRef = await addDoc(collection(firestore, Collections.User), body);
        //   console.log("User Document written with ID: ", docRef.id);
        // } catch (e) {
        //   console.error("Error adding user document: ", e);
        // }

        // v8 namespaced approach
        // firestore.app.firestore().collection(Collections.User).doc(user.uid).set({
        //   fname: fname,
        //   lname: lname,
        //   email: email,
        //   password: password,
        // })
        // .then(() => {
        //   console.log('User saved to db');
        // })
        // .catch((error: any) => {
        //   console.log('Error saving user to db', error);
        // });

      })
      .catch((error) => {
        console.log(error)

        if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
          alert('Email already in use');
        }
        else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
          alert('Invalid email');
        }
        else if (error.code == AuthErrorCodes.WEAK_PASSWORD) {
          alert('Weak password');
        }
        else {
          alert('Unknown error');
        }
      });
  }


  return (
    <Container component="main" maxWidth="xs">
      <Button
        startIcon={<KeyboardArrowLeftSharp />}
        className={classes.backButton}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                variant="outlined"
                label="First Name"
                autoComplete="given-name"
                autoFocus
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                variant="outlined"
                label="Last Name"
                autoComplete="family-name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                variant="outlined"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                variant="outlined"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                variant="outlined"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            // type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUpUser}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={() => navigate("/login")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}