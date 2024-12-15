import { Box, Divider, GlobalStyles } from '@mui/material';
import { Grid } from '@mui/material';
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

const AccountBasic = ({
  workerData,
  accounts,
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
              <Box>
                <div className='text-lg ml-6'>
                    <div>User Balance : <span className={` font-bold ${workerData?.balance <= 0 ? 'text-green-500' : 'text-red-600'}`}>{workerData?.balance}</span></div>
                </div>
              </Box>
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
                          DESC
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
                          BILL #
                        </TableCell>
                        {workerData.workerType !== 'INNER_WORKER' && (
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
                            DEBIT
                          </TableCell>
                        )}
                        {workerData.workerType === 'INNER_WORKER' && (
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
                            CREDIT
                          </TableCell>
                        )}
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
                          PRE
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
                            BLNC
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accounts &&
                        accounts.map((account, index) => {
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
                                  className={`text-[16px] text-black font-bold flex justify-center`}
                                >
                                  {convertDate(
                                    account?.recordDate || null
                                  )}
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
                                  className={`text-[16px] font-bold flex justify-center`}
                                >
                                  {account?.description || '-'}
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
                                  className={`text-[16px] font-bold flex justify-center`}
                                >
                                  {account?.workerAssignmentId?.processLotId?.quantity || '-'}
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
                                 className={`text-[16px] font-bold flex justify-center`}
                                >
                                  {account?.workerAssignmentId?.processLotId?.colour || '-'}
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
                                  className={`text-[16px] font-bold flex justify-center `}
                                >
                                  {account?.workerAssignmentId?.processLotId?.billNumber || '-'}
                                </p>
                              </TableCell>
                              {
                                <TableCell
                                  sx={{
                                    minWidth: 20,
                                    maxWidth: 20,
                                    minHeight: 10,
                                    fontSize: '10px'
                                  }}
                                >
                                  <p
                                    className={`text-[16px] font-bold flex justify-center text-red-400`}
                                  >
                                    {account.paymentType === 'DEBIT' ?  account?.amount : '-'}
                                  </p>
                                </TableCell>
                              }
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
                                  className={`text-[16px] font-bold flex justify-center text-green-400`}
                                >
                                  {account.paymentType === 'CREDIT' ?account?.amount : '-'}
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
                                  className={`text-[16px] font-bold flex justify-center `}
                                >
                                  {account?.previousBalance === 0 ? 0 : account?.previousBalance}
                                </p>
                              </TableCell>
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
                                className={`text-[16px] font-bold flex justify-center ${account?.currentBalance <= 0 ? 'text-green-500' : 'text-red-600'}`}
                                >
                                  {account?.currentBalance === 0 ? 0 : account?.currentBalance}
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
export default AccountBasic;
