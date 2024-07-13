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

  function calculatePending(work) {
    const quantity = Number(work?.processLotId?.quantity || 0);
    const quantityReturned = Number(work?.quantityReturned || 0);
    return quantity - quantityReturned;
  }

  return (
    <>
      <ThemeProvider theme={localTheme}>
        <GlobalStyles styles={printStyle} />
        <Box displayPrint="block" style={{ color: 'black' }}>
          <Box displayPrint="block">
            <Box style={{ marginTop: '10px' }}>
              <Grid container spacing={2} className="mb-2 text-lg">
                <Grid item xs={4}>
                  <div className="flex bg-red">
                    <span
                      style={{
                        marginLeft: '10px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      Worker:
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
                <Grid item xs={4}>
                  <Box style={{ marginTop: '20px' }}>
                    <div
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <h4 style={{ fontSize: '25px', margin: 0 }}>
                        Taha Collection
                      </h4>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={4}>
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
                          DATE
                        </TableCell>
                        {/* <TableCell
                          sx={{
                            minWidth: 20,
                            maxWidth: 20,
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          Page
                        </TableCell> */}
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
                          ART
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
                          CLR
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
                          BILL
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
                          QTY
                        </TableCell>
                        {/* <TableCell
                          sx={{
                            minWidth: 30,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          LOG
                        </TableCell> */}
                        <TableCell
                          sx={{
                            minWidth: 10,
                            maxWidth: 20,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          PEND
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
                          RATE
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
                          TOTAL
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
                          DATE
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
                          CLM
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
                          PAYM
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
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}
                        >
                          REF
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
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={`text-[16px] font-bold flex justify-center ${
                                    work?.processLotId?.assignDate
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : ''
                                  }`}
                                >
                                  {convertDate(
                                    work?.processLotId?.assignDate || null
                                  )}
                                </p>
                              </TableCell>
                              {/* <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                {work?.processLotId?.pageNumber || '-'}
                              </TableCell> */}
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
                                  className={`text-[16px] font-bold flex justify-center ${
                                    work?.processLotId?.articleNumber
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : ''
                                  }`}
                                >
                                  {work?.processLotId?.articleNumber || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  padding: 0
                                }}
                              >
                                <p
                                  className={`w-16 text-[14px] font-bold flex justify-center  ${
                                    work?.processLotId?.colour
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : ''
                                  }`}
                                >
                                  {work?.processLotId?.colour || '-'}
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
                                  className={`text-[16px] font-bold flex justify-center   ${
                                    work?.processLotId?.billNumber
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : ''
                                  }`}
                                >
                                  {work?.processLotId?.billNumber || '-'}
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
                                  className={`text-[16px] font-bold flex justify-center  ${
                                    work?.processLotId?.quantity
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : ''
                                  }`}
                                >
                                  {work?.processLotId?.quantity || '-'}
                                </p>
                              </TableCell>
                              {/* <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-[14px] font-bold flex justify-center  ${
                                    work?.quantityLog
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {work?.quantityLog
                                    ? work.quantityLog.length > 9
                                      ? work.quantityLog
                                          .split(',')
                                          .reduce((acc, curr, index) => {
                                            return (
                                              acc +
                                              (index && index % 4 === 0
                                                ? '\n'
                                                : '') +
                                              curr +
                                              ','
                                            );
                                          }, '')
                                          .slice(0, -1) // Remove the trailing comma
                                      : work.quantityLog
                                    : '-'}
                                </p>
                              </TableCell> */}
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px'
                                }}
                              >
                                <p
                                  className={`text-[16px] font-bold flex justify-center  ${
                                    work?.processLotId?.quantity
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : ''
                                  }`}
                                >
                                  {calculatePending(work)}
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
                                  className={`text-[16px] font-bold flex justify-center  ${
                                    work?.rate
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {work?.rate || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  fontSize: '10px',
                                  padding: 0
                                }}
                              >
                                <p
                                  className={`text-[16px] font-bold flex justify-center  ${
                                    work?.total
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {work?.total || '-'}
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
                                  className={`text-[16px] font-bold flex justify-center  ${
                                    work?.lotClearDate
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {convertDate(work?.lotClearDate || null)}
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
                                  className={`text-[12px] font-bold flex justify-center  ${
                                    work?.lotClearDate
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {work?.claim || '-'}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  minWidth: 20,
                                  maxWidth: 20,
                                  minHeight: 10,
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  paddingLeft: 0
                                }}
                              >
                                <p
                                  className={`text-[14px] font-bold flex justify-center  ${
                                    work?.paymentGiven
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {work?.paymentGiven || '-'}
                                </p>
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
                                  fontSize: '10px',
                                  paddingBottom: 0,
                                  paddingTop: 0
                                }}
                              >
                                <p
                                  className={`text-[12px] flex font-bold justify-center  ${
                                    work?.reference
                                      ? work?.rate &&
                                        work?.quantityReturned ===
                                          work?.processLotId?.quantity &&
                                        Number(work?.total) ===
                                          Number(work?.paymentGiven) +
                                            Number(work?.claim || 0)
                                        ? 'text-green-500'
                                        : work?.processLotId?.quantity ===
                                          work?.quantityReturned
                                        ? 'text-newBlue'
                                        : 'text-red-600'
                                      : 'text-black'
                                  }`}
                                >
                                  {work?.reference || '-'}
                                </p>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Paper className="w-ful rounded-b-lg h-10  border flex justify-between items-center text-[16px] font-bold pr-16">
                  <div style={{ marginLeft: '10px' }} className="pr-15">
                    Total Amount : {totalAmount}
                  </div>
                  <div style={{ marginLeft: '10px' }} className="mr-15">
                    Total Amount Given : {totalAmountGiven}
                  </div>
                  <div
                    style={{ marginRight: '10px' }}
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
