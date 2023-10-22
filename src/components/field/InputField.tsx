import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
    disable?: boolean;
    rows?: number;
    multiline?: boolean;
    InputProps?: {};
    type?: string;
    select?: boolean;
}

export function InputField({
    name,
    control,
    label,
    disable,
    rows,
    multiline,
    InputProps,
    type,
    select,
}: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    // const customInputProps = {
    //     style: {
    //         backgroundColor: 'white',
    //     },
    //     ...InputProps,
    // };

    return (
        <TextField
            type={type}
            InputProps={InputProps}
            multiline={multiline}
            rows={rows}
            disabled={disable}
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={ref}
            error={invalid}
            onChange={onChange}
            onBlur={onBlur}
            helperText={error?.message}
            value={value}
            onFocus={select ? (e) => e.target.select() : undefined}
        />
    );
}
