import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import axios from 'axios';

const AddProcessLot = ({ formik, processLot, view }) => {
  const [workers, setWorkers] = useState([]);

  const fetchWorkersData = async (searchText) => {
    const data = await axios.get(process.env.REACT_APP_API_PATH + '/workers/', {
      withCredentials: true,
      params: {
        search: searchText
      }
    });
    setWorkers(data.data);
  };
  useEffect(() => {
    fetchWorkersData();
  }, []);
  useEffect(() => {
    if (processLot) {
      const formValues = {
        pageNumber: processLot.pageNumber || '',
        articleNumber: processLot.articleNumber || '',
        colour: processLot.colour || '',
        billNumber: processLot.billNumber || '',
        quantity: processLot.quantity || '',
        handWorker: processLot.handWorkerId || {},
        dupattaWorker: processLot.dupattaWorkerId || {},
        innerWorker: processLot.innerWorkerId || {}
      };
      if (processLot.assignDate) {
        formValues.assignDate = processLot.assignDate;
      }
      if (processLot.handWorkerId) {
        formValues.handWorkerId = processLot.handWorkerId._id;
      }
      if (processLot.dupattaWorkerId) {
        formValues.dupattaWorkerId = processLot.dupattaWorkerId._id;
      }
      if (processLot.innerWorkerId) {
        formValues.innerWorkerId = processLot.innerWorkerId._id;
      }
      formik.setValues(formValues);
    }
  }, [processLot]);

  return (
    <div>
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
            className="w-full"
            id="outlined-required"
            label="Page Number"
            value={formik.values.pageNumber}
            onChange={(e) => {
              formik.setFieldValue('pageNumber', e.target.value);
            }}
            disabled={view}
          />
          <TextField
            className="w-full"
            id="outlined-required"
            label="Article Number"
            value={formik.values.articleNumber}
            onChange={(e) => {
              formik.setFieldValue('articleNumber', e.target.value);
            }}
            disabled={view}
          />
        </div>
        <div className="w-100">
          <TextField
            className="w-full"
            id="outlined-required"
            label="Colour"
            value={formik.values.colour}
            onChange={(e) => {
              formik.setFieldValue('colour', e.target.value);
            }}
            disabled={view}
          />
          <TextField
            className="w-full"
            id="outlined-required"
            label="Bill Number"
            value={formik.values.billNumber}
            onChange={(e) => {
              formik.setFieldValue('billNumber', e.target.value);
            }}
            disabled={view}
          />
        </div>
        <div className="w-100 flex">
          <TextField
            id="outlined-required"
            label="Quantity"
            value={formik.values.quantity}
            onChange={(e) => {
              formik.setFieldValue('quantity', e.target.value);
            }}
            disabled={view}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={formik.values.handWorker || {}}
            options={workers}
            getOptionLabel={(worker) => worker.workerName || ''}
            renderInput={(params) => (
              <TextField {...params} label="Hand Worker" />
            )}
            disabled={view}
            onChange={(e, val) => {
              formik.setFieldValue('handWorker', val !== null && val);
              formik.setFieldValue(
                'handWorkerId',
                val && val._id ? val._id : ''
              );
            }}
          />
        </div>
        <div className="w-full flex">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={workers}
            value={formik.values.dupattaWorker || {}}
            getOptionLabel={(worker) => worker.workerName || ''}
            renderInput={(params) => (
              <TextField {...params} label="Dupatta Worker" />
            )}
            disabled={view}
            onChange={(e, val) => {
              formik.setFieldValue('dupattaWorker', val !== null && val);
              formik.setFieldValue(
                'dupattaWorkerId',
                val && val._id ? val._id : ''
              );
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={workers}
            value={formik.values.innerWorker || {}}
            getOptionLabel={(worker) => worker.workerName || ''}
            renderInput={(params) => (
              <TextField {...params} label="Inner Worker" />
            )}
            onChange={(e, val) => {
              formik.setFieldValue('innerWorker', val !== null && val);
              formik.setFieldValue(
                'innerWorkerId',
                val && val._id ? val._id : ''
              );
            }}
            disabled={view}
          />
        </div>
      </Box>
    </div>
  );
};

export default AddProcessLot;
