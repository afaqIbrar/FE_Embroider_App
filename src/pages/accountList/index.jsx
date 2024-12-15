import React from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { InputBase, IconButton, Button } from '@mui/material';
import API from '../../utils/axios';
import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AccountsListTable from '../../components/accountsListTable';
import Popup from '../../components/atomComponents/Popup';
import { useFormik } from 'formik';
import AddTransaction from '../../components/AddTransaction';
import { toast } from 'react-toastify';
import moment from 'moment';
import useDebounce from '../../utils/useDebounce';



const AccountList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { workerId } = useParams();
  const [workerData, setWorkerData] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [addTransactionPopup, setAddTransactionPopup] = useState(false);
  const today = moment();
  const firstDayOfYear = moment().startOf('year');
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [startDate, setStartDate] = useState(firstDayOfYear);
  const [endDate, setEndDate] = useState(today.endOf('day'));

  const addAccountTransactionInitialValues = {
    workerId: workerData?._id,
    amount: '',
    description: '',
    recordDate: '',
    paymentType : 'CREDIT'
  };
  const formik = useFormik({
    initialValues: {
      ...addAccountTransactionInitialValues,
      workerId: workerData?._id
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // addWorker(values);
    }
  });

  const handleAddTransactionLot = () => {
    setAddTransactionPopup(true);
  };

  const addCreditTransaction = async () => {
    try {
      await API.post('account/', formik.values, { withCredentials: true });
      toast.success('Credit Transaction Added Successfully!!!');
      setAddTransactionPopup(false);
      await fetchAcountDetailsAgainstWorker();
      await fetchWorkerData();
      formik.setValues({ ...addAccountTransactionInitialValues });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const fetchWorkerData = async () => {
    const data = await API.get('workers/byId/' + workerId, {
      withCredentials: true,
      params: {
        // search: searchText,
      }
    });
    setWorkerData(data?.data);
  };

  const fetchAcountDetailsAgainstWorker = async (searchText) => {
    const data = await API.get('account/worker/' + workerId, {
      withCredentials: true,
      params: {
        search: searchText,
        startDate: startDate,
        endDate: moment()
      }
    });
    setAccounts(data?.data);
  };

  useEffect(() => {
    fetchWorkerData();
  }, []);

  useEffect(() => {
    fetchAcountDetailsAgainstWorker(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <Box m={"20px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className="text-lg mb-1">
          {`${workerData.workerName || ''} Account List`}
        </Box>
        <Box className="text-lg mb-1">
          {`Worker Current Balance:   `}
          <span
            className={`${workerData.balance < 0 ? 'text-green-500' : 'text-red-500'
              }`}
          >
            {workerData.balance}
          </span>
        </Box>
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            borderRadius={1}
          >
            <InputBase
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
            />
            <IconButton type="button">
              <SearchIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: 600, color: 'White' }} display="flex">
            <Box sx={{ width: 180 }}>
              <DatePicker
                label="Start Date"
                id="startDate"
                slotProps={{ field: { clearable: true } }}
                value={startDate}
                size="small"
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              />
            </Box>
            <Box sx={{ width: 180, marginLeft: 2 }}>
              <DatePicker
                label="End Date"
                id="endDate"
                slotProps={{ field: { clearable: true } }}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                size="small"
              />
            </Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                marginLeft: '12px'
              }}
            onClick={() => fetchAcountDetailsAgainstWorker()}
            >
              Search
            </Button>
          </Box>
          <Box>
          <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
                marginRight: '10px'
              }}
              onClick={() => {
                handleAddTransactionLot(true);
              }}
            >
              Add Credit
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px'
              }}
            // onClick={() => setShowPrint(true)}
            >
              Print Details
            </Button>
          </Box>
        </Box>
      </Box>
      <AccountsListTable accounts={accounts} workerData={workerData} />
      
      <Popup
        open={addTransactionPopup}
        setOpen={setAddTransactionPopup}
        onClose={() => {
          setAddTransactionPopup(false);
          formik.setValues({ ...addAccountTransactionInitialValues });
        }}
        content={<AddTransaction formik={formik}/>}
        actions={
          <div className="flex gap-2">
            <Button
              sx={{
                backgroundColor: colors.redAccent[500],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '5px 10px'
              }}
              onClick={() => {
                setAddTransactionPopup(false);
                formik.setValues({ ...addAccountTransactionInitialValues });
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[600],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '5px 10px'
              }}
              onClick={addCreditTransaction}
            >
              Add Debit Transaction
            </Button>
          </div>
        }
        title={'Add Credit Transaction'}
      />
    </Box>
  )
}

export default AccountList