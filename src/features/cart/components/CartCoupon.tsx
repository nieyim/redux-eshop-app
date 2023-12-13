import { Box } from '@material-ui/core';
import {
    FormControl,
    Input,
    InputLabel,
    OutlinedInput,
    TextField,
    TextFieldProps,
    Typography,
    styled,
} from '@mui/material';
import * as React from 'react';

export interface CartCouponProps {}

export function CartCoupon(props: CartCouponProps) {
    const StyleInput = styled(TextField)<TextFieldProps>({
        borderRadius: '50px',
        backgroundColor: 'red',
    });

    const inputProps = {
        borderRadius: 50,
    };

    return (
        <Box>
            <Typography variant="h6">Discount Code</Typography>
            <form>
                <StyleInput></StyleInput>
                <TextField inputProps={inputProps} />
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                    <OutlinedInput id="component-outlined" defaultValue="Composed TextField" label="Name" sx={{}} />
                </FormControl>
            </form>
        </Box>
    );
}
