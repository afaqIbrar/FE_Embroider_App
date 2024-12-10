import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { WORKTYPE } from '../utils/constants';
import { useRef } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const AddWork = ({ formik, work, view, workerData }) => {
  const qtyLog = useRef(null);
  useEffect(() => {
    if (work) {
      formik.setValues({
        ...(work?.quantityLog && workerData.workerType !== 'INNER_WORKER'
          ? { quantityLog: work.quantityLog }
          : {}),
        ...(work?.quantityReturned && workerData.workerType !== 'INNER_WORKER'
          ? { quantityReturned: work.quantityReturned }
          : {}),
        ...(work?.rate ? { rate: work.rate } : {}),
        ...(work?.total ? { total: work.total } : {}),
        ...(work?.reference ? { reference: work.reference } : {}),
        ...(work?.lotClearDate
          ? { lotClearDate: moment(work?.lotClearDate) }
          : null),
        ...(work?.gazana && workerData.workerType === 'INNER_WORKER'
          ? { gazana: work.gazana }
          : {})
      });
    }
  }, [work]);

  useEffect(() => {
    if (qtyLog.current) {
      qtyLog.current.focus();
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
            value={work?.processLotId?.pageNumber || ''}
            disabled={true}
          />
          <TextField
            className="w-full"
            id="outlined-required"
            label="Article Number"
            value={work?.processLotId?.articleNumber || ''}
            disabled={true}
          />
        </div>
        <div className="w-100">
          <TextField
            className="w-full"
            id="outlined-required"
            label="Colour"
            value={work?.processLotId?.colour || ''}
            disabled={true}
          />
          <TextField
            className="w-full"
            id="outlined-required"
            label="Bill Number"
            value={work?.processLotId?.billNumber || ''}
            disabled={true}
          />
        </div>
        <div className="w-100 flex">
          <TextField
            id="outlined-required"
            label="Quantity"
            value={work?.processLotId?.quantity || ''}
            disabled={true}
          />
          <TextField
            id="outlined-required"
            label="Work Type"
            value={WORKTYPE[work?.workType] || ''}
            disabled={true}
          />
        </div>
        {workerData.workerType !== 'INNER_WORKER' && (
          <div className="w-100 flex">
            <TextField
              id="quantityLog"
              name="quantityLog"
              label="Quantity Log"
              value={formik?.values?.quantityLog || ''}
              inputRef={qtyLog}
              onInput={(e) => {
                const newValue = e.target.value.replace(/[^0-9.]/g, '');
                formik.setFieldValue('quantityLog', newValue);
                const sum = newValue
                  .split('.')
                  .filter(Boolean)
                  .map(Number)
                  .reduce((acc, curr) => acc + curr, 0);
                if (sum > work?.processLotId?.quantity) {
                  formik.setFieldError(
                    'quantityLog',
                    `Quantity cannot exceed ${work?.processLotId?.quantity}`
                  );
                } else {
                  formik.setFieldError('quantityLog', undefined);
                }
                formik.setFieldValue('quantityReturned', sum);
              }}
              disabled={view}
              onKeyDown={(e) => handleKeyDown(e, 'nillDate')}
            />
            <TextField
              id="outlined-required"
              label="Quantity Returned"
              value={formik?.values?.quantityReturned || ''}
              disabled={true}
              type="number"
            />
          </div>
        )}
        {workerData.workerType === 'INNER_WORKER' && (
          <div style={{ width: '100%' }}>
            <TextField
              id="outlined-required"
              sx={{
                '&.MuiFormControl-root': {
                  width: '96%'
                }
              }}
              label="Gazana"
              type="number"
              value={formik?.values?.gazana || ''}
              onChange={(e) => {
                formik.setFieldValue('gazana', e.target.value);
              }}
            />
          </div>
        )}

        <div className="w-full">
          <DatePicker
            label="Nill Date"
            id="nillDate"
            slotProps={{ field: { clearable: true } }}
            value={formik.values.lotClearDate}
            inputFormat="DD/MM/YYYY"
            onChange={(newValue) => {
              formik.setFieldValue('lotClearDate', newValue);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'rate')}
            size="large"
          />
          <TextField
            id="rate"
            label="Rate"
            value={formik?.values?.rate || ''}
            onChange={(e) => {
              formik.setFieldValue('rate', e.target.value);
              if (workerData.workerType !== 'INNER_WORKER') {
                formik.setFieldValue(
                  'total',
                  e.target.value * work?.processLotId?.quantity || 0
                );
              } else {
                formik.setFieldValue(
                  'total',
                  e.target.value * formik.values.gazana || 0
                );
              }
            }}
            disabled={view}
            type="number"
            onKeyDown={(e) => handleKeyDown(e, 'paymentGiven')}
          />
        </div>
        <div className="w-100 flex">
          <TextField
            id="outlined-required"
            label="Total Amount"
            value={formik?.values?.total || ''}
            disabled={true}
            type="number"
          />
           <TextField
            label="Reference"
            id="reference"
            value={formik?.values?.reference || ''}
            onChange={(e) => {
              formik.setFieldValue('reference', e.target.value);
            }}
            disabled={view}
            onKeyDown={(e) => handleKeyDown(e, 'quantityLog')}
          />
        </div>
      </Box>
    </div>
  );
};

export default AddWork;
