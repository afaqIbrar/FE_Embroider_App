import React, {useEffect} from 'react'
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';


const AddTransaction = ({formik, view}) => {
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
            className="w-full"
            id="outlined-required"
            label="Description"
            value={formik.values.description}
            onChange={(e) => {
                formik.setFieldValue('description', e.target.value);
              }}
            disabled={view}
          />
        </div>
        <div>
        <TextField
            className="w-full"
            id="amount"
            label="Amount"
            value={formik.values.amount}
            onChange={(e) => {
              formik.setFieldValue('amount', e.target.value);
            }}
            disabled={view}
          />
        </div>
        <div className="w-100 flex">
          <DatePicker
            label="Assign Date"
            id="recordDate"
            slotProps={{ field: { clearable: true } }}
            value={formik.values.assignDate}
            onChange={(newValue, e) => {
                // Check if newValue (the selected date) exists
                if (newValue) {
                  // Get the current date and time
                  const currentDate = new Date();
            
                  // Create a new Date object from the selected date
                  const selectedDate = new Date(newValue);
            
                  // Set the time of the selected date to the current time
                  selectedDate.setHours(currentDate.getHours());
                  selectedDate.setMinutes(currentDate.getMinutes());
                  selectedDate.setSeconds(currentDate.getSeconds());
                  selectedDate.setMilliseconds(currentDate.getMilliseconds());
            
                  console.log('Updated Date with Time:', selectedDate);
            
                  // Set the updated date (with time) into Formik
                  formik.setFieldValue('recordDate', selectedDate);
                }
              }}
            disabled={view}
            renderInput={(params) => (
              <TextField
                {...params}
                value={
                  formik.values.assignDate
                    ? moment(formik.values.assignDate).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )
                    : ''
                }
              />
            )}
          />
        </div>
    </Box>
  )
}

export default AddTransaction