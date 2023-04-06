import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <>
    <Box sx={{height: '80px', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'start'}} >
        <Typography sx={{color: "#343a40", fontWeight: 500, fontSize: '25px'}} >Analytics</Typography>
    </Box>
    </>
  )
}

export default Header