import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Box, Card, Grid, Paper, Typography } from "@material-ui/core";
import { useParams, useNavigate } from 'react-router-dom';

// redux
import { RootState } from './Store/Common/CommonStore';
import { useSelector, useDispatch } from 'react-redux';
import { CartItemType } from './Types/CartItemType';

const ItemDetails = () => {
  const { storeItems } = useSelector((state: RootState) => state.common);

  const id = useParams().id!;

  const navigate = useNavigate();

  const [currItem, setCurrItem] = useState<CartItemType | undefined>();

  useEffect(() => {
    if (storeItems == undefined || id == '') {
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
    <>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={12} md={9}>

          <Grid item xs={12} sm={12} md={9}>
            <Typography gutterBottom variant="h5">
              {currItem ? currItem.title : ''}
            </Typography>
          </Grid>


          <Grid item xs={12} sm={12} md={9} >
            <Paper style={{
              display: 'flex',
              width: '300px',
              height: '300px',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src={currItem ? currItem.image : ''} alt={currItem ? currItem.title : ''}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <Typography gutterBottom variant="h5">
              {currItem ? currItem.description : ''}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <Grid item xs={12} sm={12} md={3}>
            <Typography gutterBottom variant="h5">
              Delivery
            </Typography>
            <Typography gutterBottom variant="h5">
              Est Date
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </>
  );
}

export default ItemDetails;
