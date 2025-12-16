import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { enqueue } from '../store/toast/ToastSlice';

/**
 * useToast (redux-backed)
 * Returns helpers: open, success, error, info, warn
 */
export default function useToast() {
  const dispatch = useDispatch();

  const open = useCallback(
    (message, options = {}) => {
      dispatch(
        enqueue({
          message,
          severity: options.severity || 'info',
          autoHideDuration: options.autoHideDuration ?? 5000,
          anchorOrigin: options.anchorOrigin,
          id: options.id,
        }),
      );
    },
    [dispatch],
  );

  const success = useCallback(
    (message, opts = {}) => open(message, { ...opts, severity: 'success' }),
    [open],
  );
  const error = useCallback(
    (message, opts = {}) => open(message, { ...opts, severity: 'error' }),
    [open],
  );
  const info = useCallback(
    (message, opts = {}) => open(message, { ...opts, severity: 'info' }),
    [open],
  );
  const warn = useCallback(
    (message, opts = {}) => open(message, { ...opts, severity: 'warning' }),
    [open],
  );

  return { open, success, error, info, warn };
}
