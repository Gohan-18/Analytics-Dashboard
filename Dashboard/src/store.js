import { configureStore } from '@reduxjs/toolkit';
import reportListReducer from './features/fetchAllReport-slice'

const store = configureStore({
    reducer: {
        reportList: reportListReducer
    }
})

export default store;