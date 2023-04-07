import { configureStore } from '@reduxjs/toolkit';
import reportListReducer from './features/fetchAllReport-slice';
import appListReducer from './features/fetchAllApps-slice'
import metricsStateReducer from './features/metricesViewState-slice'

const store = configureStore({
    reducer: {
        reportList: reportListReducer,
        appList: appListReducer,
        metricsState: metricsStateReducer
    }
})

export default store;