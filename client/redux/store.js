import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './reducers/profileSlice';

export default configureStore({
    reducer: {
        profile: profileReducer
    }
});