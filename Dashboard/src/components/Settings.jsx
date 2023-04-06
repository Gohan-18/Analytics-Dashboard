import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { useTheme } from "@emotion/react";
import { metrics } from "../utils/constants";

const Settings = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            py: "10px",
          }}
        >
          <TextField size="small" type="date" />
          <Button
            size="small"
            sx={{ color: "#343a40", border: "2px solid #ced4da", px: "10px" }}
            startIcon={<TuneIcon sx={{ fill: theme.palette.primary.main }} />}
          >
            Settings
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            py: "20px",
            border: "2px solid #ced4da",
            borderRadius: "5px",
            px: "20px",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Dimensions and Metrics
          </Typography>
          <Box
            sx={{
              wisth: "100%",
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              flexWrap: "wrap",
              gap: 3,
              pt: "10px",
            }}
          >
            {metrics.map((item) => (
              <Button
                size="small"
                sx={{
                  color: "#343a40",
                  border: "2px solid #ced4da",
                  px: "10px",
                  fontSize: "14px",
                }}
                key={item}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexWrap: "wrap",
              gap: 3,
              pt: "30px",
            }}
          >
            <Button
              size="small"
              sx={{ border: "2px solid #ced4da", px: "10px", fontSize: "14px" }}
            >
              Close
            </Button>
            <Button size="small" variant="contained">
              Apply changes
            </Button>
          </Box>
        </Box>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            flexWrap: "wrap",
            gap: 3,
            py: "10px",
          }}
        >
          <Button size="small" sx={{ border: "2px solid #ced4da", px: "10px", fontSize: '14px' }}>
            Close
          </Button>
          <Button size="small" variant="contained">Apply changes</Button>
        </Box> */}
      </Box>
    </>
  );
};

export default Settings;
