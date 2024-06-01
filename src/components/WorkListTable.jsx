import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { WORKTYPE } from '../utils/constants';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const WorkListTable = ({
  works,
  handleDeleteClick,
  handleEditClick,
  handleViewClick,
  totalAmount,
  totalAmountGiven,
  balance,
  setBalance,
  setTotalAmount,
  setTotalAmoutGiven
}) => {
  function calculateBalance() {
    const { totalAmount, totalAmountGiven } = works?.reduce(
      (acc, item) => {
        // Convert total and paymentGiven to numbers, handling null or empty values
        const total = parseFloat(item.total) || 0;
        const paymentGiven = parseFloat(item.paymentGiven) || 0;

        // Accumulate total and paymentGiven
        acc.totalAmount += total;
        acc.totalAmountGiven += paymentGiven;

        return acc;
      },
      { totalAmount: 0, totalAmountGiven: 0 }
    );

    // Calculate the balance
    const balance = totalAmount - totalAmountGiven;
    setTotalAmount(totalAmount);
    setTotalAmoutGiven(totalAmountGiven);
    setBalance(balance);
  }
  useEffect(() => {
    calculateBalance();
  }, [works]);

  const columns = [
    {
      field: 'assignDate',
      headerName: 'Date',
      width: '100px',
      renderCell: (params) => {
        if (params?.processLotId?.assignDate) {
          // Check if assignDate exists in params.row
          const date = params?.processLotId?.assignDate;
          const newDate = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return newDate;
        } else {
          return '-';
        }
      }
    },
    {
      field: 'pageNumber',
      headerName: 'Page',
      width: '70px',
      renderCell: (params) => <p>{params.processLotId?.pageNumber || '-'}</p>
    },
    {
      field: 'articleNumber',
      headerName: 'Article',
      width: '90px',
      renderCell: (params) => <p>{params.processLotId?.articleNumber || '-'}</p>
    },
    {
      field: 'color',
      headerName: 'Colour',
      width: '80px',
      renderCell: (params) => <p>{params.processLotId?.colour || '-'}</p>
    },
    {
      field: 'billNumber',
      headerName: 'Bill',
      width: '50px',
      renderCell: (params) => <p>{params.processLotId?.billNumber || '-'}</p>
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: '80px',
      renderCell: (params) => <p>{params.processLotId?.quantity || '-'}</p>
    },
    // {
    //   field: 'workType',
    //   headerName: 'Work Type',
    //   width: 100,
    //   renderCell: (params) => <p>{WORKTYPE[params.workType] || '-'}</p>
    // },
    {
      field: 'quantityLog',
      headerName: 'Wasooli',
      width: '120px',
      renderCell: (params) => <p>{params.quantityLog || '-'}</p>
    },
    {
      field: 'quantityReturned',
      headerName: 'Pending',
      width: '80px',
      renderCell: (params) => <p>{params.quantityReturned || '-'}</p>
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: '100px',
      renderCell: (params) => <p>{params.rate || '-'}</p>
    },
    {
      field: 'total',
      headerName: 'T.Amt',
      width: '150px',
      renderCell: (params) => <p>{params.total || '-'}</p>
    },
    {
      field: 'lotClearDate',
      headerName: 'Nil',
      width: '80px',
      renderCell: (params) => {
        if (params?.lotClearDate) {
          // Check if assignDate exists in params.row
          const date = params?.lotClearDate;
          const newDate = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return newDate;
        } else {
          return '-';
        }
      }
    },
    {
      field: 'paymentGiven',
      headerName: 'Payment',
      width: '100px',
      renderCell: (params) => <p>{params.paymentGiven || '-'}</p>
    },
    {
      field: 'paymentDate',
      headerName: 'Payment Date',
      width: '150px',
      renderCell: (params) => {
        if (params?.paymentDate) {
          // Check if assignDate exists in params.row
          const date = params?.paymentDate;
          const newDate = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return newDate;
        } else {
          return '-';
        }
      }
    },
    {
      field: 'reference',
      headerName: 'References',
      width: '150px',
      renderCell: (params) => <p>{params.reference || '-'}</p>
    },
    // {
    //   field: 'workerId',
    //   headerName: 'Worker Name',
    //   width: 200,
    //   renderCell: (params) => <p>{params.workerId?.workerName || '-'}</p>
    // },
    {
      field: 'action',
      headerName: '',
      width: '50px'
    }
  ];

  return (
    <div>
      <TableContainer className="mt-8 rounded-t-lg border border-solid border-dark300 inventory-table h-[450px]">
        <Table stickyHeader>
          <TableHead className="bg-slate-400">
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {works &&
              works.map((row, rowIndex) => (
                <TableRow key={row._id}>
                  {columns.map((column, index) =>
                    column.field !== 'action' ? (
                      <TableCell
                        key={index}
                        style={{ width: `${column.width}` }}
                        className="border-r-[1px]"
                      >
                        {column.field === '_id'
                          ? column?.renderCell(rowIndex + 1)
                          : column?.renderCell(row) || '-'}
                      </TableCell>
                    ) : (
                      <TableCell key={index} className="p-0">
                        <Box>
                          <IconButton
                            aria-label="View"
                            style={{ padding: '0px', marginRight: '10px' }}
                            onClick={() => handleViewClick(row)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            aria-label="View"
                            style={{ padding: '0px', marginRight: '10px' }}
                            onClick={() => handleDeleteClick(row)}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                          <IconButton
                            aria-label="Edit"
                            style={{ padding: '0px', marginRight: '10px' }}
                            onClick={() => handleEditClick(row)}
                          >
                            <Edit />
                          </IconButton>
                        </Box>
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-ful rounded-b-lg h-10  border flex justify-end items-center text-[16px] font-bold pr-16">
        <div className="mr-24">Total Amount : {totalAmount}</div>
        <div className="mr-24">Total Amount Given : {totalAmountGiven}</div>
        <div
          className={clsx('font-bold', {
            'text-red-500': balance > 0,
            'text-green-500': balance < 0
          })}
        >
          {balance > 0 ? (
            <p>Pending : {balance}</p>
          ) : (
            <p>Balance : {balance}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkListTable;
