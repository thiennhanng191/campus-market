import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, resetUpdateUserDetails, updateUserDetails } from '../../actions/userActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import MessageBox from '../../components/MessageBox/MessageBox';
import useStyles from './styles.js';

const ProfilePage = (props) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;


    useEffect(() => {
        if (!userInfo) {
            props.history.push('/login');
        } else {
            if (!user.name || success) {
                dispatch(getUserDetails('profile'));
                dispatch(resetUpdateUserDetails());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, props.history, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Confirm password must match");
        } else {
            dispatch(updateUserDetails({ id: user._id, name, email, password }));
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={3}>
                <Typography component="h1" variant="h4" className={classes.titleTypography} >
                    MY PROFILE
                </Typography>
                {message && <MessageBox severity='error' className={classes.messageBox}>{message}</MessageBox>}
                {success && <MessageBox severity='info' className={classes.messageBox}>Profile Updated Successfully</MessageBox>}
                {loading && <LoadingSpinner />}

                <form className={classes.form} onSubmit={submitHandler} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Your Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="current-confirm-password"
                    />

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update
                    </Button>
                </form>
            </Grid>
            <Grid item md={9}>
                <Typography component="h1" variant="h4" className={classes.titleTypography} >
                    MY ORDER
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ProfilePage
