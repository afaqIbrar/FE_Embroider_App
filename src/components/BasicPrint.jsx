import { Box, Divider, GlobalStyles } from '@mui/material';
import { Grid } from '@mui/material';
import { WORKERTYPE } from '../utils/constants';
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
import clsx from 'clsx';

const BasicPrint = ({
  workerData,
  works,
  balance,
  totalAmountGiven,
  totalAmount
}) => {
  const printStyle = {
    ['@media print']: {
      ['@page']: {
        margin: '20px 0px',
        color: 'black'
      }
    }
  };

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

  return (
    <>
      <ThemeProvider theme={localTheme}>
        <GlobalStyles styles={printStyle} />
        <Box displayPrint="block" style={{ color: 'black' }}>
          <Box style={{ marginTop: '20px' }}>
            <div
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h1 style={{ fontSize: '35px', margin: 0 }}>Taha Collection</h1>
            </div>
          </Box>
          <Box displayPrint="block">
            <Box style={{ marginTop: '15px' }}>
              <div
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <p style={{ fontSize: '20px', margin: 0 }}>Account Details</p>
              </div>
            </Box>
            <Box style={{ marginTop: '10px' }}>
              <Grid container spacing={2} className="mb-2 text-lg">
                <Grid item xs={6}>
                  <div className="flex ml-5 bg-red">
                    <span
                      style={{
                        marginLeft: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      Worker Name :
                    </span>
                    <span
                      style={{
                        marginLeft: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {workerData?.workerName || '-'}
                    </span>
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
                      Worker Type :
                    </span>
                    <span
                      style={{
                        marginLeft: '20px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {WORKERTYPE[workerData?.workerType] || '-'}
                    </span>
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
            {/* <Divider
            style={{
              border: '0.5px dashed ',
              marginTop: '10px'
            }}
          /> */}
            <Box>
              <div
                className="mt-3 text-xl border-b"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Work Details
              </div>
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
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Page
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Art
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Clr
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Bill
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Qty
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 30,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Log
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 10,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Ret
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Rate
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Paym
                        </TableCell>
                        {/* <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Date
                        </TableCell> */}
                        <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Ref
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {works &&
                        works.map((work, index) => {
                          return (
                            <TableRow key={index} sx={{ minHeight: 10 }}>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {convertDate(
                                  work?.processLotId?.assignDate || null
                                )}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.processLotId?.pageNumber || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.processLotId?.articleNumber || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.processLotId?.colour || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.processLotId?.billNumber || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.processLotId?.quantity || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.quantityLog || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.quantityReturned || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.rate || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.total || '-'}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {convertDate(work?.lotClearDate || null)}
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.paymentGiven || '-'}
                              </TableCell>
                              {/* <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {convertDate(work?.paymentDate || null)}
                              </TableCell> */}
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.reference || '-'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Paper className="w-ful rounded-b-lg h-10  border flex justify-end items-center text-[16px] font-bold pr-16">
                  <div className="mr-24">Total Amount : {totalAmount}</div>
                  <div className="mr-24">
                    Total Amount Given : {totalAmountGiven}
                  </div>
                  <div
                    className={clsx('font-bold', {
                      'text-red-500': balance > 0,
                      'text-green-500': balance < 0
                    })}
                  >
                    {balance > 0 ? (
                      <p>Pending : {balance}</p>
                    ) : (
                      <p>Balance : {balance}</p>
                    )}
                  </div>
                </Paper>
              </div>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default BasicPrint;
