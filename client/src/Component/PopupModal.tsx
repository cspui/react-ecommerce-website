import React, { useEffect, useState } from 'react';

import { Box, Modal, Typography } from '@material-ui/core';

// redux
import { RootState } from '../Store/ReduxStore';
import { useSelector, useDispatch } from 'react-redux';
import { updateModalMsg } from "../Store/CommonSlice";

// styles
import { PopupModalStyles } from './PopupModal.styles';


const PopupModal = () => {
    const classes = PopupModalStyles();
    const dispatch = useDispatch();

    const { modalMsg } = useSelector((state: RootState) => state.common);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (modalMsg.status) {
            handleOpen();
        }
    }, [modalMsg]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        dispatch(updateModalMsg({
            status: '',
            msg: ''
        }));
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h2">
                        {modalMsg.status}
                    </Typography>
                    <Typography className={classes.message}>
                        {modalMsg.msg}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default PopupModal;