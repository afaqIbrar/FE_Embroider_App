import React from 'react';
import {
  Box,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  TableCell,
  TableBody
} from '@mui/material';
import { tokens } from '../../theme';
import { InputBase, IconButton, Button } from '@mui/material';
import Header from '../../components/Header';
import { WORKTYPE } from '../../utils/constants';
import API from '../../utils/axios';
import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '../../utils/useDebounce';
import { useParams } from 'react-router-dom';
import { Table } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from '../../components/atomComponents/Popup';
import AddWork from '../../components/AddWork';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { useReactToPrint } from 'react-to-print';
import AccountsPrint from '../../components/accountsPrint';
import WorkListTable from '../../components/WorkListTable';

const workInitialValues = {
  // quantityLog: '',
  // quantityReturned: '',
  // rate: '',
  // total: '',
  // paymentGiven: '',
  // paymentMode: '',
  // reference: ''
};

const Work = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { workerId } = useParams();
  const [works, setWorks] = useState([]);
  const [workerData, setWorkerData] = useState({});
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [selectedWork, setSelectedWork] = useState({});
  const [openWorkPopup, setOpenWorkPopup] = useState(false);
  const [view, setView] = useState(true);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [showPrint, setShowPrint] = useState(null);

  function handleClose() {
    setShowPrint(null);
  }

  useEffect(() => {
    if (showPrint) {
      handlePrint();
      handleClose();
    }
  }, [showPrint]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    fetchWorkAgainstWorker(debouncedSearchText);
  }, [debouncedSearchText]);

  useEffect(() => {
    fetchWorkerData();
  }, []);

  const formik = useFormik({
    initialValues: {
      ...workInitialValues
    },
    enableReinitialize: true
  });
  const updateWork = async () => {
    try {
      await API.put('work/' + selectedWork._id, formik.values, {
        withCredentials: true
      });
      toast.success('Work Updated Successfully!!!');
      fetchWorkAgainstWorker();
      setOpenWorkPopup(false);
      formik.setValues({ ...workInitialValues });
      selectedWork({});
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };
  const deleteWork = async () => {
    try {
      await API.delete('work/' + selectedWork._id, { withCredentials: true });
      toast.success('Process Lot Deleted Successfully!!!');
      fetchWorkAgainstWorker();
      setOpenDeleteConfirm(false);
      formik.setValues({ ...workInitialValues });
      setSelectedWork({});
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };
  const handleViewClick = async (row) => {
    setSelectedWork(row);
    setView(true);
    setOpenWorkPopup(true);
  };

  const handleEditClick = (row) => {
    setView(false);
    setOpenWorkPopup(true);
    setSelectedWork(row);
  };
  const handleDeleteClick = (row) => {
    setSelectedWork(row);
    setOpenDeleteConfirm(true);
  };

  // function calculateBalance() {
  //   const { totalAmount, totalAmountGiven } = works?.reduce(
  //     (acc, item) => {
  //       // Convert total and paymentGiven to numbers, handling null or empty values
  //       const total = parseFloat(item.total) || 0;
  //       const paymentGiven = parseFloat(item.paymentGiven) || 0;

  //       // Accumulate total and paymentGiven
  //       acc.totalAmount += total;
  //       acc.totalAmountGiven += paymentGiven;

  //       return acc;
  //     },
  //     { totalAmount: 0, totalAmountGiven: 0 }
  //   );

  //   // Calculate the balance
  //   const balance = totalAmount - totalAmountGiven;
  //   setTotalAmount(totalAmount);
  //   setTotalAmoutGiven(totalAmountGiven);
  //   setBalance(balance);
  // }
  // useEffect(() => {
  //   calculateBalance();
  // }, [works]);
  // const columns = [
  //   {
  //     field: '_id',
  //     headerName: 'Id',
  //     width: 50,
  //     renderCell: (params) => <p className="w-4 truncate">{params || '-'}</p>
  //   },
  //   {
  //     field: 'pageNumber',
  //     headerName: 'Page #',
  //     width: 65,
  //     renderCell: (params) => <p>{params.processLotId?.pageNumber || '-'}</p>
  //   },
  //   {
  //     field: 'articleNumber',
  //     headerName: 'Article #',
  //     width: 65,
  //     renderCell: (params) => <p>{params.processLotId?.articleNumber || '-'}</p>
  //   },
  //   {
  //     field: 'color',
  //     headerName: 'Colour',
  //     width: 65,
  //     renderCell: (params) => <p>{params.processLotId?.colour || '-'}</p>
  //   },
  //   {
  //     field: 'billNumber',
  //     headerName: 'Bill #',
  //     width: 65,
  //     renderCell: (params) => <p>{params.processLotId?.billNumber || '-'}</p>
  //   },
  //   {
  //     field: 'quantity',
  //     headerName: 'Qty',
  //     width: 65,
  //     renderCell: (params) => <p>{params.processLotId?.quantity || '-'}</p>
  //   },
  //   {
  //     field: 'workType',
  //     headerName: 'Work Type',
  //     width: 100,
  //     renderCell: (params) => <p>{WORKTYPE[params.workType] || '-'}</p>
  //   },
  //   {
  //     field: 'quantityLog',
  //     headerName: 'Qty Log',
  //     width: 80,
  //     renderCell: (params) => <p>{params.quantityLog || '-'}</p>
  //   },
  //   {
  //     field: 'quantityReturned',
  //     headerName: 'Qty Ret',
  //     width: 80,
  //     renderCell: (params) => <p>{params.quantityReturned || '-'}</p>
  //   },
  //   {
  //     field: 'rate',
  //     headerName: 'Rate',
  //     width: 80,
  //     renderCell: (params) => <p>{params.rate || '-'}</p>
  //   },
  //   {
  //     field: 'total',
  //     headerName: 'Total Amt',
  //     width: 80,
  //     renderCell: (params) => <p>{params.total || '-'}</p>
  //   },
  //   {
  //     field: 'lotClearDate',
  //     headerName: 'Lot Clr Date',
  //     width: 80,
  //     renderCell: (params) => {
  //       if (params?.lotClearDate) {
  //         // Check if assignDate exists in params.row
  //         const date = params?.lotClearDate;
  //         const newDate = new Date(date).toLocaleString('en-GB', {
  //           day: '2-digit',
  //           month: '2-digit',
  //           year: 'numeric'
  //         });
  //         return newDate;
  //       } else {
  //         return '-';
  //       }
  //     }
  //   },
  //   {
  //     field: 'paymentGiven',
  //     headerName: 'Payment Given',
  //     width: 100,
  //     renderCell: (params) => <p>{params.paymentGiven || '-'}</p>
  //   },
  //   {
  //     field: 'paymentMode',
  //     headerName: 'Payment Mode',
  //     width: 100,
  //     renderCell: (params) => <p>{params.paymentMode || '-'}</p>
  //   },
  //   {
  //     field: 'paymentDate',
  //     headerName: 'Payment Date',
  //     width: 100,
  //     renderCell: (params) => {
  //       if (params?.paymentDate) {
  //         // Check if assignDate exists in params.row
  //         const date = params?.paymentDate;
  //         const newDate = new Date(date).toLocaleString('en-GB', {
  //           day: '2-digit',
  //           month: '2-digit',
  //           year: 'numeric'
  //         });
  //         return newDate;
  //       } else {
  //         return '-';
  //       }
  //     }
  //   },
  //   {
  //     field: 'reference',
  //     headerName: 'References',
  //     width: 100,
  //     renderCell: (params) => <p>{params.reference || '-'}</p>
  //   },
  //   {
  //     field: 'workerId',
  //     headerName: 'Worker Name',
  //     width: 200,
  //     renderCell: (params) => <p>{params.workerId?.workerName || '-'}</p>
  //   },
  //   {
  //     field: 'action',
  //     headerName: '',
  //     width: 200
  //   }
  // ];

  const fetchWorkerData = async () => {
    const data = await API.get('workers/byId/' + workerId, {
      withCredentials: true,
      params: {
        search: searchText
      }
    });
    setWorkerData(data.data);
  };

  const fetchWorkAgainstWorker = async (searchText) => {
    const data = await API.get('work/byId/' + workerId, {
      withCredentials: true,
      params: {
        search: searchText
      }
    });
    setWorks(data.data);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`${workerData.workerName || ''} Work List`}
          subtitle={`Welcome to Work List and Accounts of ${
            workerData.workerName || ''
          }`}
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            borderRadius={1}
          >
            <InputBase
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
            />
            <IconButton type="button">
              <SearchIcon />
            </IconButton>
          </Box>
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px'
              }}
              onClick={() => setShowPrint(true)}
            >
              Print Details
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="70vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`
          }
        }}
      >
        {/* <DataGrid
          rows={works}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        /> */}
        <WorkListTable
          works={works}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          handleViewClick={handleViewClick}
        />
        {/* <div>
          <TableContainer className="mt-8 rounded-t-lg border border-solid border-dark300 inventory-table h-[580px]">
            <Table stickyHeader>
              <TableHead className="bg-slate-400">
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{column.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {works &&
                  works.map((row, rowIndex) => (
                    <TableRow>
                      {columns.map((column, index) =>
                        column.field !== 'action' ? (
                          <TableCell
                            key={index}
                            style={{ width: `${column.width}` }}
                          >
                            {column.field === '_id'
                              ? column?.renderCell(rowIndex + 1)
                              : column?.renderCell(row) || '-'}
                          </TableCell>
                        ) : (
                          <TableCell key={index} className="p-0">
                            <Box>
                              <IconButton
                                aria-label="View"
                                style={{ padding: '0px', marginRight: '10px' }}
                                onClick={() => handleViewClick(row)}
                              >
                                <Visibility />
                              </IconButton>
                              <IconButton
                                aria-label="View"
                                style={{ padding: '0px', marginRight: '10px' }}
                                onClick={() => handleDeleteClick(row)}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                              <IconButton
                                aria-label="Edit"
                                style={{ padding: '0px', marginRight: '10px' }}
                                onClick={() => handleEditClick(row)}
                              >
                                <Edit />
                              </IconButton>
                            </Box>
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="w-ful rounded-b-lg h-10  border flex justify-end items-center text-[16px] font-bold pr-16">
            <div className="mr-24">Total Amount : {totalAmount}</div>
            <div className="mr-24">Total Amount Given : {totalAmountGiven}</div>
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
          </div>
        </div> */}
      </Box>
      <Popup
        open={openWorkPopup}
        setOpen={setOpenWorkPopup}
        onClose={() => {
          setOpenWorkPopup(false);
          setView(false);
          setSelectedWork({});
        }}
        content={<AddWork formik={formik} view={view} work={selectedWork} />}
        actions={
          view ? (
            <div className="flex gap-2">
              <Button
                sx={{
                  backgroundColor: colors.redAccent[500],
                  color: colors.grey[100],
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '5px 10px'
                }}
                onClick={() => {
                  setOpenWorkPopup(false);
                  setView(false);
                  setSelectedWork({});
                }}
                size="medium"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                sx={{
                  backgroundColor: colors.redAccent[500],
                  color: colors.grey[100],
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '5px 10px'
                }}
                onClick={() => {
                  setOpenWorkPopup(false);
                  setView(false);
                  setSelectedWork({});
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[600],
                  color: colors.grey[100],
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '5px 10px'
                }}
                onClick={updateWork}
              >
                Update Work
              </Button>
            </div>
          )
        }
        title={view ? 'Work Details' : `Edit Work`}
      />
      <Popup
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        content={'Are You Sure you want to delete this Work!!!'}
        actions={
          <div className="flex gap-2">
            <Button
              sx={{
                backgroundColor: colors.redAccent[500],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '5px 10px'
              }}
              onClick={() => {
                setOpenDeleteConfirm(false);
                setSelectedWork({});
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[600],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '5px 10px'
              }}
              onClick={deleteWork}
            >
              Delete Work
            </Button>
          </div>
        }
        title={`Delete Worker`}
      />
      <div ref={componentRef}>
        <AccountsPrint
          showPrint={showPrint}
          workerData={workerData}
          works={works}
          printFlag={true}
        />
      </div>
    </Box>
  );
};

export default Work;
