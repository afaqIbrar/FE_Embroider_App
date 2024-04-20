import React, {useState} from 'react';
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { USER_TYPE } from '../utils/constants';
const AddProcessLot = () => {
    const [selectedValue, setSelectedValue] = useState(''); // State to hold the selected value

    const handleChange = (event) => {
        console.log('value',event.target.value)
        setSelectedValue(event.target.value); // Update the selected value when the value changes
    };
    return (
        <div >
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
                    <TextField className='w-full' id="outlined-required" label="Page Number" />
                    <TextField className='w-full' id="outlined-required" label="Article Number" />
                </div>
                <div>
                    <TextField className='w-full' id="outlined-required" label="Bill #" />
                    <TextField className='w-full' id="outlined-required" label="Quantity" />
                </div>
                <div className='w-ful'>
                    <TextField
                        select
                        label="Hand Embroider"
                        style={{ width: '97%' }}
                        onChange={handleChange} 
                    >
                        {USER_TYPE.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className='w-ful'>
                    <TextField
                        select
                        label="Type"
                        style={{ width: '97%' }}
                    >
                        {USER_TYPE.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className='w-ful'>
                    <TextField
                        select
                        label="Inner Worker"
                        style={{ width: '97%' }}
                    >
                        {USER_TYPE.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Box>
        </div>
    );
};

export default AddProcessLot;
