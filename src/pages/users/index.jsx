import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockUsersData } from '../../data/mockData';
import { Button } from '@mui/material';
import Header from '../../components/Header';
import { IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Popup from '../../components/atomComponents/Popup';
import AddUser from '../../components/AddUser';

const Users = () => {
  const [users, setUsers] = useState(mockUsersData);
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [openUserPopUp, setUserPopup] = useState(false);
  const [view, setView] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleAddUser = () => {
    console.log('add use clicked');
    setAddUserPopup(true);
  };
  const handleViewClick = (row) => {
    setView(true);
    setUserPopup(true);
  };
  const handleEditClick = (row) => {
    setView(false);
    setUserPopup(true);
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
      width: 300
    },
    { field: 'userName', headerName: 'User Name', width: 300 },
    { field: 'type', headerName: 'Type', width: 250 },
    { field: 'createdAt', headerName: 'Created At', width: 300 },
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
        open={openUserPopUp}
        setOpen={setUserPopup}
        content={<AddUser />}
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
                  setUserPopup(false);
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
        content={<AddUser />}
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
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
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
          onClick={handleAddUser}
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
        />
      </Box>
    </Box>
  );
};

export default Users;
