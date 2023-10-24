import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Category, Product } from '../../models';
import { InputField, SelectField } from '../field';

// Define an interface for the ProductForm component's props.
export interface ProductFormProps {
    initialValues?: Product; // Initial form values of type Product.
    onSubmit?: (formValue: Product) => void; // Callback function for form submission.
    category: Category[]; // Array of category options for the SelectField.
}

export default function ProductForm({ initialValues, onSubmit, category }: ProductFormProps) {
    // Define a validation schema for form fields using the Yup library.
    const schema = yup
        .object()
        .shape({
            title: yup
                .string()
                .required('Please enter product name')
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name must not exceed 50 characters'),
            description: yup.string(),
            price: yup
                .number()
                .required('Please enter price')
                .moreThan(0, 'Price must be greater than 0$')
                .typeError('Please enter a valid number'),
            stock: yup
                .number()
                .required('Please enter stock')
                .moreThan(-1, 'Stock must be a positive number')
                .max(1000, 'Maximum stock quantity is 1000')
                .integer('Stock must be an integer')
                .typeError('Please enter a valid stock quantity'),
            discountPercentage: yup
                .number()
                .required('Please enter discount percentage')
                .moreThan(-1, 'Discount percentage must be a positive number')
                .lessThan(100, 'Discount percentage cannot exceed 100%')
                .typeError('Please enter a valid number for discount percentage'),
            rating: yup
                .number()
                .required('Please enter rating')
                .min(1, 'Rating must be at least 1')
                .max(5, 'Rating must not exceed 5')
                .typeError('Please enter a valid number for rating'),
            brand: yup
                .string()
                .required('Please enter brand')
                .min(2, 'Brand name must be at least 2 characters')
                .max(50, 'Brand name must not exceed 50 characters'),
            category: yup.string().required('Please select a category'),
        })
        .required();

    // Map category options to a format compatible with SelectField.
    const options = category.map((i) => ({
        label: i.title,
        value: i.title,
    }));

    // Initialize the form control and define its default values and validation schema.
    const { control, handleSubmit, formState, reset } = useForm<Product>({
        defaultValues: initialValues,
        resolver: yupResolver(schema) as any, // Using Yup validation resolver.
    });

    // Define formState
    const { isSubmitting } = formState;

    // Function to handle form submission.
    const handleFormSubmit = async (formValue: Product) => {
        console.log(formValue); // Log the form values when the form is submitted.
        await new Promise((resolve) => {
            // Delay 1 second
            setTimeout(resolve, 1000);
        });
        try {
            await onSubmit?.(formValue);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    // Determine whether the form is in edit mode based on the presence of an 'id' value.
    const isEditMode: boolean = initialValues?.id !== 0;

    return (
        <Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <img alt="" src={control._defaultValues.thumbnail}></img>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField name="title" control={control} label="Product Name" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField name="brand" control={control} label="Brand" />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InputField
                            name="price"
                            control={control}
                            label="Price"
                            type="number"
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            select={!isEditMode}
                        />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InputField
                            name="discountPercentage"
                            control={control}
                            label="Discount Percent"
                            type="number"
                            InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                            select={!isEditMode}
                        />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InputField name="rating" control={control} label="Rating" type="number" select={!isEditMode} />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InputField name="stock" control={control} label="Stock" type="number" select={!isEditMode} />
                    </Grid>

                    <Grid item xs={12}>
                        <InputField
                            name="description"
                            control={control}
                            label="Description"
                            rows={4}
                            multiline={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SelectField name="category" control={control} label="Category" options={options} />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                disabled={isSubmitting}
                                type="submit"
                                sx={{
                                    position: 'relative',
                                    '& .MuiCircularProgress-root': {
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    },
                                }}
                                color="info"
                                size="large"
                            >
                                Save Changes
                                {isSubmitting && <CircularProgress size={24} />}
                            </Button>
                            <Button size="large" variant="outlined" onClick={() => reset()} sx={{ marginLeft: '16px' }}>
                                Reset
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
