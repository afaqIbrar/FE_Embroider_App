import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { SharedContext, setUser, setUserToken } from '../../utils/utils';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const LoginForm = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { setAuthToken, setCurrentUser, currentUser } =
    useContext(SharedContext);

  const setToken = (token) => {
    setUserToken(token);
    return setAuthToken(token);
  };

  useEffect(() => {
    if (currentUser) {
      navigate(`/routing/dashboard`);
    }
  }, [currentUser, navigate]);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_PATH + '/users/login',
        values,
        { withCredentials: true }
      );
      const { userType, _id, token } = response.data;
      setUser({ userType, _id });
      setCurrentUser({ userType, _id });
      setToken(token);
      navigate(`/routing/dashboard`);
      toast.success('Logged In Successfully');
    } catch (err) {
      console.log('here', err);
      toast.error(err?.response?.data?.message);
    }
  };

  const initialValues = {
    userName: '',
    password: ''
  };
  const loginSchema = yup.object().shape({
    userName: yup.string().required('Required'),
    password: yup.string().required('Required')
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width={isNonMobile ? '400px' : '100%'} p={2}>
        <Header title="LOGIN" subtitle="Login to Your Account" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="20px">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  error={!!touched.userName && !!errors.userName}
                  helperText={touched.userName && errors.userName}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="primary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginForm;
