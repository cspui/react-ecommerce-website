import React, { useEffect, useState } from 'react'

// mui
import { Button, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../Store/CommonSlice";
import { CartItemType } from '../Types/CartItemType';
import Checkbox from '@material-ui/core/Checkbox';

// styles
import { CheckoutStyles } from './Checkout.styles';

const Checkout = () => {
    const classes = CheckoutStyles();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state: RootState) => state.common);
    const [checkoutItems, setCheckoutItems] = useState<any>([]);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [deliveryFee, setDeliveryFee] = useState<number>(5);

    useEffect(() => {
        if (cartItems == undefined) {
            setCheckoutItems([]);
        } else {
            const items = cartItems.map((item) => {
                return {
                    ...item,
                    checked: false
                }
            })
            setCheckoutItems(items);
        }
    }, [cartItems])

    useEffect(() => {
        if (checkoutItems) {
            let total = 0;
            checkoutItems.forEach((item: any) => {
                if (item.checked) {
                    total += item.price;
                }
            })
            setSubTotal(total);
        }
    }, [checkoutItems])



    return (
        <div className={classes.root}>
            <Typography variant="h5">
                Checkout
            </Typography>

            <Grid container spacing={3} className={classes.content}>
                <Grid item xs={12} sm={12} md={9}>
                    <div className={classes.selectAll}>
                        <Checkbox
                            checked={checkoutItems.length > 0 && checkoutItems.every((item: any) => item.checked)}
                            onChange={() => {
                                const items = checkoutItems.map((item: any) => {
                                    return {
                                        ...item,
                                        checked: !item.checked
                                    }
                                })
                                setCheckoutItems(items);
                            }}
                            className={classes.checkbox}
                            color='primary'
                        />
                        <Typography>
                            SELECT ALL ({checkoutItems.length} ITEM(S))
                        </Typography>
                    </div>

                    {checkoutItems?.map((item: any) => (
                        <Grid item key={item.id} className={classes.items}>
                            <Checkbox
                                checked={item.checked}
                                onChange={() => {
                                    const items = checkoutItems.map((tempItem: any) => {
                                        if (item.id == tempItem.id) {
                                            tempItem.checked = !tempItem.checked;
                                        }
                                        return tempItem;
                                    })
                                    setCheckoutItems(items);
                                }}
                                className={classes.checkbox}
                                style={{
                                    width: '7%'
                                }}
                                color='primary'
                            />

                            <div className={classes.imgBackground}>
                                <img src={item.image}
                                    alt={item.title}
                                    className={classes.image}
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                    }}
                                    loading="lazy" />
                            </div>

                            <Typography
                                className={classes.content_small}
                                style={{
                                    width: '40%'
                                }}>
                                {item.title}
                            </Typography>
                            <Typography
                                className={classes.content_small}
                                style={{
                                    width: '12%'
                                }}>
                                RM {item.price.toFixed(2)}
                            </Typography>
                            <Typography
                                className={classes.content_small}
                                style={{
                                    width: '12%'
                                }}>
                                {item.amount}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>


                <Grid item xs={12} sm={12} md={3}>
                    <Grid item>
                        <div className={classes.location}>
                            <Typography variant="h5" className={classes.content_small}>
                                Location
                            </Typography>
                            <div className={classes.typography}>
                                <LocationOnIcon />
                                <Typography>
                                    Johor, Johor Bahru, 81100
                                </Typography>
                            </div>
                        </div>

                        <div className={classes.summary}>
                            <Typography variant="h5" className={classes.summaryTypography}>
                                Order Summary
                            </Typography>

                            <div className={classes.summaryTypography}>
                                <Typography className={classes.content_small}>
                                    Subtotal:
                                </Typography>
                                <Typography className={classes.content_small}>
                                    RM {subTotal.toFixed(2)}
                                </Typography>
                            </div>

                            <div className={classes.summaryTypography}>
                                <Typography className={classes.content_small}>
                                    Shipping fee:
                                </Typography>
                                <Typography className={classes.content_small}>
                                    RM {deliveryFee.toFixed(2)}
                                </Typography>
                            </div>

                            <div className={classes.summaryTypography}>
                                <Typography className={classes.content_small}>
                                    Total:
                                </Typography>
                                <Typography className={classes.content_small}>
                                    RM {(subTotal + deliveryFee).toFixed(2)}
                                </Typography>
                            </div>

                            <div className={classes.checkoutButton}>
                                <Button variant="contained" color="primary">
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </Grid>

                </Grid>

            </Grid>

        </div>
    )
}

export default Checkout;