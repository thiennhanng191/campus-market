import { Box, Button, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Fragment } from 'react'
import MessageBox from '../MessageBox/MessageBox.js';
import useStyles from './styles.js';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import {Link} from 'react-router-dom';

const MyOrderTableRow = (props) => {
    const classes = useStyles();
    const { order } = props
    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <TableRow hover onClick={() => setOpen(!open)} className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {order._id}
                </TableCell>
                <TableCell align="right">{order.totalPrice}</TableCell>
                <TableCell align="right">{order.updatedAt.substring(0, 10)}</TableCell>
                <TableCell align="right">{order.isPaid ? (order.paidAt.substring(0, 10)) : (<MessageBox severity="error">Not paid</MessageBox>)}</TableCell>
                <TableCell align="right">{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<MessageBox severity="error">Not Delivered</MessageBox>)}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {order.orderItems.map((orderItem, index) => (
                            <Box margin={1}>
                                <Grid container spacing={2}>
                                    <Grid item sm={1}>
                                        <img src={orderItem.image} alt={orderItem.name} className={classes.image} />

                                    </Grid>
                                    <Grid item sm={11}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            {orderItem.name}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sold by</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Seller
                                                </TableCell>
                                            <TableCell>{orderItem.quantity}</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">
                                                {orderItem.price}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Seller
                                                </TableCell>
                                            <TableCell>{orderItem.quantity}</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">
                                                {orderItem.price}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>

                                </Table>
                            </Box>

                        ))}
                        <div>
                            <Button component={Link} to={`/order/${order._id}`} style={{float: 'right'}}>
                                Order Details
                                <span style={{display: 'flex', marginLeft: 5}}>
                                    <ArrowRightAltRoundedIcon/>
                                </span>
                            </Button>
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default MyOrderTableRow
