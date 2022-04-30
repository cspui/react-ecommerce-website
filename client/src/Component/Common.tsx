// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { updateModalMsg } from "../Store/CommonSlice";
import { Dispatch } from '@reduxjs/toolkit';


export const popup = (status: string, msg: string, dispatch: Dispatch<any>) => {
    dispatch(updateModalMsg({status, msg}));
}