import { FormHelperText } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
    label?: string;
    value: number | string;
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disable?: boolean;
    options: SelectOptions[];
}

export function SelectField({ name, control, label, disable, options }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl disabled={disable} error={invalid} margin="normal" fullWidth>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
                fullWidth
                margin="dense"
                variant="outlined"
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={true} variant="outlined">
                {error?.message}
            </FormHelperText>
        </FormControl>
    );
}
