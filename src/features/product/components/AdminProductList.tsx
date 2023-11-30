import AddIcon from '@mui/icons-material/Add';
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
    SvgIcon,
    Tooltip,
    Typography,
} from '@mui/material';

import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { productsApi } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsLoading, selectProductList } from '../productSlice';
import { productThunk } from '../productThunk';
import { Product } from '../../../models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function AdminProductList() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const data = useAppSelector(selectProductList);
    const loading = useAppSelector(selectIsLoading);
    // const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
    const [open, setOpen] = useState(false); // Open dialog state
    const [productSelected, setProductSelected] = useState<Product>(); // Product choose when click
    const [paginationModel, setPaginationModel] = useState({
        // Current pagination model state
        page: Number(sessionStorage.getItem('currentPage')),
        pageSize: 10,
    });

    useEffect(() => {
        // Dispatch an action to fetch product data
        dispatch(productThunk());
    }, [dispatch]);

    const handleClick = () => {
        // Navigate to the "Add New Product" page
        navigate('/admin/products/add');
        sessionStorage.setItem('currentPage', paginationModel.page.toString());
    };

    const handleRemoveProduct = async (product?: Product) => {
        // Handle remove button click
        try {
            const response = await productsApi.deleteProduct(product?.id);
            console.log(response.status);
            if (response.status === 200) {
                // Show a success toast when a product is deleted
                toast.success(`Product deleted successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            } else {
                // Show an error toast when the deletion fails
                toast.error(`Failed to delete the product. Please try again.`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                    theme: 'dark',
                    hideProgressBar: true,
                });
            }
            dispatch(productThunk());
        } catch (error) {
            console.log('Failed');
        }
        setOpen(false);
    };

    const handleEditProduct = async (product?: Product) => {
        // Navigate to the edit page for the selected product
        try {
            navigate(`/admin/products/${product?.id}`);
            sessionStorage.setItem('currentPage', paginationModel.page.toString());
        } catch (error) {
            console.log('Failed');
        }
    };

    const handleClickOpen = (product: Product) => {
        // Open the dialog for confirming product deletion
        setOpen(true);
        console.log(product);
        setProductSelected(product);
    };

    const handleClose = () => {
        // Close the dialog
        setOpen(false);
    };

    const rows = data.map((product) => ({
        // Transform the product data for the DataGrid
        id: product.id,
        title: product.title,
        brand: product.brand,
        rating: product.rating,
        price: product.price,
        discount: product.discountPercentage,
        stock: product.stock,
    }));

    const columns: GridColDef[] = [
        // Define the columns for the DataGrid
        { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 1, maxWidth: 60 },
        { field: 'title', headerName: 'Product Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 400 },
        { field: 'brand', headerName: 'Brand', headerAlign: 'center', align: 'center', flex: 1, minWidth: 300 },
        {
            field: 'rating',
            headerName: 'Rating',
            align: 'center',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
        },
        {
            field: 'price',
            align: 'center',
            headerName: 'Price ($)',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
        },
        {
            field: 'discount',
            align: 'center',
            headerName: 'Discount (%)',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
        },
        {
            field: 'stock',
            align: 'center',
            headerName: 'Stock',
            type: 'number',
            headerAlign: 'center',
            flex: 1,
            minWidth: 120,
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
                    <Tooltip title="Update">
                        <IconButton
                            size="small"
                            sx={{ ml: 1 }}
                            tabIndex={params.hasFocus ? 0 : -1}
                            onClick={() => handleEditProduct(params.row)}
                            color="info"
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
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
                        Products
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}></Stack>
                </Stack>
                <div>
                    <Button
                        startIcon={
                            <SvgIcon fontSize="small">
                                <AddIcon />
                            </SvgIcon>
                        }
                        variant="contained"
                        color="success"
                        onClick={handleClick}
                    >
                        Add
                    </Button>
                </div>
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
                <DialogTitle id="alert-dialog-title">{'Delete A Product'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete <strong>{productSelected?.title}</strong>? <br />
                        This action can&apos;t be undo!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button onClick={() => handleRemoveProduct(productSelected)} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Stack>
    );
}
