// this while will manage the "global state"

import {configureStore} from '@reduxjs/toolkit';
import cvReducer from './cvSlice'; 

const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type); 
  console.log('Previous State:', store.getState());
  console.log('Action:', action);
  
  const result = next(action);
  
  console.log('Next State:', store.getState());
  console.groupEnd();
  
  return result;
};

export const store = configureStore({
  reducer: {
    cv: cvReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
});