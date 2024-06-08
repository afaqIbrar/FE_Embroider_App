import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import API from '../utils/axios';
import { useRef } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const AddProcessLot = ({ formik, processLot, view, flag }) => {
  const [workers, setWorkers] = useState([]);
  const pageNumberRef = useRef(null);
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
        formValues.assignDate = processLot.assignDate
          ? moment(processLot.assignDate)
          : moment();
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

  useEffect(() => {
    if (pageNumberRef.current) {
      pageNumberRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e, fieldName) => {
    if (e.key === 'Enter') {
      const nextField = document.querySelector(`#${fieldName}`);
      if (nextField) {
        nextField.focus();
      }
    }
  };

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
            onKeyDown={(e) => handleKeyDown(e, 'articleNumber')}
            inputRef={pageNumberRef}
          />
          <TextField
            className="w-full"
            id="articleNumber"
            label="Article Number"
            value={formik.values.articleNumber}
            onChange={(e) => {
              formik.setFieldValue('articleNumber', e.target.value);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'color')}
          />
        </div>
        <div className="w-100">
          <TextField
            className="w-full"
            id="color"
            label="Colour"
            value={formik.values.colour}
            onChange={(e) => {
              formik.setFieldValue('colour', e.target.value);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'billNumber')}
          />
          <TextField
            className="w-full"
            id="billNumber"
            label="Bill Number"
            value={formik.values.billNumber}
            onChange={(e) => {
              formik.setFieldValue('billNumber', e.target.value);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'quantity')}
          />
        </div>
        <div className="w-100 flex">
          <TextField
            id="quantity"
            label="Quantity"
            value={formik.values.quantity}
            onChange={(e) => {
              formik.setFieldValue('quantity', e.target.value);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'handworker')}
          />
          <DatePicker
            label="Assign Date"
            id="assignDate"
            value={formik.values.assignDate}
            onChange={(newValue) => {
              formik.setFieldValue('assignDate', newValue);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'handworker')}
            renderInput={(params) => (
              <TextField
                {...params}
                value={
                  formik.values.assignDate
                    ? moment(formik.values.assignDate, 'YYYY-MM-DD').format(
                        'DD/MM/YYYY'
                      )
                    : ''
                }
              />
            )}
          />
        </div>
        <div className="w-full flex">
          <Autocomplete
            disablePortal
            id="handworker"
            value={formik.values.handWorker || {}}
            options={[
              ...workers.filter((worker) => worker.workerType === 'HAND_WORKER')
            ]}
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
            onKeyDown={(e) => handleKeyDown(e, 'dupattaWorker')}
          />
          <Autocomplete
            disablePortal
            id="dupattaWorker"
            options={workers.filter(
              (worker) => worker.workerType === 'DUPATTA_WORKER'
            )}
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
            onKeyDown={(e) => handleKeyDown(e, 'innerWorker')}
          />
        </div>
        <div className="w-full">
          <Autocomplete
            disablePortal
            id="innerWorker"
            options={workers.filter(
              (worker) => worker.workerType === 'INNER_WORKER'
            )}
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
