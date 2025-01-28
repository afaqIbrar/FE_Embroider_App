import { Box, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';

const WorkListTable = ({
  works,
  handleDeleteClick,
  handleEditClick,
  handleViewClick,
  workerData
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
              className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
                  ? params?.row?.rate &&
                    (workerData.workerType !== 'INNER_WORKER'
                      ? params?.row?.quantityReturned ===
                      params?.row?.processLotId?.quantity &&
                      Number(params?.row?.total)
                      : Number(params?.row?.rate))
                    ? 'text-customGreen'
                    : (
                      workerData.workerType !== 'INNER_WORKER'
                        ? params?.row?.processLotId?.quantity ===
                        params?.row.quantityReturned
                        : params?.row?.gazana
                    )
                      ? 'text-newBlue'
                      : 'text-customRed'
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
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
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
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
              : ''
            }`}
        >
          {params?.row?.processLotId?.articleNumber || '-'}
        </p>
      )
    },
    {
      field: 'colour',
      headerName: 'Colour',
      width: 100,
      renderCell: (params) => (
        <p
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
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
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
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
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
              : ''
            }`}
        >
          {params?.row?.processLotId?.quantity || '-'}
        </p>
      )
    },
    ...(workerData?.workerType !== 'INNER_WORKER'
      ? [
        {
          field: 'quantityReturned',
          headerName: 'Pending',
          width: 60,
          renderCell: (params) => {
            const quantity = Number(params?.row?.processLotId?.quantity || 0);
            const quantityReturned = Number(
              params?.row?.quantityReturned || 0
            );
            const result = quantity - quantityReturned;
            return (
              <p
                className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
                    ? params?.row?.rate &&
                      (workerData.workerType !== 'INNER_WORKER'
                        ? params?.row?.quantityReturned ===
                        params?.row?.processLotId?.quantity &&
                        Number(params?.row?.total)
                        : Number(params?.row?.rate))
                      ? 'text-customGreen'
                      : (
                        workerData.workerType !== 'INNER_WORKER'
                          ? params?.row?.processLotId?.quantity ===
                          params?.row.quantityReturned
                          : params?.row?.gazana
                      )
                        ? 'text-newBlue'
                        : 'text-customRed'
                    : ''
                  }`}
              >
                {result || result === 0 ? result : '-'}
              </p>
            );
          }
        }
      ]
      : []),
    ...(workerData?.workerType === 'INNER_WORKER'
      ? [
        {
          field: 'gazana',
          headerName: 'Gazana',
          width: 70,
          renderCell: (params) => (
            <p
              className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
                  ? params?.row?.rate &&
                    (workerData.workerType !== 'INNER_WORKER'
                      ? params?.row?.quantityReturned ===
                      params?.row?.processLotId?.quantity &&
                      Number(params?.row?.total)
                      : Number(params?.row?.rate))
                    ? 'text-customGreen'
                    : (
                      workerData.workerType !== 'INNER_WORKER'
                        ? params?.row?.processLotId?.quantity ===
                        params?.row.quantityReturned
                        : params?.row?.gazana
                    )
                      ? 'text-newBlue'
                      : 'text-customRed'
                  : ''
                }`}
            >
              {params?.row?.gazana || '-'}
            </p>
          )
        }
      ]
      : []),
    {
      field: 'rate',
      headerName: 'Rate',
      width: 90,
      renderCell: (params) => (
        <p
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
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
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
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
              className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
                  ? params?.row?.rate &&
                    (workerData.workerType !== 'INNER_WORKER'
                      ? params?.row?.quantityReturned ===
                      params?.row?.processLotId?.quantity &&
                      Number(params?.row?.total)
                      : Number(params?.row?.rate))
                    ? 'text-customGreen'
                    : (
                      workerData.workerType !== 'INNER_WORKER'
                        ? params?.row?.processLotId?.quantity ===
                        params?.row.quantityReturned
                        : params?.row?.gazana
                    )
                      ? 'text-newBlue'
                      : 'text-customRed'
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
      field: 'reference',
      headerName: 'References',
      width: 100,
      renderCell: (params) => (
        <p
          className={`p-1 text-[15px] font-semibold ${params?.row?.processLotId?.assignDate
              ? params?.row?.rate &&
                (workerData.workerType !== 'INNER_WORKER'
                  ? params?.row?.quantityReturned ===
                  params?.row?.processLotId?.quantity &&
                  Number(params?.row?.total)
                  : Number(params?.row?.rate))
                ? 'text-customGreen'
                : (
                  workerData.workerType !== 'INNER_WORKER'
                    ? params?.row?.processLotId?.quantity ===
                    params?.row.quantityReturned
                    : params?.row?.gazana
                )
                  ? 'text-newBlue'
                  : 'text-customRed'
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
        sx={{
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'rgba(255,255,255) solid 1px',
            outlineOffset: '-1px'
          }
        }}
      />
    </Box>
  );
};

export default WorkListTable;
