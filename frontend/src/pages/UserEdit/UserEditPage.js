import { Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../actions/userActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import MessageBox from '../../components/MessageBox/MessageBox';
import { USER_UPDATE_RESET } from '../../contstants/userConstants';
import useStyles from './styles.js';

const UserEditPage = (props) => {
    const classes = useStyles();
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/admin/allusers')
        }
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, userId, successUpdate, props]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <Fragment>
            <Button component={Link} to='/admin/allusers'>
                Go Back
            </Button>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4" className={classes.titleTypography} >
                        EDIT USER
                </Typography>
                    {loadingUpdate && <LoadingSpinner />}
                    {errorUpdate && <MessageBox severity="error">{errorUpdate}</MessageBox>}
                    {loading ? <LoadingSpinner /> : error ? <MessageBox severity="error">{error}</MessageBox> : (
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                        name="checkbox-isAdmin"
                                        color="primary"
                                    />
                                }
                                label="Set user as admin"
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
                    )}

                </div>
            </Container>
        </Fragment>

    )
}

export default UserEditPage;
