import { createSlice } from '@reduxjs/toolkit';
import initialValuesCV from '../utils/initialValuesCV';

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
    addItem: (state, action) => {
      const { path, template } = action.payload;
      const parts = path.split('.');
      
      let current = state;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      const arrayKey = parts[parts.length - 1];
      current[arrayKey].push(template);
    },
    removeItem: (state, action) => {
      const { path, index } = action.payload;
      const parts = path.split('.');
      
      let current = state;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      const arrayKey = parts[parts.length - 1];
      if (current[arrayKey].length > 1) {
        current[arrayKey].splice(index, 1);
      }
    },
    loadCV: (state, action) => {
      return action.payload;
    },
    resetCV: () => initialValuesCV,
  },
});

export const { updateField, addItem, removeItem, loadCV, resetCV } = cvSlice.actions;
export default cvSlice.reducer;