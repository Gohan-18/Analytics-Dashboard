import { createSlice } from "@reduxjs/toolkit";

const metricsStateSlice = createSlice({
    name: 'metricsState',
    initialState: {
        metricsState: [
            {name : 'Date', state: true},
            {name : 'App', state: true},
            {name : 'Clicks', state: true},
            {name : 'Ad Requests', state: true},
            {name : 'Ad Response', state: true},
            {name : 'Impression', state: true},
            {name : 'Revenue', state: true},
            {name : 'Fill Rate', state: true},
            {name : 'CTR', state: true},
        ]
    },
    reducers: {
        toggleMetricesView(state, action) {
            const item  = action.payload;
            if(item === 0 || item === 1) {
                return;
            }
            else {
                state.metricsState[item].state = !state.metricsState[item].state
            }
        }
    }
})

export const { toggleMetricesView } = metricsStateSlice.actions;
export default metricsStateSlice.reducer;