import { Box, Paper } from '@mui/material'
import React from 'react'
import { metrics } from '../utils/constants'

const DataTable = () => {
  return (
    <>
    <Box sx={{width: '100%'}} >
        <Paper sx={{padding: '20px'}}>
            <table style={{width: '100%'}}>
                <thead >
                <tr style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}} >
                    {metrics.map((item) => (
                        <th style={{color: '#6c757d'}} key={item} >
                            {item}
                        </th>
                    ))}
                </tr>
                </thead>
            </table>
        </Paper>
    </Box>
    </>
  )
}

export default DataTable