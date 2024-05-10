import React, { useEffect, useState } from 'react';
import { Box, useTheme, InputBase, IconButton, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import { Edit, Visibility } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Popup from '../../components/atomComponents/Popup';
import AddProcessLot from '../../components/AddProcessLot';
import axios from 'axios';
import useDebounce from '../../utils/useDebounce';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [addProcessLotPopup, setAddProcessLotPopup] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedProcessLot, setSelectedProcessLot] = useState({});
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [view, setView] = useState(true);
  const [processLotPopup, setProcessLotPopup] = useState(false);

  const debouncedSearchText = useDebounce(searchText, 300);
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
      const data = await axios.get(
        process.env.REACT_APP_API_PATH + '/processLot/',
        {
          withCredentials: true,
          params: {
            search: searchText
          }
        }
      );
      setProcessLot(data.data);
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
      await axios.delete(
        process.env.REACT_APP_API_PATH +
          '/processLot/' +
          selectedProcessLot._id,
        { withCredentials: true }
      );
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
      await axios.post(
        process.env.REACT_APP_API_PATH + '/processLot/',
        formik.values,
        { withCredentials: true }
      );
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
      await axios.put(
        process.env.REACT_APP_API_PATH +
          '/processLot/' +
          selectedProcessLot._id,
        formik.values,
        { withCredentials: true }
      );
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

  const columns = [
    { field: '_id', headerName: 'Id', width: 20 },
    { field: 'pageNumber', headerName: 'Page Number', width: 100 },
    { field: 'articleNumber', headerName: 'Article #', width: 150 },
    { field: 'colour', headerName: 'Colour', width: 150 },
    {
      field: 'billNumber',
      headerName: 'Bill #',
      width: 150,
      renderCell: (params) => <p>{params.row.billNumber || '-'}</p>
    },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    {
      field: 'handWorkerId',
      headerName: 'Hand Worker',
      width: 200,
      renderCell: (params) => (
        <p>{params.row?.handWorkerId?.workerName || '-'}</p>
      )
    },
    {
      field: 'dupattaWorkerId',
      headerName: 'Dupatta Worker',
      width: 200,
      renderCell: (params) => (
        <p>{params.row?.dupattaWorkerId?.workerName || '-'}</p>
      )
    },
    {
      field: 'innerWorkerId',
      headerName: 'Inner Worker',
      width: 200,
      renderCell: (params) => (
        <p>{params.row?.innerWorkerId?.workerName || '-'}</p>
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
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="View"
            onClick={() => handleViewClick(params.row)}
          >
            <Visibility />
          </IconButton>
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
        <Header title="Process Lot" subtitle="Welcome to Process Lot" />
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
        <DataGrid
          rows={processLot}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>

      <Popup
        open={addProcessLotPopup}
        setOpen={setAddProcessLotPopup}
        onClose={() => {
          setAddProcessLotPopup(false);
          formik.setValues({ ...processLotInitialValues });
        }}
        content={<AddProcessLot formik={formik} />}
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
                backgroundColor: colors.redAccent[500],
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
              Delete Worker
            </Button>
          </div>
        }
        title={`Delete Worker`}
      />
    </Box>
  );
};

export default ProcessLot;
