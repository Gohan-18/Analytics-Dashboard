import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { useTheme } from "@emotion/react";
import { metrics } from "../utils/constants";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { toggleMetricesView } from "../features/metricesViewState-slice";
import { fetchReports } from "../features/fetchAllReport-slice";

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state?.reportList?.reportList);
  const [viewDimension, setViewDimension] = useState(false);
  const [viewCal, setViewCal] = useState(false);
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const refOne = useRef(null);
  const currentState = useSelector((state) => state?.metricsState.metricsState);
    // console.log(currentState)

    useEffect(() => {
        let srtDate = format(selectionRange[0].startDate,"yyyy-MM-dd")
        let endDate = format(selectionRange[0].endDate,"yyyy-MM-dd")
        dispatch(fetchReports({srtDate, endDate}));
    }, [selectionRange])
    

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setViewCal(false);
    }
  };

  if(!reports.length) {
    // dispatch(fetchReports());
  }

  const handleMetricesState = (item) => {
    console.log(item)
    dispatch(toggleMetricesView(item))
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          pb: "20px",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <TextField
              onClick={() => setViewCal(!viewCal)}
              size="small"
              // inputProps={{readonly: true}}
              type="text"
              value={`${format(
                selectionRange[0].startDate,
                "dd/MMM/yyyy"
              )} - ${format(selectionRange[0].endDate, "dd/MMM/yyyy")}`}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  width: "200px",
                },
              }}
            />
            <Box
              ref={refOne}
              sx={{
                position: "absolute",
                top: "50px",
                zIndex: 999,
                display: viewCal ? "flex" : "none",
                // width: '200px'
              }}
            >
              <DateRange
                ranges={selectionRange}
                onChange={(item) => {setSelectionRange([item.selection])}}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                months={1}
                direction="horizontal"
                className="dateRange"
              />
            </Box>
          </Box>
          {/* <Calendar date={new Date()} onChange={handleSelect} /> */}
          <Button
            onClick={() => setViewDimension(true)}
            size="small"
            sx={{ color: "#343a40", border: "2px solid #ced4da", px: "10px" }}
            startIcon={<TuneIcon sx={{ fill: theme.palette.primary.main }} />}
          >
            Settings
          </Button>
        </Box>
        <Box
          sx={{
            display: viewDimension ? "flex" : "none",
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
            {currentState.map((item, index) => {
            return(
              <Button
                onClick={() => handleMetricesState(currentState.indexOf(item))}
                size="small"
                sx={{
                  color: "#343a40",
                  border: "2px solid",
                  px: "10px",
                  fontSize: "14px",
                  borderColor: item.state ? "#0466c8" : "#ced4da",
                }}
                key={index}
              >
                {item.name}
              </Button>
            )})}
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
              onClick={() => setViewDimension(false)}
              size="small"
              sx={{ border: "2px solid #ced4da", px: "10px", fontSize: "14px" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
