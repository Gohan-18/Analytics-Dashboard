import { createSlice } from "@reduxjs/toolkit";

const metricsStateSlice = createSlice({
    name: 'metricsState',
    initialState: {
        // metricsState: {
        //     'Date': true,
        //     'App': true,
        //     'Clicks': true,
        //     'Ad Requests': true,
        //     'Ad Response': true,
        //     'Impression': true,
        //     'Revenue': true,
        //     'Fill Rate': true,
        //     'CTR': true
        // },
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
            // console.log(item);
            // const current = state.metricsState.filter((met) => ( item.name === met.name))
            // console.log(current);
            // console.log(state.metricsState)
            if(item === 0 || item === 1) {
                return;
            }
            else {
                state.metricsState[item].state = !state.metricsState[item].state
            }
            // console.log(state.metricsState)
        }
    }
})

export const { toggleMetricesView } = metricsStateSlice.actions;
export default metricsStateSlice.reducer;