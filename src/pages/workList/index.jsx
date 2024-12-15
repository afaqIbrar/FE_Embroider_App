import React from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { InputBase, IconButton, Button } from '@mui/material';
import API from '../../utils/axios';
import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '../../utils/useDebounce';
import { useParams } from 'react-router-dom';
import Popup from '../../components/atomComponents/Popup';
import AddWork from '../../components/AddWork';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import WorkPrint from '../../components/accountsPrint';
import WorkListTable from '../../components/WorkListTable';
import { TextareaAutosize } from '@mui/base';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const workInitialValues = {
  // quantityLog: '',
  // quantityReturned: '',
  // rate: '',
  // total: '',
  // paymentGiven: '',
  // paymentMode: '',
  // reference: ''
};

const Work = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { workerId } = useParams();
  const [works, setWorks] = useState([]);
  const [reverseWork, setReverseWork] = useState([]);
  const [workerData, setWorkerData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [selectedWork, setSelectedWork] = useState({});
  const [openWorkPopup, setOpenWorkPopup] = useState(false);
  const [view, setView] = useState(true);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [showPrint, setShowPrint] = useState(null);
  const [extraInfoPopup, setExtraInfoPopup] = useState(false);
  const today = moment();
  const firstDayOfYear = moment().startOf('year');

  const [startDate, setStartDate] = useState(firstDayOfYear);
  const [endDate, setEndDate] = useState(today);


  function handleClose() {
    setShowPrint(null);
  }

  useEffect(() => {
    if (showPrint) {
      handlePrint();
      handleClose();
    }
  }, [showPrint]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    fetchWorkAgainstWorker(debouncedSearchText);
  }, [debouncedSearchText]);

  const updateWorkerExtraInfo = async () => {
    if (workerData._id) {
      await API.put(
        'workers/' + workerData._id,
        { extraInfo: extraInfo },
        {
          withCredentials: true
        }
      );
    }
  };

  useEffect(() => {
    fetchWorkerData();
  }, [extraInfoPopup]);

  const formik = useFormik({
    initialValues: {
      ...workInitialValues
    },
    enableReinitialize: true
  });
  const updateWork = async () => {
    try {
      await API.put('work/' + selectedWork._id, formik.values, {
        withCredentials: true
      });
      toast.success('Work Updated Successfully!!!');
      fetchWorkAgainstWorker();
      fetchWorkerData();
      setOpenWorkPopup(false);
      formik.setValues({ ...workInitialValues });
      selectedWork({});
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };
  const deleteWork = async () => {
    try {
      await API.delete('work/' + selectedWork._id, { withCredentials: true });
      toast.success('Process Lot Deleted Successfully!!!');
      fetchWorkAgainstWorker();
      setOpenDeleteConfirm(false);
      formik.setValues({ ...workInitialValues });
      setSelectedWork({});
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };
  const handleViewClick = async (row) => {
    setSelectedWork(row);
    setView(true);
    setOpenWorkPopup(true);
  };

  const handleEditClick = (row) => {
    setView(false);
    setOpenWorkPopup(true);
    setSelectedWork(row);
  };
  const handleDeleteClick = (row) => {
    setSelectedWork(row);
    setOpenDeleteConfirm(true);
  };

  const handleSaveExtraInfo = async () => {
    updateWorkerExtraInfo();
    setExtraInfoPopup(false);
  };
  const fetchWorkerData = async () => {
    const data = await API.get('workers/byId/' + workerId, {
      withCredentials: true,
      params: {
        search: searchText
      }
    });
    setWorkerData(data.data);
    setExtraInfo(data?.data?.extraInfo || '');
  };

  const fetchWorkAgainstWorker = async (searchText) => {
    const data = await API.get('work/byId/' + workerId, {
      withCredentials: true,
      params: {
        search: searchText,
        startDate: startDate,
        endDate: endDate
      }
    });
    setWorks(data.data);
    const copyData = [...data.data];
    setReverseWork(
      copyData.sort((a, b) => {
        const dateA = new Date(a.processLotId.assignDate);
        const dateB = new Date(b.processLotId.assignDate);
        return dateA - dateB;
      })
    );
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className="text-lg mb-1">
          {`${workerData.workerName || ''} Work List`}
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
              onClick={() => fetchWorkAgainstWorker()}
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
                setExtraInfoPopup(true);
                setExtraInfo(workerData?.extraInfo || '-');
              }}
            >
              Extra Info
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px'
              }}
              onClick={() => setShowPrint(true)}
            >
              Print Details
            </Button>
          </Box>
        </Box>
      </Box>
      <WorkListTable
        works={works}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleViewClick={handleViewClick}
        workerData={workerData}
      />
      <Popup
        open={openWorkPopup}
        setOpen={setOpenWorkPopup}
        onClose={() => {
          setOpenWorkPopup(false);
          setView(false);
          setSelectedWork({});
        }}
        content={
          <AddWork
            formik={formik}
            view={view}
            work={selectedWork}
            workerData={workerData}
          />
        }
        actions={
          view ? (
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
                  setOpenWorkPopup(false);
                  setView(false);
                  setSelectedWork({});
                }}
                size="medium"
              >
                Close
              </Button>
            </div>
          ) : (
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
                  setOpenWorkPopup(false);
                  setView(false);
                  setSelectedWork({});
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
                onClick={updateWork}
              >
                Update Work
              </Button>
            </div>
          )
        }
        title={view ? 'Work Details' : `Edit Work`}
      />
      <Popup
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        content={'Are You Sure you want to delete this Work!!!'}
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
                setOpenDeleteConfirm(false);
                setSelectedWork({});
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
              onClick={deleteWork}
            >
              Delete Work
            </Button>
          </div>
        }
        title={`Delete Worker`}
      />
      <Popup
        open={extraInfoPopup}
        setOpen={setExtraInfoPopup}
        onClose={() => {
          setExtraInfoPopup(false);
          setExtraInfo('');
        }}
        content={
          <TextareaAutosize
            className="w-80 text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none  focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
            aria-label="empty textarea"
            placeholder="Extra Info"
            maxRows={12}
            minRows={5}
            value={extraInfo}
            onChange={(e) => {
              setExtraInfo(e.target.value);
            }}
          />
        }
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
                setExtraInfoPopup(false);
                setExtraInfo('');
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
              onClick={handleSaveExtraInfo}
            >
              Save Info
            </Button>
          </div>
        }
        title={'Extra Info'}
      />
      <div ref={componentRef}>
        <WorkPrint
          showPrint={showPrint}
          workerData={workerData}
          works={reverseWork}
        />
      </div>
    </Box>
  );
};

export default Work;
