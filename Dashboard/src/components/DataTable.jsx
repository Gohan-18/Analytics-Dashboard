import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { metrics } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../features/fetchAllReport-slice";
import format from "date-fns/format";
import { fetchApps } from "../features/fetchAllApps-slice";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const DataTable = () => {
  const reports = useSelector((state) => state?.reportList?.reportList);
  const { data } = useSelector((state) => state?.appList.appList);
  const currentState = useSelector((state) => state?.metricsState.metricsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchApps());
  }, []);

  //   console.log(currentState);

  return (
    <>
      {!reports.length ? (
        <Box sx={{ width: "100%" }}>
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ padding: "20px" }}>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  {currentState.map((item) => (
                    <TableCell
                      sx={{
                        color: "#495057",
                        display: item.state ? "table-cell" : "none",
                        alignContent: 'center'
                      }}
                      key={item.name}
                    >
                    <IconButton sx={{alignContent: 'center', width: '100%', borderRadius: '10px'}} >
                        <FilterAltIcon />
                    </IconButton>
                    <Typography sx={{fontSize: '14px', width: '100%', textAlign: 'center'}} >{item.name}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* {!reports.length ? (
              <Box>
                <Typography>Loading...</Typography>
              </Box>
            ) : ( */}
              <TableBody>
                {reports.map((item, index) => {
                  const appName = data.filter(
                    ({ app_id, app_name }) => app_id === item.app_id
                  );

                  return (
                    <TableRow key={index} className="table">
                      <TableCell>{item.date.slice(0, 10)}</TableCell>
                      <TableCell>{appName[0].app_name}</TableCell>
                      <TableCell
                        sx={{
                          display: currentState[2].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item.clicks)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[3].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item.requests)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[4].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item.responses)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[5].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(item.impressions)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[6].state
                            ? "table-cell"
                            : "none",
                        }}
                      >{`$${item.revenue?.toFixed(2)}`}</TableCell>
                      <TableCell
                        sx={{
                          display: currentState[7].state
                            ? "table-cell"
                            : "none",
                        }}
                      >{`${((item.responses / item.requests) * 100)?.toFixed(
                        2
                      )}%`}</TableCell>
                      <TableCell
                        sx={{
                          display: currentState[8].state
                            ? "table-cell"
                            : "none",
                        }}
                      >{`${((item.clicks / item.impressions) * 100)?.toFixed(
                        2
                      )}%`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              {/* )} */}
            </Table>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default DataTable;
