import { createSlice } from '@reduxjs/toolkit';
import initialValuesCV from '../helper/initialValuesCV';

// slice = initial values + reducers(update cases)
const cvSlice = createSlice({
  name: 'cv',
  initialState: initialValuesCV, 
  reducers: {
    updateField: (state, action) => {
      const { path, value } = action.payload; // path could be "personal.name"
      const parts = path.split('.');
      
      let current = state; // for updates with more than 2 levels of nesting
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    },
    resetCV: () => initialValuesCV,
  },
});

export const { updateField, resetCV } = cvSlice.actions;
export default cvSlice.reducer;