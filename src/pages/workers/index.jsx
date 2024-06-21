import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { InputBase, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from '../../theme';
import { Edit, Visibility } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { WORKERTYPE } from '../../utils/constants';
import Popup from '../../components/atomComponents/Popup';
import AddWorker from '../../components/AddWorker';
import useDebounce from '../../utils/useDebounce';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../utils/axios';
const workerInitialValues = {
  workerName: '',
  workerType: 'HAND_WORKER',
  phoneNumber: ''
};

const Workers = () => {
  const theme = useTheme();
  const [worker, setWorkers] = useState([]);
  const [addWorkerPopup, setAddWorkerPopup] = useState(false);
  const [openWorkerPopUp, setWorkerPopup] = useState(false);
  const [view, setView] = useState(true);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [selectedWorker, setSelectedWorker] = useState({
    ...workerInitialValues
  });
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      ...workerInitialValues
    },
    onSubmit: (values) => {
      addWorker(values);
    }
  });

  const addWorker = async () => {
    try {
      await API.post('workers/', formik.values, { withCredentials: true });
      toast.success('Worker Added Successfully!!!');
      fetchWorkersData();
      setAddWorkerPopup(false);
      formik.setValues({ ...workerInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };
  const editWorker = async () => {
    try {
      await API.put('workers/' + selectedWorker._id, formik.values, {
        withCredentials: true
      });
      toast.success('Worker Update Successfully!!!');
      fetchWorkersData();
      setWorkerPopup(false);
      formik.setValues({ ...workerInitialValues });
      selectedWorker({ ...workerInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const fetchWorkersData = async (searchText) => {
    const data = await API.get('workers/', {
      withCredentials: true,
      params: {
        search: searchText
      }
    });
    setWorkers(data.data);
  };
  useEffect(() => {
    fetchWorkersData(debouncedSearchText);
  }, [debouncedSearchText]);

  const handleAddWorker = () => {
    setAddWorkerPopup(true);
  };
  const handleViewClick = (row) => {
    setSelectedWorker(row);
    setView(true);
    setWorkerPopup(true);
  };
  const handleEditClick = (row) => {
    setSelectedWorker(row);
    setView(false);
    setWorkerPopup(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedWorker(row);
    setOpenDeleteConfirm(true);
  };

  const deleteWorker = async () => {
    try {
      await API.delete('workers/' + selectedWorker._id, {
        withCredentials: true
      });
      toast.success('Worker Delete Successfully!!!');
      fetchWorkersData();
      setOpenDeleteConfirm(false);
      formik.setValues({ ...workerInitialValues });
      setSelectedWorker({ ...workerInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: '_id',
      headerName: 'Id',
      width: 50,
      valueGetter: (params) => params.api.getRowIndex(params.id) + 1
    },
    {
      field: 'workerName',
      headerName: 'Worker Name',
      cellClassName: 'name-column--cell',
      width: 150
    },
    {
      field: 'workerType',
      headerName: 'Worker Type',
      width: 150,
      renderCell: (params) => <p>{WORKERTYPE[params.value]}</p>
    },
    // {
    //   field: 'phoneNumber',
    //   headerName: 'Phone #',
    //   width: 150
    // },
    // {
    //   field: 'createdAt',
    //   headerName: 'Created At',
    //   width: 200,
    //   valueGetter: (params) => {
    //     const createdAt = params.row.createdAt; // Get the createdAt value from the row
    //     const localCreatedAt = new Date(createdAt).toLocaleString();
    //     return localCreatedAt;
    //   }
    // },
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
        <Header title="Workers" subtitle="Welcome to Workers Screen" />
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
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
            onClick={handleAddWorker}
          >
            Add Worker
          </Button>
        </Box>
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="450px"
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
          rows={worker}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>

      <Popup
        open={openWorkerPopUp}
        setOpen={setWorkerPopup}
        onClose={() => {
          setWorkerPopup(false);
          setView(false);
          setSelectedWorker({ ...workerInitialValues });
        }}
        content={
          <AddWorker view={view} formik={formik} worker={selectedWorker} />
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
                  setWorkerPopup(false);
                  setView(false);
                  setSelectedWorker({ ...workerInitialValues });
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
                  setWorkerPopup(false);
                  setView(false);
                  setSelectedWorker({ ...workerInitialValues });
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
                onClick={editWorker}
              >
                Update Worker
              </Button>
            </div>
          )
        }
        title={view ? 'Worker Details' : `Edit Worker`}
      />
      <Popup
        open={addWorkerPopup}
        setOpen={setAddWorkerPopup}
        content={<AddWorker formik={formik} />}
        onClose={() => {
          setAddWorkerPopup(false);
          formik.setValues({ ...workerInitialValues });
        }}
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
                setAddWorkerPopup(false);
                formik.setValues({ ...workerInitialValues });
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
              onClick={addWorker}
            >
              Add Worker
            </Button>
          </div>
        }
        title={'Add Worker'}
      />

      <Popup
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        content={'Are You Sure you want to delete this Worker!!!'}
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
                setSelectedWorker({ ...workerInitialValues });
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
              onClick={deleteWorker}
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

export default Workers;
