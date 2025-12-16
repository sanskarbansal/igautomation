import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { showNext, dismissCurrent } from '../../store/toast/ToastSlice';

export default function ToastRenderer() {
  const dispatch = useDispatch();
  const { current, queue } = useSelector((s) => s.toast || { current: null, queue: [] });

  // whenever there's no current toast but queue has items, show the next
  useEffect(() => {
    if (!current && queue && queue.length > 0) {
      dispatch(showNext());
    }
  }, [current, queue, dispatch]);

  if (!current) return null;

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return; // ignore clickaway
    dispatch(dismissCurrent());
  };

  return (
    <Snackbar
      key={current.id}
      open
      autoHideDuration={current.autoHideDuration ?? 5000}
      onClose={handleClose}
      anchorOrigin={current.anchorOrigin || { vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={current.severity || 'info'}
        sx={{ width: '100%' }}
      >
        {current.message}
      </Alert>
    </Snackbar>
  );
}
