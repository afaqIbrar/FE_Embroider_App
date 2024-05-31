import React from 'react';
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { WORKER_TYPE } from '../utils/constants';
import { useEffect } from 'react';

const AddWorker = ({ formik, worker, view }) => {
  useEffect(() => {
    if (worker) {
      formik.setValues({
        workerName: worker.workerName,
        workerType: worker.workerType,
        phoneNumber: worker.phoneNumber
      });
    }
  }, [worker]);

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
        <TextField
          id="outlined-required"
          label="Worker Name"
          value={formik.values.workerName}
          onChange={(e) => {
            formik.setFieldValue('workerName', e.target.value);
          }}
          disabled={view}
        />
      </div>
      <TextField
        select
        label="Type"
        value={formik.values.workerType}
        onChange={(e) => {
          formik.setFieldValue('workerType', e.target.value);
        }}
        disabled={view}
      >
        {WORKER_TYPE.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <div>
        {/* <TextField
          id="outlined-required"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={(e) => {
            formik.setFieldValue('phoneNumber', e.target.value);
          }}
          disabled={view}
        /> */}
      </div>
    </Box>
  );
};

export default AddWorker;
