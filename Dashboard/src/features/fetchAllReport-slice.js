import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReports = createAsyncThunk('fetch/report', async () => {
    try {
        const data = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-06-01&endDate=2021-06-30`)
        const result = await data.json();
        // console.log(result)
        return result;
    } catch (error) {
        alert(error)
    }

});

const reportListSlice = createSlice({
    name: 'reportList',
    initialState: {
        reportList: [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchReports.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchReports.fulfilled, (state, action) => {
            state.reportList = action.payload.data;
            // console.log(state.reportList)
            state.loading = false;
        })
    }
})

export default reportListSlice.reducer;