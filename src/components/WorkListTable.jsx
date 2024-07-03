import { Box, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      width: 100,
      renderCell: (params) => {
        if (params?.row?.processLotId?.assignDate) {
          // Check if assignDate exists in params.row
          const date = params?.row?.processLotId?.assignDate;
          const newDate = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return (
            <p
              className={`p-1 text-base font-bold ${
                params?.row?.processLotId?.assignDate
                  ? params?.row?.rate &&
                    params?.row?.quantityReturned ===
                      params?.row?.processLotId?.quantity &&
                    params?.row?.paymentGiven
                    ? 'text-green-500'
                    : params?.row?.processLotId?.quantity ===
                      params?.row?.quantityReturned
                    ? 'text-newBlue'
                    : 'text-red-600'
                  : ''
              }`}
            >
              {newDate}
            </p>
          );
        } else {
          return '-';
        }
      }
    },
    {
      field: 'pageNumber',
      headerName: 'Page',
      width: 40,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row.processLotId?.pageNumber || '-'}
        </p>
      )
    },
    {
      field: 'articleNumber',
      headerName: 'Article',
      width: 50,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.processLotId?.articleNumber || '-'}
        </p>
      )
    },
    {
      field: 'color',
      headerName: 'Colour',
      width: 100,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.processLotId?.colour || '-'}
        </p>
      )
    },
    {
      field: 'billNumber',
      headerName: 'Bill',
      width: 40,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.processLotId?.billNumber || '-'}
        </p>
      )
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: 30,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.processLotId?.quantity || '-'}
        </p>
      )
    },
    {
      field: 'quantityLog',
      headerName: 'Wasooli',
      width: 140,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold  ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row.quantityLog || '-'}
        </p>
      )
    },
    {
      field: 'quantityReturned',
      headerName: 'Pending',
      width: 60,
      renderCell: (params) => {
        const quantity = Number(params?.row?.processLotId?.quantity || 0);
        const quantityReturned = Number(params?.row?.quantityReturned || 0);
        const result = quantity - quantityReturned;
        return (
          <p
            className={`p-1 text-base font-bold  ${
              params?.row?.processLotId?.pageNumber
                ? params?.row?.rate &&
                  params?.row?.quantityReturned ===
                    params?.row?.processLotId?.quantity &&
                  params?.row?.paymentGiven
                  ? 'text-green-500'
                  : params?.row?.processLotId?.quantity ===
                    params?.row?.quantityReturned
                  ? 'text-newBlue'
                  : 'text-red-600'
                : ''
            }`}
          >
            {result || result === 0 ? result : '-'}
          </p>
        );
      }
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 90,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold  ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row.rate || '-'}
        </p>
      )
    },
    {
      field: 'total',
      headerName: 'T.Amt',
      width: 100,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold  ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.total || '-'}
        </p>
      )
    },
    {
      field: 'lotClearDate',
      headerName: 'Nil',
      width: 100,
      renderCell: (params) => {
        if (params?.row?.lotClearDate) {
          // Check if assignDate exists in params.row
          const date = params?.row?.lotClearDate;
          const newDate = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          return (
            <p
              className={`p-1 text-base font-bold  ${
                params?.row?.processLotId?.pageNumber
                  ? params?.row?.rate &&
                    params?.row?.quantityReturned ===
                      params?.row?.processLotId?.quantity &&
                    params?.row?.paymentGiven
                    ? 'text-green-500'
                    : params?.row?.processLotId?.quantity ===
                      params?.row?.quantityReturned
                    ? 'text-newBlue'
                    : 'text-red-600'
                  : ''
              }`}
            >
              {newDate}
            </p>
          );
        } else {
          return '-';
        }
      }
    },
    {
      field: 'paymentGiven',
      headerName: 'Payment',
      width: 100,
      renderCell: (params) => (
        <p
          className={`p-1 text-base font-bold  ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.paymentGiven || '-'}
        </p>
      )
    },
    // {
    //   field: 'paymentDate',
    //   headerName: 'Payment Date',
    //   width: '150px',
    //   renderCell: (params) => {
    //     if (params?.paymentDate) {
    //       // Check if assignDate exists in params.row
    //       const date = params?.paymentDate;
    //       const newDate = new Date(date).toLocaleString('en-GB', {
    //         day: '2-digit',
    //         month: '2-digit',
    //         year: 'numeric'
    //       });
    //       return newDate;
    //     } else {
    //       return '-';
    //     }
    //   }
    // },
    {
      field: 'reference',
      headerName: 'References',
      width: 100,
      renderCell: (params) => (
        <p
          className={`p-2 text-base font-bold break-words  ${
            params?.row?.processLotId?.pageNumber
              ? params?.row?.rate &&
                params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                params?.row?.paymentGiven
                ? 'text-green-500'
                : params?.row?.processLotId?.quantity ===
                  params?.row?.quantityReturned
                ? 'text-newBlue'
                : 'text-red-600'
              : ''
          }`}
        >
          {params?.row?.reference || '-'}
        </p>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <Box>
          {/* <IconButton
            aria-label="View"
            style={{ padding: '0px', marginRight: '10px' }}
            onClick={() => handleViewClick(params?.row)}
          >
            <Visibility />
          </IconButton> */}
          <IconButton
            aria-label="View"
            style={{ padding: '0px', marginRight: '10px' }}
            onClick={() => handleDeleteClick(params?.row)}
          >
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton
            aria-label="Edit"
            style={{ padding: '0px', marginRight: '10px' }}
            onClick={() => handleEditClick(params?.row)}
          >
            <Edit />
          </IconButton>
        </Box>
      )
    }
  ];
  return (
    <Box
      m="8px 0 0 0"
      width="100%"
      height="540px"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none !important'
        },
        '& .name-column--cell': {
          color: colors.greenAccent[300]
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none'
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400]
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700]
        },
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${colors.grey[100]} !important`
        }
      }}
    >
      <DataGrid
        rows={works}
        columns={columns}
        getRowId={(row) => row._id}
        density="compact"
        getRowHeight={() => 'auto'}
      />
      {/* <TableContainer className="mt-8 rounded-t-lg border border-solid border-dark300 inventory-table h-[500px]">
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
      </TableContainer> */}
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
    </Box>
  );
};

export default WorkListTable;
