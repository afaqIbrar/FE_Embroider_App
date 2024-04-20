import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { InputBase, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from '../../theme';
import { mockWorkersData } from '../../data/mockData';
import { Edit, Visibility } from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { WORKER_TYPE } from '../../utils/constants';
import Popup from '../../components/atomComponents/Popup';
import AddWorker from '../../components/AddWorker';
const Workers = () => {
  const theme = useTheme();

  const [worker, setWorkers] = useState(mockWorkersData);
  const [addWorkerPopup, setAddWorkerPopup] = useState(false);
  const [openWorkerPopUp, setWorkerPopup] = useState(false);
  const [view, setView] = useState(true);

  const handleAddWorker = () => {
    console.log('add use clicked');
    setAddWorkerPopup(true);
  };
  const handleViewClick = (row) => {
    setView(true);
    setWorkerPopup(true);
  };
  const handleEditClick = (row) => {
    setView(false);
    setWorkerPopup(true);
  };

  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
      width: 300
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 250,
      renderCell: (params) => <p>{WORKER_TYPE[params.value]}</p>
    },
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
            onClick={handleAddWorker}
          >
            Add Worker
          </Button>
        </Box>
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
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
        />
      </Box>

      <Popup
        open={openWorkerPopUp}
        setOpen={setWorkerPopup}
        content={<AddWorker />}
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
                Update Worker
              </Button>
            </div>
          )
        }
        title={view ? 'Worker Details' : `Edit Edit`}
      />
      <Popup
        open={addWorkerPopup}
        setOpen={setAddWorkerPopup}
        content={<AddWorker />}
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
              Add Worker
            </Button>
          </div>
        }
        title={'Add Worker'}
      />
    </Box>
  );
};

export default Workers;
