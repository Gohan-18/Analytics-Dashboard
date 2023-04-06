// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchApps = createAsyncThunk('fetch/apps', async () => {
//     try {
//         const data = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-06-01&endDate=2021-06-30`)
//         const result = await data.json();
//         console.log(result)
//         return result;
//     } catch (error) {
//         alert(error)
//     }

// });

// const appListSlice = createSlice({
//     name: 'appList',
//     initialState: {
//         appList: [],
//         loading: false
//     },
//     extraReducers:(builder) => {
//         builder.addCase(fetchApps.pending, (state) => {
//             state.loading = true;
//         })
//         builder.addCase(fetchApps.fulfilled, (state, action) => {
//             state.appList = action.payload;
//             state.loading = false;
//         })
//     }
// })

// export default appListSlice.reducer;