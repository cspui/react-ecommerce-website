import React, { useEffect } from 'react';

// styles
import { appStyles, } from "./App.styles";

// theme
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from './Themes/Theme';

// import firestore
import { firestore } from './Firebase/Firebase';
import Collections from './Constant/Collection';
import { collection, addDoc, getDoc, doc, getDocs, writeBatch } from "firebase/firestore";

// store
import { RootState } from './Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, } from './Store/UserSlice';
import { updateStoreItems, updateLoadingStatus, updateNavigationTo } from './Store/CommonSlice';

// type
import { CartItemType } from './Types/CartItemType';

import Navigator from './Navigator/Navigator';


const App = () => {
  const classes = appStyles();
  const dispatch = useDispatch();


  const readStoreItems = async () => {
    dispatch(updateLoadingStatus(true));

    // check for expiration
    if (window.localStorage.getItem('refreshStoreItemIn') !== null) {
      const refreshStoreItemIn = parseInt(window.localStorage.getItem('refreshStoreItemIn') as string);
      const now = new Date().getTime();
      // not expired
      if (now - refreshStoreItemIn < 0) {
        // check local storage before reading from firestore
        if (window.localStorage.getItem('storeItems') !== null) {
          console.log('read data from cache');
          dispatch(updateLoadingStatus(false));
          return;
        }
      }
    }
    
    try {
      // read store items from firestore
      const collectionRef = collection(firestore, Collections.Items);
      const allItemsSnapshot = await getDocs(collectionRef);

      const allItems: CartItemType[] = [];

      allItemsSnapshot.forEach(async (doc) => {
        const itemData = doc.data();
        // console.log('item', itemData);

        const item: CartItemType = {
          id: itemData.id,
          category: itemData.category,
          description: itemData.description,
          image: itemData.image,
          price: itemData.price,
          title: itemData.title,
          rating: {
            count: itemData.rating.count,
            rate: itemData.rating.rate,
          },

          uniqueId: itemData.uniqueId,
          quantity: itemData.quantity,
          createdAt: itemData.createdAt,
          updatedAt: itemData.updatedAt,

          amount: 0
        };

        allItems.push(item);
      });

      dispatch(updateStoreItems(allItems));
      dispatch(updateLoadingStatus(false));

      // // TEST todo TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT

      // // Get a new write batch
      // const batch = writeBatch(firestore);

      // for (let startIndex = 2499; startIndex < 2999; startIndex++) {
      //   const item: CartItemType = {
      //     id: startIndex,
      //     category: startIndex.toString(),
      //     description: startIndex.toString() + ' description',
      //     image: 'https://sm.pcmag.com/t/pcmag_ap/news/p/pc-builder/pc-builder-creates-an-nvidia-rtx-4090-for-april-fools-day-an_qfcc.1920.jpg',
      //     price: Math.random() * 100,
      //     title: 'Item (t) ' + startIndex.toString(),
      //     rating: {
      //       count: Math.random() * 100,
      //       rate: Math.random() * 5,
      //     },
      //     uniqueId: startIndex.toString(),
      //     quantity: Math.random() * 100,
      //     createdAt: Date.now(),
      //     updatedAt: Date.now(),
      //     amount: Math.random() * 50
      //   }

        // // Set the value 
        // const nycRef = doc(firestore, Collections.Items, startIndex.toString());
        // batch.set(nycRef, item);

        // // Delete the city 'LA'
        // const laRef = doc(firestore, Collections.Items, startIndex.toString());
        // batch.delete(laRef);
      // }

      // // Commit the batch
      // await batch.commit();
    }
    catch (error) {
      console.log('error', error);
    }
  }


  useEffect(() => {
    readStoreItems();
  }, [])


  return (
    <ThemeProvider theme={Theme}>
      {/* <Wrapper> */}
      <div className={classes.root}>
        <Navigator />
      </div>
      {/* </Wrapper> */}
    </ThemeProvider>
  );
}

export default App;
