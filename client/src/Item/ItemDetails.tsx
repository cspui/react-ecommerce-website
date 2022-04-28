import React, { useEffect, useState } from 'react';

// mui
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography } from "@material-ui/core";
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../Store/CommonSlice";
import { CartItemType } from '../Types/CartItemType';

// icons
import { KeyboardArrowLeftSharp } from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// styles
import { itemDetailsStyles } from './ItemDetails.styles';


const ItemDetails = () => {
  const classes = itemDetailsStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;

  const { storeItems } = useSelector((state: RootState) => state.common);

  const [currItem, setCurrItem] = useState<CartItemType | undefined>();
  const [quantity, setQuantity] = useState(0);


  useEffect(() => {
    if (id == undefined || storeItems == undefined) {
      navigate('/', { replace: true });
    } else {
      setCurrItem(
        storeItems.filter((item) => {
          if (item.id.toString() == id)
            return item
        })[0]
      )
    }
  }, [])

  return (
    <div className={classes.root}>
      <Button startIcon={<KeyboardArrowLeftSharp />} className={classes.backButton} onClick={() => navigate(-1)}>Back</Button>

      <Paper className={classes.content}>
        <Grid container spacing={3} >

          <Grid item xs={12} sm={12} md={9} >
            <Grid item className={classes.content}>
              <Typography variant="h5">
                {currItem ? currItem.title : ''}
              </Typography>
            </Grid>

            <Grid container className={classes.content}>
              <Grid item xs={12} sm={12} md={7} lg={5} className={classes.content}>
                <Paper style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: '300px',
                  maxHeight: '300px',
                  width: '100%',
                  height: 'auto'
                }}>
                  <img src={currItem ? currItem.image : ''} alt={currItem ? currItem.title : ''}
                    style={{
                      maxWidth: '300px',
                      maxHeight: '300px',
                      width: '100%',
                      height: 'auto'
                    }}
                    loading="lazy"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={12} md={5} lg={7} className={classes.content}>
                <Typography variant="h6" className={classes.content_small}>
                  RM {currItem ? currItem.price.toFixed(2) : 0}
                </Typography>

                <Grid container style={{ alignItems: 'center' }}>
                  <Rating name="read-only" value={currItem ? currItem.rating.rate : 0} readOnly precision={0.1} />
                  <Typography className={classes.content_small}>
                    {currItem ? currItem.rating.count : 0}
                  </Typography>
                </Grid>

                <Grid container style={{ alignItems: 'center' }}>
                  <Typography className={classes.content_small}>
                    Quantity
                  </Typography>

                  <Button className={classes.minusButton} onClick={() => quantity == 0 ? setQuantity(quantity) : setQuantity(quantity - 1)}>-</Button>
                  <Typography className={classes.content_small}>
                    {quantity}
                  </Typography>
                  <Button className={classes.plusButton} onClick={() => setQuantity(quantity + 1)}>+</Button>

                </Grid>

                <Button
                  startIcon={<AddShoppingCartIcon />}
                  className={classes.addToCartButton}
                  onClick={() => {
                    if (currItem)
                      for (let i = 0; i < quantity; i++) {
                        dispatch(addToCart(currItem))
                      }
                  }}>Add to cart</Button>
              </Grid>
            </Grid>

            <Grid item className={classes.content}>
              <Typography variant="h5" className={classes.content_small}>
                Product details
              </Typography>
              <Typography >
                {currItem ? currItem.description : ''}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={3} >
            <Grid item className={classes.content} >
              <Typography variant="h6">
                Delivery Address
              </Typography>
              <Typography >
                Kuala Lumpur, Kuala Lumpur, 50450
              </Typography>
            </Grid>

            <Grid item className={classes.content} >
              <Typography variant="h6">
                Est Date
              </Typography>
              <Typography >
                3 - 20 day(s)
              </Typography>
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    </div>
  );
}

export default ItemDetails;
