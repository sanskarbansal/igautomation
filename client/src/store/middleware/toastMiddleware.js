import { enqueue } from '../toast/ToastSlice';

// Middleware to show a toast when an asyncThunk is rejected with rejectWithValue
export default function toastMiddleware(storeAPI) {
  return (next) => (action) => {
    try {
      // RTK thunks rejected via rejectWithValue set meta.rejectedWithValue = true
      if (
        typeof action.type === 'string' &&
        action.type.endsWith('/rejected') &&
        action?.meta?.rejectedWithValue
      ) {
        const payload = action.payload;

        // derive a friendly message from payload or action.error
        let message = '';
        if (payload) {
          if (typeof payload === 'string') message = payload;
          else if (payload.message) message = payload.message;
          else if (payload.msg) message = payload.msg;
          else if (Array.isArray(payload.errors))
            message = payload.errors.map((e) => e.message || e).join(', ');
          else if (payload.error) message = payload.error;
          else if (typeof payload === 'object') message = JSON.stringify(payload);
        } else {
          message = action.error?.message || 'Request failed';
        }

        // Dispatch an error toast; keep it short and user-friendly
        storeAPI.dispatch(
          enqueue({
            message: message || 'An error occurred',
            severity: 'error',
            autoHideDuration: 3000,
          }),
        );
      }
    } catch (e) {
      // swallow middleware errors to avoid breaking the app
      // eslint-disable-next-line no-console
      console.error('toastMiddleware error', e);
    }

    return next(action);
  };
}
