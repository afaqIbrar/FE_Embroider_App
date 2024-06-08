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
  console.log('process', processLot);

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
                      {' '}
                      {/* {'12-12-2012 - 12-12-2012' || '-'} */}
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
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Page#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Article#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Colour
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Bill#
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                          className="truncate"
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                          className="truncate"
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 30,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Hand Wrk
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Dupt Wrk
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Inner Wrk
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] ${
                                    process?.assignDate
                                      ? 'bg-green-900'
                                      : 'bg-red-700'
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] ${
                                    process?.assignDate
                                      ? 'bg-green-900'
                                      : 'bg-red-700'
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] ${
                                    process?.assignDate
                                      ? 'bg-green-900'
                                      : 'bg-red-700'
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] ${
                                    process?.billNumber
                                      ? process?.assignDate
                                        ? 'bg-green-900'
                                        : 'bg-blue-500'
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] ${
                                    process.quantity
                                      ? process.assignDate
                                        ? 'bg-green-900'
                                        : 'bg-blue-500'
                                      : 'text-black'
                                  }`}
                                >
                                  {process?.quantity || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] ${
                                    process?.assignDate
                                      ? process?.assignDate
                                        ? 'bg-green-900'
                                        : 'bg-blue-500'
                                      : 'text-black '
                                  }`}
                                >
                                  {convertDate(process?.assignDate || null)}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] truncate ${
                                    process?.handWorkerId?.workerName
                                      ? process?.assignDate
                                        ? 'bg-green-900'
                                        : 'bg-blue-500'
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] truncate ${
                                    process?.dupattaWorkerId?.workerName
                                      ? process?.assignDate
                                        ? 'bg-green-900'
                                        : 'bg-blue-500'
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
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-white text-[12px] truncate ${
                                    process?.innerWorkerId?.workerName
                                      ? process?.assignDate
                                        ? 'bg-green-900'
                                        : 'bg-blue-500'
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
