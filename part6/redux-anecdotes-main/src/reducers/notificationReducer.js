import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, duration: 0 },
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        duration: action.payload.duration,
      };
    },
    clearNotification(state, action) {
      return { message: null, duration: 0 };
    },
  },
});


export const setNotification = (message, duration) => {
  return {
    type: 'notification/setNotification',
    payload: { message, duration },
  };
};

export const clearNotification = () => {
  return {
    type: 'notification/clearNotification',
  };
};

export default notificationSlice.reducer;