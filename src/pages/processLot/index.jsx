import React, {useState} from 'react';
import { Box, useTheme, InputBase, IconButton, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import { Edit, Visibility } from '@mui/icons-material';
import { mockProcessLotData } from '../../data/mockData';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Popup from '../../components/atomComponents/Popup';
import AddProcessLot from '../../components/AddProcessLot';
const ProcessLot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [processLot, setProcessLot] = useState(mockProcessLotData);
  const [addProcessLotPopup, setAddProcessLotPopup] = useState(false);

  const handleAddProcessLot = () => {
    console.log('add use clicked');
    setAddProcessLotPopup(true);
  };
  const columns = [
    { field: 'id', headerName: 'Id', width: 20 },
    {field: 'pageNumber',headerName: 'Page Number',width: 100},
    { field: 'articleNumber',headerName: 'Article #',width: 150,},
    { field: 'billNumber', headerName: 'Bill #', width:  150},
    { field: 'quantitylot', headerName: 'Quantity', width: 100 },
    { field: 'handWorker', headerName: 'Hand Worker', width: 200,renderCell: (params) => <p>{params.row.handWorkerId.name}</p>} ,
    { field: 'dupattaWorker', headerName: 'Dupatta Worker', width: 200,renderCell: (params) => <p>{params.row.dupattaWorkerId.name}</p> },
    { field: 'innerWorker', headerName: 'Inner Worker', width: 200,renderCell: (params) => <p>{params.row.innerWorkerId.name}</p> },
    { field: 'assignDate', headerName: 'Assign Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="View"
            // onClick={() => handleViewClick(params.row)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            aria-label="Edit"
            // onClick={() => handleEditClick(params.row)}
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
        />
      </Box>

      <Popup
        open={addProcessLotPopup}
        setOpen={setAddProcessLotPopup}
        content={<AddProcessLot />}
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
              Add Process Lot
            </Button>
          </div>
        }
        title={'Add Process Lot'}
      />
    </Box>
  );
};

export default ProcessLot;
