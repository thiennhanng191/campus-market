import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../../actions/userActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import MessageBox from '../../components/MessageBox/MessageBox';
import useStyles from './styles.js';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const UsersListPage = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin; 

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDeleteUser } = userDelete; 

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
        dispatch(getAllUsers())
        } else {
            props.history.push('/login')
        }
    }, [dispatch, props, successDeleteUser, userInfo])

    const deleteUserHandler = (userId) => {
        if (window.confirm("Are you sure you want to delete user")) {
            dispatch(deleteUser(userId));
        }
    }
    return (
        <>
            <Typography component="h1" variant="h4" className={classes.titleTypography} >
                Users
            </Typography>
            {loading ? <LoadingSpinner /> : error ? <MessageBox severity='error'>{error}</MessageBox> : (
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={user._id}>
                                            <TableCell>{user._id}</TableCell>
                                            <TableCell align="left">{user.name}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left">{user.isAdmin ? <MessageBox severity="error">Admin</MessageBox> : <MessageBox severity="info">User</MessageBox>}</TableCell>
                                            <TableCell align="left">
                                                <IconButton component={Link} to={`/admin/user/${user._id}/edit`}>
                                                    <EditRoundedIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => deleteUserHandler(user._id)}>
                                                    <DeleteRoundedIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </>
    )
}

export default UsersListPage
