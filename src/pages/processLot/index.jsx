import React, { useEffect, useState } from 'react';
import { Box, useTheme, InputBase, IconButton, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import { Edit, Visibility } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Popup from '../../components/atomComponents/Popup';
import AddProcessLot from '../../components/AddProcessLot';
import useDebounce from '../../utils/useDebounce';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../utils/axios';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ProcessLotMainPrint from '../../components/ProcessLotMainPrint';
import Slider from '@mui/material/Slider';
import { toaster } from '../../utils/utils';

const processLotInitialValues = {
  pageNumber: '',
  articleNumber: '',
  colour: '',
  billNumber: '',
  quantity: '',
  handWorker: {},
  dupattaWorker: {},
  innerWorker: {}
};

const ProcessLot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [processLot, setProcessLot] = useState([]);
  const [reverseProcessLot, setReverseProcessLot] = useState([]);
  const [addProcessLotPopup, setAddProcessLotPopup] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedProcessLot, setSelectedProcessLot] = useState({});
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [view, setView] = useState(true);
  const [processLotPopup, setProcessLotPopup] = useState(false);
  const [showPrint, setShowPrint] = useState(null);
  const debouncedSearchText = useDebounce(searchText, 300);
  const [pageStartValue, setPageStartValue] = useState(1);
  const [pageEndValue, setPageEndValue] = useState(100);

  const handleAddProcessLot = () => {
    setAddProcessLotPopup(true);
  };
  const formik = useFormik({
    initialValues: {
      ...processLotInitialValues
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // addWorker(values);
    }
  });

  const fetchProcessLotData = async (searchText) => {
    try {
      const data = await API.get('processLot/', {
        withCredentials: true,
        params: {
          search: searchText,
          pageStartValue: pageStartValue,
          pageEndValue: pageEndValue
        }
      });
      setProcessLot(data.data);
      const copyData = [...data.data];
      setReverseProcessLot(
        copyData.sort((a, b) => a.pageNumber - b.pageNumber)
      );
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleDeleteClick = (row) => {
    setSelectedProcessLot(row);
    setOpenDeleteConfirm(true);
  };
  const deleteProcessLot = async () => {
    try {
      await API.delete('processLot/' + selectedProcessLot._id, {
        withCredentials: true
      });
      toast.success('Process Lot Deleted Successfully!!!');
      fetchProcessLotData();
      setOpenDeleteConfirm(false);
      formik.setValues({ ...processLotInitialValues });
      setSelectedProcessLot({});
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProcessLotData(debouncedSearchText);
  }, [debouncedSearchText]);

  const addProcessLot = async () => {
    try {
      await API.post('processLot/', formik.values, { withCredentials: true });
      toast.success('Worker Added Successfully!!!');
      fetchProcessLotData();
      setAddProcessLotPopup(false);
      formik.setValues({ ...processLotInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const updateProcessLot = async () => {
    try {
      await API.put('processLot/' + selectedProcessLot._id, formik.values, {
        withCredentials: true
      });
      toast.success('Process Lot Updated Successfully!!!');
      fetchProcessLotData();
      setProcessLotPopup(false);
      formik.setValues({ ...processLotInitialValues });
      selectedProcessLot({ ...processLotInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const handleViewClick = (row) => {
    setSelectedProcessLot(row);
    setView(true);
    setProcessLotPopup(true);
  };
  const handleEditClick = (row) => {
    setView(false);
    setProcessLotPopup(true);
    setSelectedProcessLot(row);
  };

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

  const columns = [
    // {
    //   field: '_id',
    //   headerName: 'Id',
    //   width: 20,
    //   valueGetter: (params) => params.api.getRowIndex(params.id) + 1
    // },
    {
      field: 'pageNumber',
      headerName: 'Page',
      width: 55,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold ${
            params.row.assignDate ? 'text-green-500' : 'text-red-600'
          }`}
        >
          {params.row.pageNumber || '-'}
        </p>
      )
    },
    {
      field: 'articleNumber',
      headerName: 'Article #',
      width: 80,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold ${
            params.row.assignDate ? 'text-green-500' : 'text-red-600'
          }`}
        >
          {params.row.articleNumber || '-'}
        </p>
      )
    },
    {
      field: 'colour',
      headerName: 'Colour',
      width: 140,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold ${
            params.row.assignDate ? 'text-green-500' : 'text-red-600'
          }`}
        >
          {params.row.colour || '-'}
        </p>
      )
    },
    {
      field: 'billNumber',
      headerName: 'Bill #',
      width: 50,
      renderCell: (params) => (
        <p
          // className={`${params.row.billNumber ? ${params.row.assignDate ? 'bg-green-500 p-2 text-sm' : 'bg-blue-500 p-2 text-sm'} :  '' }}
          className={`p-1 text-[18px] font-bold ${
            params.row.billNumber
              ? params.row.assignDate
                ? 'text-green-500'
                : 'text-newBlue'
              : ''
          }`}
        >
          {params.row.billNumber || '-'}
        </p>
      )
    },
    {
      field: 'quantity',
      headerName: 'QTY',
      width: 60,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold ${
            params.row.quantity
              ? params.row.assignDate
                ? 'text-green-500'
                : 'text-newBlue'
              : ''
          }`}
        >
          {params.row.quantity || '-'}
        </p>
      )
    },
    {
      field: 'assignDate',
      headerName: 'Assign Date',
      width: 150,
      valueGetter: (params) => {
        if (params?.row?.assignDate) {
          // Check if assignDate exists in params.row
          const assignDate = params.row.assignDate;
          const localCreatedAt = new Date(assignDate).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return localCreatedAt;
        } else {
          return '-';
        }
      },
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold ${
            params.row.assignDate
              ? params.row.assignDate
                ? 'text-green-500'
                : 'text-newBlue'
              : ''
          }`}
        >
          {params.value}
        </p>
      )
    },
    {
      field: 'handWorkerId',
      headerName: 'Hand Worker',
      width: 140,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold truncate ${
            params.row?.handWorkerId?.workerName
              ? params?.row?.assignDate
                ? 'text-green-500'
                : 'text-newBlue'
              : ''
          }`}
        >
          {params.row?.handWorkerId?.workerName || '-'}
        </p>
      )
    },
    {
      field: 'dupattaWorkerId',
      headerName: 'Dupatta Worker',
      width: 140,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold truncate ${
            params.row?.dupattaWorkerId?.workerName
              ? params.row.assignDate
                ? 'text-green-500'
                : 'text-newBlue'
              : ''
          }`}
        >
          {params.row?.dupattaWorkerId?.workerName || '-'}
        </p>
      )
    },
    {
      field: 'innerWorkerId',
      headerName: 'Inner Worker',
      width: 140,
      renderCell: (params) => (
        <p
          className={`p-1 text-[18px] font-bold truncate ${
            params.row?.innerWorkerId?.workerName
              ? params.row.assignDate
                ? 'text-green-500'
                : 'text-newBlue'
              : ''
          }`}
        >
          {params.row?.innerWorkerId?.workerName || '-'}
        </p>
      )
    },

    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          {/* <IconButton
            aria-label="View"
            onClick={() => handleViewClick(params.row)}
          >
            <Visibility />
          </IconButton> */}
          <IconButton
            aria-label="View"
            onClick={() => handleDeleteClick(params.row)}
          >
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton
            aria-label="Edit"
            onClick={() => handleEditClick(params.row)}
          >
            <Edit />
          </IconButton>
        </Box>
      )
    }
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* <Header title="Process Lot" subtitle="Welcome to Process Lot" /> */}
        <Box className="text-lg mb-1">Process Lot</Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: 400, color: 'White' }} display="flex">
          {/* <Slider
            sx={{ color: 'white' }}
            getAriaLabel={() => 'Page'}
            value={pageValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            disableSwap
          /> */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            width={100}
            borderRadius={1}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, width: '20px' }}
              placeholder="Start Page"
              onChange={(e) => {
                setPageStartValue(e.target.value);
              }}
              value={pageStartValue}
            />
          </Box>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            width={100}
            ml={2}
            borderRadius={1}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="End Page"
              onChange={(e) => {
                setPageEndValue(e.target.value);
              }}
              value={pageEndValue}
            />
          </Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              marginLeft: '12px'
            }}
            onClick={() => fetchProcessLotData()}
          >
            Search
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              marginRight: '10px'
            }}
            onClick={() => setShowPrint(true)}
          >
            Print Details
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
            onClick={handleAddProcessLot}
          >
            Add Process Lot
          </Button>
        </Box>
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="580px"
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
        <DataGrid
          rows={processLot}
          columns={columns}
          getRowId={(row) => row._id}
          density="compact"
          sx={{
            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
              outline: 'rgba(255,255,255) solid 1px',
              outlineOffset: '-1px'
            }
          }}
        />
      </Box>

      <Popup
        open={addProcessLotPopup}
        setOpen={setAddProcessLotPopup}
        onClose={() => {
          setAddProcessLotPopup(false);
          formik.setValues({ ...processLotInitialValues });
        }}
        content={<AddProcessLot formik={formik} flag={true} />}
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
                setAddProcessLotPopup(false);
                formik.setValues({ ...processLotInitialValues });
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
              onClick={addProcessLot}
            >
              Add Process Lot
            </Button>
          </div>
        }
        title={'Add Process Lot'}
      />
      <Popup
        open={processLotPopup}
        setOpen={setProcessLotPopup}
        onClose={() => {
          setProcessLotPopup(false);
          setView(false);
          setSelectedProcessLot({ ...processLotInitialValues });
        }}
        content={
          <AddProcessLot
            formik={formik}
            view={view}
            processLot={selectedProcessLot}
          />
        }
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
                  setProcessLotPopup(false);
                  setView(false);
                  setSelectedProcessLot({ ...processLotInitialValues });
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
                  setProcessLotPopup(false);
                  setView(false);
                  setSelectedProcessLot({ ...processLotInitialValues });
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
                onClick={updateProcessLot}
              >
                Update Worker
              </Button>
            </div>
          )
        }
        title={view ? 'Process Lot Details' : `Edit Process Lot`}
      />
      <Popup
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        content={'Are You Sure you want to delete this ProcessLot!!!'}
        actions={
          <div className="flex gap-2">
            <Button
              sx={{
                backgroundColor: colors.redAccent[400],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '5px 10px'
              }}
              onClick={() => {
                setOpenDeleteConfirm(false);
                setSelectedProcessLot({});
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
              onClick={deleteProcessLot}
            >
              Delete Process Lot
            </Button>
          </div>
        }
        title={`Delete Worker`}
      />
      <div ref={componentRef}>
        <ProcessLotMainPrint
          processLot={reverseProcessLot}
          showPrint={showPrint}
          pageStartValue={pageStartValue}
          pageEndValue={pageEndValue}
        />
      </div>
    </Box>
  );
};

export default ProcessLot;
