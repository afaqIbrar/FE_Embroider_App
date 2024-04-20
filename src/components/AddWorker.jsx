import React from 'react';
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { USER_TYPE } from '../utils/constants';
const AddWorker = () => {
  return (
    <Box
      m="20px"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField id="outlined-required" label="Name" />
      </div>
      <TextField
        id="outlined-select-currency"
        select
        label="Type"
        defaultValue="REGULAR"
        helperText="Please select User Type"
      >
        {USER_TYPE.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default AddWorker;
