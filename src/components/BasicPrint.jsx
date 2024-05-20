import { Box, GlobalStyles } from "@mui/material";
import { Grid } from "@mui/material";
import { WORKERTYPE } from '../utils/constants';

const BasicPrint = ({ workerData }) => {
    const printStyle = {
        ['@media print']: {
            ['@page']: {
                margin: '20px 0px',
                color: 'black'
            }
        }
    }

    return (
        <>
            <GlobalStyles styles={printStyle} />
            <Box displayPrint="block" style={{ color: 'black' }}>
                <Box style={{ marginTop: '20px' }}>
                    <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '35px', margin: 0 }}>Taha Collection</h1>
                    </div>
                </Box>
                <Box displayPrint="block">
                    <Box style={{ marginTop: '15px' }}>
                        <div style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ fontSize: '20px', margin: 0 }}>Account Details</p>
                        </div>
                    </Box>
                    <Box style={{ marginTop: '15px' }}>
                        <Grid container spacing={2} className="mb-4 text-lg">
                            <Grid item xs={6}>
                                <div className="flex ml-5 bg-red">
                                    <span style={{ marginLeft: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Worker Name :</span>
                                    <span style={{ marginLeft: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>{workerData?.workerName || '-'}</span>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="flex ml-5">
                                    <span style={{ marginLeft: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Worker Type :</span>
                                    <span style={{ marginLeft: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>{WORKERTYPE[workerData?.workerType] || '-'}</span>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="flex ml-5">
                                    <span style={{ marginLeft: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Date :</span>
                                    <span style={{ marginLeft: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}> {'12-12-2012' || '-'}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

        </>
    )
}
export default BasicPrint
