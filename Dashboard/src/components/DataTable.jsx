import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../features/fetchAllReport-slice";
import format from "date-fns/format";
import { fetchApps } from "../features/fetchAllApps-slice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const DataTable = () => {
  const reports = useSelector((state) => state?.reportList?.reportList);
  const { data } = useSelector((state) => state?.appList.appList);
  const currentState = useSelector((state) => state?.metricsState.metricsState);
  const dispatch = useDispatch();
  const [searchedTerm, setSearchedTerm] = useState("");
  let mergedArray = [];
  const [sort, setSort] = useState('');
  const [sortIcon, setSortIcon] = useState(true);

  const handleChange = (event) => {
    setSort(event.target.value);
  };


  useEffect(() => {
    // dispatch(fetchReports());
    dispatch(fetchApps());
  }, []);

  if (reports?.length && data?.length) {
    mergedArray = reports.map((item1) => {
      const item2 = data.find((item2) => item2.app_id === item1.app_id);
      return { ...item1, ...item2 };
    });
  }

  let filteredByName = searchedTerm
    ? mergedArray.filter((item) =>
        item?.app_name?.toLowerCase().includes(searchedTerm.toLowerCase())
      )
    : mergedArray;

    const compare = (a, b) => {
        const numA = a.revenue;
        const numB = b.revenue;
      
        if (numA < numB) {
          return -1;
        } else if (numA > numB) {
          return 1;
        } else {
          return 0;
        }
    };

    if(sortIcon === true) {
        filteredByName.sort(compare)
    }
    else{
        filteredByName.reverse(compare)
    }
    

    console.log(filteredByName)

      

  return (
    <>
      {!mergedArray.length ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ padding: "20px" }}>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: '10px'}} >
            <TextField
              autoComplete="off"
              value={searchedTerm}
              onChange={(e) => setSearchedTerm(e.target.value)}
              placeholder="Filter by app name..."
              type="text"
              sx={{mr: '10px'}}
            />
            <IconButton title="Sort by Revenue" onClick={() => setSortIcon(!sortIcon)} >
                {sortIcon ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/> } 
            </IconButton>
            </Box>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  {currentState.map((item) => (
                    <TableCell
                      sx={{
                        color: "#495057",
                        display: item.state ? "table-cell" : "none",
                        alignContent: "center",
                        position: "relative",
                      }}
                      key={item.name}
                    >
                      {/* <IconButton sx={{alignContent: 'center', width: '100%', borderRadius: '10px'}} >
                        <FilterAltIcon />
                    </IconButton> */}
                      <Typography sx={{ fontSize: "14px", width: "100%" }}>
                        {item.name}
                      </Typography>
                    {/* <IconButton sx={{alignContent: 'center', width: '100%', borderRadius: '10px'}} onClick={() => setSortIcon(!sortIcon)} >
                        {sortIcon ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/> } 
                    </IconButton> */}
                      {/* <TextField  sx={{position: 'absolute', zIndex: 9999}} type="text" /> */}
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
                {filteredByName?.map((item, index) => {
                  //   const appName = data.filter(
                  //     ({ app_id, app_name }) => app_id === item.app_id
                  //   );

                  return (
                    <TableRow key={index} className="table">
                      <TableCell>{item.date.slice(0, 10)}</TableCell>
                      <TableCell>{item.app_name}</TableCell>
                      <TableCell
                        sx={{
                          display: currentState[2].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(item.clicks)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[3].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(item.requests)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[4].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(item.responses)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: currentState[5].state
                            ? "table-cell"
                            : "none",
                        }}
                      >
                        {new Intl.NumberFormat("en-IN", {
                          maximumSignificantDigits: 3,
                        }).format(item.impressions)}
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
