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
import { orderApi } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Order } from '../../../models';
import { selectIsLoading, selectOrderList } from '../orderSlice';
import { orderThunk } from '../orderThunk';

export function AdminOrderList() {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const data = useAppSelector(selectOrderList);
    const loading = useAppSelector(selectIsLoading);
    // const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const [open, setOpen] = useState(false); // Open dialog state
    const [orderSelected, setOrderSelected] = useState<Order>(); // Order choose when click
    const [paginationModel, setPaginationModel] = useState({
        // Current pagination model state
        page: Number(sessionStorage.getItem('currentPage')),
        pageSize: 10,
    });

    useEffect(() => {
        // Dispatch an action to fetch order data
        dispatch(orderThunk());
    }, [dispatch]);

    // const handleClick = () => {
    //     // Navigate to the "Add New Order" page
    //     navigate('/admin/posts/add');
    //     sessionStorage.setItem('currentPage', paginationModel.page.toString());
    // };

    const handleRemoveOrder = async (order?: Order) => {
        // Handle remove button click
        try {
            const response = await orderApi.deleteOrder(order?.id);
            console.log(response.status);
            if (response.status === 200) {
                // Show a success toast when a order is deleted
                toast.success(`Order deleted successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            } else {
                // Show an error toast when the deletion fails
                toast.error(`Failed to delete order. Please try again.`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            }
            dispatch(orderThunk());
        } catch (error) {
            console.log('Failed');
        }
        setOpen(false);
    };

    // const handleEditOrder = async (order?: Order) => {
    //     // Navigate to the edit page for the selected order
    //     try {
    //         navigate(`/admin/posts/${order?.id}`);
    //         sessionStorage.setItem('currentPage', paginationModel.page.toString());
    //     } catch (error) {
    //         console.log('Failed');
    //     }
    // };

    const handleClickOpen = (order: Order) => {
        // Open the dialog for confirming order deletion
        setOpen(true);
        console.log(order);
        setOrderSelected(order);
    };

    const handleClose = () => {
        // Close the dialog
        setOpen(false);
    };

    const rows = data.map((order) => ({
        // Transform the b.log data for the DataGrid
        id: order.id,
        userID: order.userId,
        products: order.products.map((product) => product.title).join(', '),
        totalQuantity: order.totalQuantity,
        price: order.discountedTotal,
    }));

    const columns: GridColDef[] = [
        // Define the columns for the DataGrid
        { field: 'id', headerName: 'Order ID', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
        { field: 'userID', headerName: 'User ID', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
        { field: 'products', headerName: 'Products', headerAlign: 'center', align: 'center', flex: 1, minWidth: 500 },
        {
            field: 'totalQuantity',
            headerName: 'Quantity',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'price',
            align: 'center',
            headerName: 'Price ($)',
            headerAlign: 'center',
            flex: 1,
            minWidth: 100,
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
                        Orders
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
                <DialogTitle id="alert-dialog-title">{'Delete An Order'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this order? <br />
                        This action can&apos;t be undo!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRemoveOrder(orderSelected)} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Stack>
    );
}
