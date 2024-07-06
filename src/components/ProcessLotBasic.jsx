import React from 'react';
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  createTheme,
  ThemeProvider,
  Paper
} from '@mui/material';
import { Box, Grid, Divider, GlobalStyles } from '@mui/material';

const ProcessLotBasic = ({ processLot }) => {
  const printStyle = {
    ['@media print']: {
      ['@page']: {
        margin: '20px 0px',
        color: 'black'
      }
    }
  };
  function convertDate(date) {
    if (date) {
      const newDate = new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit'
      });
      return newDate;
    } else {
      return '-';
    }
  }
  const localTheme = createTheme({
    palette: {
      primary: {
        main: '#000000'
      },
      secondary: {
        main: '#dc004e'
      }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '8px'
          }
        }
      }
    }
  });

  return (
    <>
      <ThemeProvider theme={localTheme}>
        <GlobalStyles styles={printStyle} />
        <Box displayPrint="block" style={{ color: 'black' }}>
          <Box displayPrint="block">
            <Box style={{ marginTop: '10px' }}>
              <Grid container spacing={2} className="mb-2 text-lg">
                <Grid item xs={6}>
                  <div
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <h1 style={{ fontSize: '35px', margin: 0 }}>
                      Taha Collection
                    </h1>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="flex ml-5">
                    <span
                      style={{
                        marginLeft: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      Date :
                    </span>
                    <span
                      style={{
                        marginLeft: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <div
                className="mt-3 mx-8 text-xl"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TableContainer
                  component={Paper}
                  className="rounded-t-lg border border-solid border-dark300"
                >
                  <Table>
                    <TableHead className="">
                      <TableRow>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Page#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Article#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Colour
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Bill#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                          className="truncate"
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                          className="truncate"
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Hand#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Dupt#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          Inner#
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {processLot &&
                        processLot.map((process, index) => {
                          return (
                            <TableRow key={process._id} sx={{ minHeight: 10 }}>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingTop: '7px',
                                  paddingBottom: '7px'
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold flex justify-center ${
                                    process?.assignDate
                                      ? 'text-green-500'
                                      : 'text-red-600'
                                  }`}
                                >
                                  {process?.pageNumber || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold flex justify-center  ${
                                    process?.assignDate
                                      ? 'text-green-500'
                                      : 'text-red-600'
                                  }`}
                                >
                                  {process?.articleNumber || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold flex justify-center ${
                                    process?.assignDate
                                      ? 'text-green-500'
                                      : 'text-red-600'
                                  }`}
                                >
                                  {process?.colour || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold flex justify-center ${
                                    process?.billNumber
                                      ? process?.assignDate
                                        ? 'text-green-500'
                                        : 'text-newBlue'
                                      : 'text-black'
                                  }`}
                                >
                                  {process?.billNumber || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold flex justify-center  ${
                                    process.quantity
                                      ? process.assignDate
                                        ? 'text-green-500'
                                        : 'text-newBlue'
                                      : 'text-black'
                                  }`}
                                >
                                  {process?.quantity || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 10,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold flex justify-center ${
                                    process?.assignDate
                                      ? process?.assignDate
                                        ? 'text-green-500'
                                        : 'text-newBlue'
                                      : 'text-black '
                                  }`}
                                >
                                  {convertDate(process?.assignDate || null)}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 10,
                                  maxWidth: 10,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  paddingLeft: 0
                                }}
                              >
                                <p
                                  className={` text-[13px] font-bold truncate flex justify-center  ${
                                    process?.handWorkerId?.workerName
                                      ? process?.assignDate
                                        ? 'text-green-500'
                                        : 'text-newBlue'
                                      : 'text-black'
                                  }`}
                                >
                                  {process?.handWorkerId?.workerName || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  paddingLeft: 0
                                }}
                              >
                                <p
                                  className={` text-[12px] font-bold truncate flex justify-center  ${
                                    process?.dupattaWorkerId?.workerName
                                      ? process?.assignDate
                                        ? 'text-green-500'
                                        : 'text-newBlue'
                                      : 'text-black'
                                  }`}
                                >
                                  {process?.dupattaWorkerId?.workerName || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  paddingLeft: 0
                                }}
                              >
                                <p
                                  className={` text-[12px] font-bold truncate flex justify-center ${
                                    process?.innerWorkerId?.workerName
                                      ? process?.assignDate
                                        ? 'text-green-500'
                                        : 'text-newBlue'
                                      : 'text-black'
                                  }`}
                                >
                                  {process?.innerWorkerId?.workerName || '-'}
                                </p>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ProcessLotBasic;
