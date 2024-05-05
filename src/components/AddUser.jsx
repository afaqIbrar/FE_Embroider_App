import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { USER_TYPE } from '../utils/constants';
const AddUser = ({ formik, user, view }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user) {
      formik.setValues({
        userName: user.userName,
        userType: user.userType
      });
    }
  }, [user]);

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
          label="User Name"
          value={formik.values.userName}
          onChange={(e) => {
            formik.setFieldValue('userName', e.target.value);
          }}
          disabled={view}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            disabled={view}
            onChange={(e) => {
              formik.setFieldValue('password', e.target.value);
            }}
          />
        </FormControl>
      </div>

      <TextField
        id="outlined-select-currency"
        select
        label="Type"
        defaultValue="REGULAR_USER"
        helperText="Please select User Type"
        value={formik.values.userType}
        onChange={(e) => {
          formik.setFieldValue('userType', e.target.value);
        }}
        disabled={view}
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

export default AddUser;
