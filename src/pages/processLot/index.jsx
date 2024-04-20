import React from 'react';
import { Box, useTheme, InputBase, IconButton, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';

const ProcessLot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleAddProcessLot = () => {
    console.log('add use clicked');
    // setAddUserPopup(true);
  };
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
    </Box>
  );
};

export default ProcessLot;
