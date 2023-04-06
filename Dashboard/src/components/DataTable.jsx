import { Box, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { metrics } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReports } from '../features/fetchAllReport-slice'

const DataTable = () => {

    const reports = useSelector(state => state?.reportList?.reportList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReports())
    }, [])
    

  return (
    <>
    <Box sx={{width: '100%'}} >
        <Paper sx={{padding: '20px'}}>
            <table style={{width: '100%'}}>
                <thead >
                <tr style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}} >
                    {metrics.map((item) => (
                        <th style={{color: '#495057'}} key={item} >
                            {item}
                        </th>
                    ))}
                </tr>
                </thead>
                {/* <tbody>
                    <tr>
                        {reports.map((item, index) => (
                            <td key={index} >
                                {item.clicks}
                            </td>
                        ))}
                    </tr>
                </tbody> */}
            </table>
        </Paper>
    </Box>
    </>
  )
}

export default DataTable