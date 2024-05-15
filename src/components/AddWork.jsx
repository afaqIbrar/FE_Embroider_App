import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { WORKTYPE } from '../utils/constants';
const AddWork = ({ formik, work, view }) => {
  useEffect(() => {
    if (work) {
      formik.setValues({
        ...(work?.quantityLog ? { quantityLog: work.quantityLog } : {}),
        ...(work?.quantityReturned
          ? { quantityReturned: work.quantityReturned }
          : {}),
        ...(work?.rate ? { rate: work.rate } : {}),
        ...(work?.total ? { total: work.total } : {}),
        ...(work?.paymentGiven ? { paymentGiven: work.paymentGiven } : {}),
        ...(work?.paymentMode ? { paymentMode: work.paymentMode } : {}),
        ...(work?.reference ? { reference: work.reference } : {})
      });
    }
  }, [work]);

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
        <div className="w-100 flex">
          <TextField
            id="quantityLog"
            name="quantityLog"
            label="Quantity Log"
            value={formik?.values?.quantityLog || ''}
            onInput={(e) => {
              const newValue = e.target.value.replace(/[^0-9,]/g, '');
              formik.setFieldValue('quantityLog', newValue);
              const sum = newValue
                .split(',')
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
          />
          <TextField
            id="outlined-required"
            label="Quantity Returned"
            value={formik?.values?.quantityReturned || ''}
            disabled={true}
            type="number"
          />
        </div>
        <div className="w-100 flex">
          <TextField
            id="outlined-required"
            label="Rate"
            value={formik?.values?.rate || ''}
            onChange={(e) => {
              formik.setFieldValue('rate', e.target.value);
              formik.setFieldValue(
                'total',
                e.target.value * work?.processLotId?.quantity || 0
              );
            }}
            disabled={view}
            type="number"
          />
          <TextField
            id="outlined-required"
            label="Total Amount"
            value={formik?.values?.total || ''}
            disabled={true}
            type="number"
          />
        </div>
        <div className="w-100 flex">
          <TextField
            id="outlined-required"
            label="Payment Given"
            value={formik?.values?.paymentGiven || ''}
            onChange={(e) => {
              formik.setFieldValue('paymentGiven', e.target.value);
            }}
            disabled={view}
            type="number"
          />
          <TextField
            id="outlined-required"
            label="Payment Mode"
            value={formik?.values?.paymentMode || ''}
            onChange={(e) => {
              formik.setFieldValue('paymentMode', e.target.value);
            }}
            disabled={view}
          />
        </div>
        <div className="w-100 flex">
          <TextField
            style={{ width: '100%' }}
            label="Reference"
            value={formik?.values?.reference || ''}
            onChange={(e) => {
              formik.setFieldValue('reference', e.target.value);
            }}
            disabled={view}
          />
        </div>
      </Box>
    </div>
  );
};

export default AddWork;
