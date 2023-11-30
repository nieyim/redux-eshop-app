import { Grid, Link } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';
import Paper from '../../../components/common/Paper';
import Typography from '../../../components/common/Typography';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/field/InputField';
import { Button } from '../../../components/common';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface AuthFormProps {
    onSubmit?: (formValues: any) => void; // Callback function for form submission.
    isSignIn: boolean;
}

export function AuthForm({ onSubmit, isSignIn }: AuthFormProps) {
    const signInSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const signUpSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                'Password must contain at least one digit, one lowercase letter, and one uppercase letter',
            ),
        firstName: yup
            .string()
            .required('First name is required')
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name must not exceed 50 characters'),
        lastName: yup
            .string()
            .required('Last name is required')
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name must not exceed 50 characters'),
    });

    const validationSchema = isSignIn ? signInSchema : signUpSchema;

    // const [showSignIn, setShowSignIn] = useState(isSignIn);
    const formTitle = isSignIn ? 'Sign In' : 'Sign Up';
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            isSignIn,
        },
        resolver: yupResolver(validationSchema) as any,
    });
    const { isSubmitting } = formState;

    const handleFormSubmit = async (data: any) => {
        console.log(data); // Log the form values when the form is submitted.
        await new Promise((resolve) => {
            // Delay 1 second
            setTimeout(resolve, 1000);
        });
        try {
            await onSubmit?.(data);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundImage: 'url(/static/onepirate/appCurvyLines.png)',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ mt: 7, mb: 12 }}>
                    <Paper background="light" sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}>
                        <React.Fragment>
                            <Typography variant="h3" gutterBottom marked="center" align="center">
                                {formTitle}
                            </Typography>

                            <Typography variant="body2" align="center">
                                {isSignIn ? 'Not a member yet? ' : ''}
                                <Link href={isSignIn ? '/register' : '/login'} align="center" underline="always">
                                    {isSignIn ? 'Sign Up here' : 'Already have an account?'}
                                </Link>
                            </Typography>
                        </React.Fragment>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <Box sx={{ mt: 6 }}>
                                <InputField
                                    name="username"
                                    control={control}
                                    label="Email or Username"
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                />
                                <InputField
                                    name="password"
                                    control={control}
                                    label="Password"
                                    type="password"
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                />
                                {!isSignIn && (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <InputField
                                                name="firstName"
                                                control={control}
                                                label="First Name"
                                                InputProps={{
                                                    style: {
                                                        backgroundColor: 'white',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputField
                                                name="lastName"
                                                control={control}
                                                label="Last Name"
                                                InputProps={{
                                                    style: {
                                                        backgroundColor: 'white',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                <Button
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                    size="large"
                                    color="secondary"
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                >
                                    {formTitle}
                                </Button>
                            </Box>
                        </form>
                        {isSignIn && (
                            <Typography align="center">
                                <Link underline="always" href="#">
                                    Forgot password?
                                </Link>
                            </Typography>
                        )}
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}
