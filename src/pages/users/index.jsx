import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { Button } from '@mui/material';
import Header from '../../components/Header';
import { IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Popup from '../../components/atomComponents/Popup';
import AddUser from '../../components/AddUser';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const userInitialValues = {
  userName: '',
  userType: 'REGULAR_USER',
  password: ''
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [openUserPopUp, setUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ ...userInitialValues });
  const [view, setView] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const formik = useFormik({
    initialValues: {
      ...userInitialValues
    },
    onSubmit: (values) => {
      addUser(values);
    }
  });

  const addUser = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_API_PATH + '/users/',
        formik.values,
        { withCredentials: true }
      );
      toast.success('User Added Successfully!!!');
      fetchUsersData();
      setAddUserPopup(false);
      formik.setValues({ ...userInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const editUser = async () => {
    try {
      await axios.put(
        process.env.REACT_APP_API_PATH + '/users/' + selectedUser._id,
        formik.values,
        { withCredentials: true }
      );
      toast.success('User Update Successfully!!!');
      fetchUsersData();
      setUserPopup(false);
      formik.setValues({ ...userInitialValues });
      setSelectedUser({ ...userInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const handleAddPopup = () => {
    setAddUserPopup(true);
  };
  const handleViewClick = (row) => {
    setSelectedUser(row);
    setView(true);
    setUserPopup(true);
  };
  const handleEditClick = (row) => {
    setSelectedUser(row);
    setView(false);
    setUserPopup(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setOpenDeleteConfirm(true);
  };

  const fetchUsersData = async (searchText) => {
    const data = await axios.get(
      process.env.REACT_APP_API_PATH + '/users/',

      {
        withCredentials: true,
        params: {
          search: searchText
        }
      }
    );
    setUsers(data.data);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_PATH + '/users/' + selectedUser._id,
        { withCredentials: true }
      );
      toast.success('User Delete Successfully!!!');
      fetchUsersData();
      setOpenDeleteConfirm(false);
      formik.setValues({ ...userInitialValues });
      setSelectedUser({ ...userInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsersData(debouncedSearchText);
  }, [debouncedSearchText]);

  const columns = [
    { field: '_id', headerName: 'Id', width: 100 },
    { field: 'userName', headerName: 'User Name', width: 300 },
    { field: 'userType', headerName: 'Type', width: 250 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 300,
      valueGetter: (params) => {
        const createdAt = params.row.createdAt; // Get the createdAt value from the row
        const localCreatedAt = new Date(createdAt).toLocaleString();
        return localCreatedAt;
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
      <Popup
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        content={'Are You Sure you want to delete this User!!!'}
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
                setSelectedUser({ ...userInitialValues });
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
              onClick={deleteUser}
            >
              Delete User
            </Button>
          </div>
        }
        title={`Delete User`}
      />

      <Popup
        open={openUserPopUp}
        setOpen={setUserPopup}
        content={<AddUser user={selectedUser} formik={formik} view={view} />}
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
                  setUserPopup(false);
                  setView(false);
                  setSelectedUser({ ...userInitialValues });
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
                  setView(true);
                  setUserPopup(false);
                  setSelectedUser({ ...userInitialValues });
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
                onClick={editUser}
              >
                Update User
              </Button>
            </div>
          )
        }
        title={view ? 'User Details' : `Edit User`}
      />
      <Popup
        open={addUserPopup}
        setOpen={setAddUserPopup}
        content={<AddUser formik={formik} />}
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
                setAddUserPopup(false);
                formik.setValues({ ...userInitialValues });
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
              onClick={addUser}
            >
              Add User
            </Button>
          </div>
        }
        title={'Add User'}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Users" subtitle="Welcome to Users Screen" />
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
          onClick={handleAddPopup}
        >
          Add User
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
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Users;
