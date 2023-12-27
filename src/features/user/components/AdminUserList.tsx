import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    LinearProgress,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { userApi } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { User } from '../../../models';
import { selectIsLoading, selectUserList } from '../userSlice';
import { userThunk } from '../userThunk';

export function AdminUserList() {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const data = useAppSelector(selectUserList);
    const loading = useAppSelector(selectIsLoading);
    // const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const [open, setOpen] = useState(false); // Open dialog state
    const [userSelected, setUserSelected] = useState<User>(); // User choose when click
    const [paginationModel, setPaginationModel] = useState({
        // Current pagination model state
        page: Number(sessionStorage.getItem('currentPage')),
        pageSize: 10,
    });

    useEffect(() => {
        // Dispatch an action to fetch user data
        dispatch(userThunk());
    }, [dispatch]);

    // const handleClick = () => {
    //     // Navigate to the "Add New User" page
    //     navigate('/admin/posts/add');
    //     sessionStorage.setItem('currentPage', paginationModel.page.toString());
    // };

    const handleRemoveUser = async (user?: User) => {
        // Handle remove button click
        try {
            const response = await userApi.deleteUser(user?.id);
            console.log(response.status);
            if (response.status === 200) {
                // Show a success toast when a user is deleted
                toast.success(`User deleted successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            } else {
                // Show an error toast when the deletion fails
                toast.error(`Failed to delete user. Please try again.`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            }
            dispatch(userThunk());
        } catch (error) {
            console.log('Failed');
        }
        setOpen(false);
    };

    // const handleEditUser = async (user?: User) => {
    //     // Navigate to the edit page for the selected user
    //     try {
    //         navigate(`/admin/posts/${user?.id}`);
    //         sessionStorage.setItem('currentPage', paginationModel.page.toString());
    //     } catch (error) {
    //         console.log('Failed');
    //     }
    // };

    const handleClickOpen = (user: User) => {
        // Open the dialog for confirming user deletion
        setOpen(true);
        console.log(user);
        setUserSelected(user);
    };

    const handleClose = () => {
        // Close the dialog
        setOpen(false);
    };

    const rows = data.map((user) => ({
        // Transform the b.log data for the DataGrid
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName + ' ' + user.maidenName + ' ' + user.lastName,
        gender: user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1),
        email: user.email,
        phone: user.phone,
        userName: user.username,
    }));

    const columns: GridColDef[] = [
        // Define the columns for the DataGrid
        { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 1, maxWidth: 60 },
        { field: 'name', headerName: 'Full Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 300 },
        { field: 'gender', headerName: 'Gender', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
        {
            field: 'email',
            headerName: 'Email',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            minWidth: 300,
        },
        {
            field: 'phone',
            align: 'center',
            headerName: 'Phone Number',
            headerAlign: 'center',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'userName',
            align: 'center',
            headerName: 'User Name',
            headerAlign: 'center',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'feature',
            headerAlign: 'center',
            headerName: 'Manage',
            sortable: false,
            align: 'center',
            minWidth: 120,
            flex: 1,
            renderCell: (params: GridRenderCellParams<any, Date>) => (
                // Render cell with "Edit" and "Delete" buttons
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            sx={{ ml: 1 }}
                            tabIndex={params.hasFocus ? 0 : -1}
                            color="error"
                            onClick={() => handleClickOpen(params.row)}
                            aria-label="fingerprint"
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    return (
        <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                    <Typography variant="h4" fontSize={24}>
                        Users
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}></Stack>
                </Stack>
            </Stack>
            {loading ? (
                <LinearProgress color="secondary" />
            ) : (
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnMenu
                    autoHeight
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 15, 20]}
                    sx={{
                        height: '100%',
                        borderRadius: 5,
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                        p: 2,
                    }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Delete A User'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete{' '}
                        <strong>{userSelected?.firstName + ' ' + userSelected?.lastName}</strong>? <br />
                        This action can&apos;t be undo!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRemoveUser(userSelected)} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Stack>
    );
}
