import React from 'react';
import { Box, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../theme';

const AccountsListTable = ({
    accounts,
    handleDeleteClick,
    handleEditClick,
    handleViewClick,
    workerData
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'recordDate',
            headerName: 'Date',
            width: 100,
            renderCell: (params) => {
                if (params?.row?.recordDate) {
                    // Check if assignDate exists in params.row
                    const date = params?.row?.recordDate;
                    const newDate = new Date(date).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        timeZone: 'UTC' // Ensure the date is treated as UTC when formatting
                    });
                    return (
                        <p className='p-1 text-[12px]'>
                            {newDate}
                        </p>
                    );
                } else {
                    return '-';
                }
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 120,
            renderCell: (params) => {
                return (
                    <p className='p-1 text-[12px]'>
                        {params?.row?.description || '-'}
                    </p>
                );
            }
        },
        {
            field: 'quantity',
            headerName: 'QTY',
            width: 120,
            renderCell: (params) => {
                return (
                    <p className='p-1 text-[12px]'>
                        {params?.row?.workerAssignmentId?.processLotId?.quantity || '-'}
                    </p>
                );
            }
        },
        {
            field: 'colour',
            headerName: 'CLR',
            width: 120,
            renderCell: (params) => {
                return (
                    <p className='p-1 text-[12px]'>
                        {params?.row?.workerAssignmentId?.processLotId?.colour || '-'}
                    </p>
                );
            }
        },
        {
            field: 'billNumber',
            headerName: 'Bill #',
            width: 120,
            renderCell: (params) => {
                return (
                    <p className='p-1 text-[12px]'>
                        {params?.row?.workerAssignmentId?.processLotId?.billNumber || '-'}
                    </p>
                );
            }
        },
        {
            field: 'debit',
            headerName: 'Debit',
            width: 120,
            renderCell: (params) => {
                if (params?.row?.paymentType === 'DEBIT') {
                    return (
                        <p className='p-1 text-[12px] text-customRed'>
                            {params?.row?.amount || '-'}
                        </p>
                    );
                } else {
                    return <p className='p-1 text-[12px]'>
                        {'-'}
                    </p>
                }
            }
        },
        {
            field: 'credit',
            headerName: 'Credit',
            width: 120,
            renderCell: (params) => {
                if (params?.row?.paymentType === 'CREDIT') {
                    return (
                        <p className='p-1 text-[12px] text-customGreen'>
                            {params?.row?.amount || '-'}
                        </p>
                    );
                } else {
                    return <p className='p-1 text-[12px]'>
                        {'-'}
                    </p>
                }
            }
        },
        {
            field: 'previousBalance',
            headerName: 'Pre Balance',
            width: 120,
            renderCell: (params) => {
                return (
                    <p className='p-1 text-[12px]'>
                        {params?.row?.previousBalance}
                    </p>
                );
            }
        },
        {
            field: 'currentBalance',
            headerName: 'Curr Balance',
            width: 120,
            renderCell: (params) => {
                return (
                    <p className={`p-1 text-[12px] ${params.row.currentBalance <= 0 ? 'text-customGreen' : 'text-customRed'}`}>
                        {params?.row?.currentBalance }
                    </p>
                );
            }
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     sortable: false,
        //     width: 50,
        //     renderCell: (params) => (
        //       <Box>
        //         <IconButton
        //           aria-label="View"
        //           style={{ padding: '0px', marginRight: '10px' }}
        //         //   onClick={() => handleDeleteClick(params?.row)}
        //         >
        //           <DeleteIcon color="error" />
        //         </IconButton>
        //         <IconButton
        //           aria-label="Edit"
        //           style={{ padding: '0px', marginRight: '10px' }}
        //         //   onClick={() => handleEditClick(params?.row)}
        //         >
        //           <Edit />
        //         </IconButton>
        //       </Box>
        //     )
        //   }
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
                rows={accounts}
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
    )
}

export default AccountsListTable