import React from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { InputBase, IconButton } from '@mui/material';
import Header from '../../components/Header';
import { WORKERTYPE } from '../../utils/constants';
import API from '../../utils/axios';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '../../utils/useDebounce';

const Work = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [worker, setWorkers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchWorkersData(debouncedSearchText);
  }, [debouncedSearchText]);

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
    },{
      field: 'balance',
      headerName: 'Worker Current Balance',
      width: 150,
      renderCell: (params) => {
        const balance = params.value;
        // Apply the Tailwind classes conditionally based on the balance value
        const balanceClass = balance < 0 ? 'text-customGreen' : 'text-customRed';
        return <span className={`text-[12px] ${balanceClass}`}>{balance}</span>;
      }
    },
  ];
  const handleRowClick = (params) => {
    window.location.href = `work/${params.row._id}`;
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className="text-lg mb-1">Work Assignment</Box>
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
          rows={worker}
          columns={columns}
          getRowId={(row) => row._id}
          onRowClick={handleRowClick}
          density="compact"
        />
      </Box>
    </Box>
  );
};

export default Work;
